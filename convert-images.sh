#!/bin/bash
# Convert all gallery images to WebP and resize to max 1600px wide.
# Run this locally (WSL/Mac/Linux) or on the server BEFORE deploying.
#
# Requires: ImageMagick  →  apt install imagemagick  /  brew install imagemagick
#
# Usage:
#   ./convert-images.sh                  # converts images/gallery/
#   ./convert-images.sh path/to/folder   # converts a custom folder

GALLERY="${1:-images/gallery}"
MAX_WIDTH=1600
QUALITY=82

if ! command -v convert &>/dev/null; then
  echo "ERROR: ImageMagick not found."
  echo "Install it:  apt install imagemagick  (Linux)  or  brew install imagemagick  (Mac)"
  exit 1
fi

shopt -s nullglob
FILES=("$GALLERY"/*.{jpg,jpeg,png,JPG,JPEG,PNG})

if [ ${#FILES[@]} -eq 0 ]; then
  echo "No jpg/png files found in $GALLERY"
  exit 0
fi

echo "Converting ${#FILES[@]} images in $GALLERY ..."

for FILE in "${FILES[@]}"; do
  BASENAME=$(basename "$FILE")
  NAME="${BASENAME%.*}"
  OUT="$GALLERY/$NAME.webp"

  convert "$FILE" \
    -resize "${MAX_WIDTH}x>" \
    -quality "$QUALITY" \
    -strip \
    "$OUT"

  ORIG_SIZE=$(du -sh "$FILE" | cut -f1)
  NEW_SIZE=$(du -sh "$OUT" | cut -f1)
  echo "  $BASENAME  ($ORIG_SIZE) → $NAME.webp ($NEW_SIZE)"
done

echo ""
echo "Done! Upload the .webp files and reference them in preview.html as:"
echo "  images/gallery/01.webp, 02.webp, ..."
