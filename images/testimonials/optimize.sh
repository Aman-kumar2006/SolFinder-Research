#!/bin/bash

# Get the directory of the script to reliably find the images folder
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)"
# Navigate up from images/testimonials/ to the project root
PROJECT_ROOT="$(dirname "$(dirname "$SCRIPT_DIR")")"

# Default to the images/ directory if no argument is provided
TARGET_DIR="${1:-$PROJECT_ROOT/images}"

echo "Starting image optimization in: $TARGET_DIR"
echo "------------------------------------------------"

# Verify dependencies
if ! command -v jpegoptim &> /dev/null || ! command -v pngquant &> /dev/null; then
    echo "Error: 'jpegoptim' and/or 'pngquant' are not installed."
    echo "Please install them first (e.g., sudo apt install jpegoptim pngquant)"
    exit 1
fi

# Optimize JPEGs
# --max=80 ensures lossy compression up to 80% quality (good balance)
# --strip-all removes EXIF/metadata to save space
# --all-progressive makes them load progressively on the web
echo "Processing JPEG images..."
find "$TARGET_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) -exec jpegoptim --max=80 --strip-all --all-progressive {} +

echo ""

# Optimize PNGs
# --quality=65-80 allows pngquant to drop colors to achieve lossy compression without looking bad
# --force and --ext .png ensure it overwrites the original file to keep the same name
echo "Processing PNG images..."
find "$TARGET_DIR" -type f -iname "*.png" -exec pngquant --quality=65-80 --ext .png --force {} +

echo "------------------------------------------------"
echo "Optimization complete! Your images are now lighter but still look great."
