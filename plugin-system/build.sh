#!/bin/bash
# Build script — minifies plugin.js for distribution
# For production, use a proper bundler (esbuild, rollup, webpack)

set -e

DIST_DIR="$(dirname "$0")/dist"
SRC_DIR="$(dirname "$0")/src"

mkdir -p "$DIST_DIR"

# Simple copy for now — replace with minification in production:
#   npx esbuild src/plugin.js --bundle --minify --outfile=dist/plugin.min.js
cp "$SRC_DIR/plugin.js" "$DIST_DIR/plugin.min.js"

echo "Built to $DIST_DIR/plugin.min.js"
echo ""
echo "Next steps for production:"
echo "  1. npm install -g esbuild"
echo "  2. esbuild src/plugin.js --bundle --minify --outfile=dist/plugin.min.js"
echo "  3. Upload dist/plugin.min.js to your CDN"
