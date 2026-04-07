from huggingface_hub import snapshot_download

snapshot_download(
    repo_id="tinixai/vietnam-real-estates",
    repo_type="dataset",
    local_dir="vietnam-real-estates",
    local_dir_use_symlinks=False
)

print("Downloaded to ./vietnam-real-estates")