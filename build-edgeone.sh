#!/bin/bash
# Custom build script for EdgeOne Pages
# Removes heavy unused packages before building to stay under 128MB limit

echo "🧹 Removing unused heavy packages to reduce bundle size..."

# Remove sharp binaries (33MB) — not needed with unoptimized images
rm -rf node_modules/@img/sharp-libvips-linux-x64
rm -rf node_modules/@img/sharp-libvips-linuxmusl-x64
rm -rf node_modules/@img/sharp-linux-x64
rm -rf node_modules/@img/sharp-linuxmusl-x64

# Remove prisma engines binary (58MB) — not needed at build time, Prisma client is already generated
rm -rf node_modules/@prisma/engines

echo "✅ Cleanup done. Building..."

# Generate Prisma client and build
npx prisma generate
npx next build

echo "✅ Build complete!"
