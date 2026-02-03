import os

# Folder where images are stored
image_folder = "./"

# Get all image files (JPG, PNG)
images = sorted([f for f in os.listdir(image_folder) if f.lower().endswith(('.jpg', '.png'))])

# Rename files sequentially
for index, filename in enumerate(images, start=1):
    ext = filename.split(".")[-1]  # Get file extension (jpg/png)
    new_name = f"question-{index}.{ext}"
    old_path = os.path.join(image_folder, filename)
    new_path = os.path.join(image_folder, new_name)

    os.rename(old_path, new_path)
    print(f"Renamed: {filename} → {new_name}")

print("✅ Image renaming complete!")