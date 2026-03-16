import os
import joblib
import pandas as pd
from django.conf import settings

class PredictionService:
    """Service Layer Design Pattern for House Price Prediction"""
    
    _model_pipeline = None

    @classmethod
    def get_model(cls):
        """Lazy load the machine learning model (Singleton-like approach)"""
        if cls._model_pipeline is None:
            model_path = os.path.join(settings.BASE_DIR.parent, 'LinearRegressionModel', 'models', 'lr_pipeline.joblib')
            if not os.path.exists(model_path):
                raise FileNotFoundError("Machine learning model file 'lr_pipeline.joblib' not found.")
            cls._model_pipeline = joblib.load(model_path)
        return cls._model_pipeline

    @staticmethod
    def predict_price(data: dict) -> dict:
        """
        Takes raw input dict, processes it, and returns the prediction result dict.
        Raises ValueError or FileNotFoundError if validation or model loading fails.
        """
        # 1. Processing Input Coordinates
        lat = data.get('latitude')
        lng = data.get('longitude')
        
        if lat is None or lng is None:
            lat = 36.7783 # Default California
            lng = -119.4179
            
        # 2. Extract Variables
        try:
            total_rooms = int(data.get('total_rooms', 6))
            total_bedrooms = int(data.get('total_bedrooms', 2))
            housing_median_age = float(data.get('housing_median_age', 15))
            population = float(data.get('population', 300))
            households = float(data.get('households', 100))
            median_income = float(data.get('median_income', 3.5))
            ocean_proximity = str(data.get('ocean_proximity', '<1H OCEAN'))
        except (TypeError, ValueError):
            raise ValueError("Invalid numerical values provided in the payload.")
            
        # 3. Calculate Derived Features
        rooms_per_household = total_rooms / households if households > 0 else 0
        bedrooms_per_room = total_bedrooms / total_rooms if total_rooms > 0 else 0
        population_per_household = population / households if households > 0 else 0

        # One Hot Encode Ocean Proximity manually
        ocean_categories = ['<1H OCEAN', 'INLAND', 'ISLAND', 'NEAR BAY', 'NEAR OCEAN']
        ocean_oh = {f"ocean_proximity_{cat}": 1.0 if ocean_proximity == cat else 0.0 for cat in ocean_categories}

        # 4. Create DataFrame in EXACT order expected by lr_pipeline.joblib
        input_data = pd.DataFrame([{
            'longitude': float(lng),
            'latitude': float(lat),
            'housing_median_age': housing_median_age,
            'total_rooms': float(total_rooms),
            'total_bedrooms': float(total_bedrooms),
            'population': population,
            'households': households,
            'median_income': median_income,
            'rooms_per_household': rooms_per_household,
            'bedrooms_per_room': bedrooms_per_room,
            'population_per_household': population_per_household,
            **ocean_oh
        }])

        # 4. Load Model and Predict
        pipeline = PredictionService.get_model()
        predicted_price_usd = pipeline.predict(input_data)[0]

        # 5. Convert to VND (assume approx 25,300 VND/USD) for frontend display
        if predicted_price_usd <= 0:
            predicted_price_usd = 100_000

        predicted_price_vnd = predicted_price_usd * 25300

        # 6. Construct business object return
        price_min = predicted_price_vnd * 0.85
        price_max = predicted_price_vnd * 1.15
        price_per_m2 = 0 # Not applicable for California dataset
        confidence = 0.82

        return {
            "estimated_price": round(predicted_price_vnd),
            "price_min": round(price_min),
            "price_max": round(price_max),
            "confidence": confidence,
            "price_per_m2": price_per_m2
        }
