import os
import json
from PIL import Image

# Configuration
SOURCE_DIR = 'photos'
DEST_DIR = 'assets/images'
MANIFEST_FILE = 'assets/image_manifest.json'
MAX_SIZE = (1920, 1920)
QUALITY = 80

def optimize_images():
    # Create destination directory
    if not os.path.exists(DEST_DIR):
        os.makedirs(DEST_DIR)
    
    image_files = []
    
    # Supported extensions
    valid_extensions = {'.jpg', '.jpeg', '.png', '.webp'}
    
    print(f"Scanning {SOURCE_DIR}...")
    
    try:
        files = sorted(os.listdir(SOURCE_DIR))
    except FileNotFoundError:
        print(f"Error: {SOURCE_DIR} directory not found.")
        return

    for filename in files:
        ext = os.path.splitext(filename)[1].lower()
        if ext not in valid_extensions:
            continue
            
        full_source_path = os.path.join(SOURCE_DIR, filename)
        full_dest_path = os.path.join(DEST_DIR, filename)
        
        try:
            with Image.open(full_source_path) as img:
                # Convert to RGB if necessary (e.g. for PNGs with alpha being saved as JPEG)
                if img.mode in ('RGBA', 'P'):
                    img = img.convert('RGB')
                
                # Resize if larger than max dimensions, keeping aspect ratio
                img.thumbnail(MAX_SIZE, Image.Resampling.LANCZOS)
                
                # Save optimized version
                print(f"Processing {filename}...")
                img.save(full_dest_path, 'JPEG', quality=QUALITY, optimize=True)
                
                image_files.append({
                    "src": f"{DEST_DIR}/{filename}",
                    "original": filename
                })
                
        except Exception as e:
            print(f"Failed to process {filename}: {e}")

    # Generate Manifest
    with open(MANIFEST_FILE, 'w') as f:
        json.dump(image_files, f, indent=2)
    
    print(f"Optimization complete. Processed {len(image_files)} images.")
    print(f"Manifest saved to {MANIFEST_FILE}")

if __name__ == '__main__':
    optimize_images()
