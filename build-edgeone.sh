#!/bin/bash
set -e

echo "=== Building VeriNews for EdgeOne Pages ==="

# Build Next.js in standalone mode
npx next build

# Copy static files to standalone output
echo "Copying static files..."
cp -r .next/static .next/standalone/.next/

# Copy public files
echo "Copying public files..."
cp -r public .next/standalone/

echo "=== Build complete ==="
echo "Standalone output: .next/standalone/"
du -sh .next/standalone/
du -sh .next/standalone/node_modules/
