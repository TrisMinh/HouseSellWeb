import json
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler


RANDOM_STATE = 42
TARGET_COL = "price"
NUM_COLS = ["area", "floor_count", "bedroom_count", "bathroom_count"]
CAT_COLS = ["property_type_name", "province_name"]
ALL_COLS = [*CAT_COLS, *NUM_COLS, TARGET_COL]


def load_dataset(base_dir: Path) -> pd.DataFrame:
    data_dir = base_dir / "data" / "vietnam-real-estates"
    shards = sorted(data_dir.glob("shard_*.parquet"))
    if not shards:
        raise FileNotFoundError(f"No parquet shard found in: {data_dir}")

    frames = [pd.read_parquet(shard, columns=ALL_COLS) for shard in shards]
    df = pd.concat(frames, ignore_index=True)
    return df


def clean_dataset(df: pd.DataFrame, sample_size: int = 250_000) -> pd.DataFrame:
    df = df.copy()

    # Keep positive-price rows only.
    df = df[pd.to_numeric(df[TARGET_COL], errors="coerce") > 0]

    # Cast numeric columns.
    for col in NUM_COLS + [TARGET_COL]:
        df[col] = pd.to_numeric(df[col], errors="coerce")

    # Fill missing categorical values.
    for col in CAT_COLS:
        df[col] = df[col].fillna("NA").astype(str).str.strip()
        df.loc[df[col] == "", col] = "NA"

    # Robustly clip outliers to stabilize linear regression.
    for col in NUM_COLS + [TARGET_COL]:
        low, high = df[col].quantile([0.01, 0.99])
        df[col] = df[col].clip(lower=low, upper=high)

    # Filter unrealistic areas after clipping.
    df = df[df["area"] > 1]

    # Downsample for faster, reproducible training.
    if len(df) > sample_size:
        df = df.sample(sample_size, random_state=RANDOM_STATE)

    return df.dropna(subset=[TARGET_COL])


def build_pipeline() -> Pipeline:
    numeric_pipeline = Pipeline(
        steps=[
            ("imputer", SimpleImputer(strategy="median")),
            ("scaler", StandardScaler()),
        ]
    )
    category_pipeline = Pipeline(
        steps=[
            ("imputer", SimpleImputer(strategy="most_frequent")),
            ("encoder", OneHotEncoder(handle_unknown="ignore")),
        ]
    )

    preprocessor = ColumnTransformer(
        transformers=[
            ("num", numeric_pipeline, NUM_COLS),
            ("cat", category_pipeline, CAT_COLS),
        ]
    )

    return Pipeline(
        steps=[
            ("preprocessor", preprocessor),
            ("regressor", LinearRegression()),
        ]
    )


def main() -> None:
    base_dir = Path(__file__).resolve().parent
    model_dir = base_dir / "models"
    model_dir.mkdir(parents=True, exist_ok=True)

    print("Loading dataset...")
    raw_df = load_dataset(base_dir)
    print(f"Raw rows: {len(raw_df):,}")

    print("Cleaning dataset...")
    df = clean_dataset(raw_df)
    print(f"Rows after clean: {len(df):,}")

    x = df[CAT_COLS + NUM_COLS]
    y = df[TARGET_COL]

    x_train, x_test, y_train, y_test = train_test_split(
        x, y, test_size=0.2, random_state=RANDOM_STATE
    )

    pipeline = build_pipeline()
    print("Training model...")
    pipeline.fit(x_train, y_train)

    y_pred = pipeline.predict(x_test)
    metrics = {
        "mae": float(mean_absolute_error(y_test, y_pred)),
        "rmse": float(np.sqrt(mean_squared_error(y_test, y_pred))),
        "r2": float(r2_score(y_test, y_pred)),
        "train_rows": int(len(x_train)),
        "test_rows": int(len(x_test)),
        "features": CAT_COLS + NUM_COLS,
    }

    model_path = model_dir / "lr_pipeline.joblib"
    vietname_model_path = model_dir / "vietname.pkl"
    metrics_path = model_dir / "lr_pipeline_metrics.json"
    joblib.dump(pipeline, model_path)
    joblib.dump(pipeline, vietname_model_path)
    metrics_path.write_text(json.dumps(metrics, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"Saved model: {model_path}")
    print(f"Saved model: {vietname_model_path}")
    print(f"Saved metrics: {metrics_path}")
    print(json.dumps(metrics, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
