#!/bin/bash

# Test script to verify dev container setup
echo "Testing dev container setup..."

# Check if node is installed
if command -v node &> /dev/null; then
    echo "✓ Node.js is installed: $(node --version)"
else
    echo "✗ Node.js is not installed"
    exit 1
fi

# Check if npm is installed
if command -v npm &> /dev/null; then
    echo "✓ npm is installed: $(npm --version)"
else
    echo "✗ npm is not installed"
    exit 1
fi

# Check if yarn is installed
if command -v yarn &> /dev/null; then
    echo "✓ Yarn is installed: $(yarn --version)"
else
    echo "ℹ Yarn is not installed (will be installed in dev container)"
fi

# Check if pnpm is installed
if command -v pnpm &> /dev/null; then
    echo "✓ PNPM is installed: $(pnpm --version)"
else
    echo "ℹ PNPM is not installed (will be installed in dev container)"
fi

# Check if project dependencies are installed
if [ -d "node_modules" ]; then
    echo "✓ Node modules are installed"
else
    echo "ℹ Node modules are not installed (will be installed in dev container)"
    echo "Run 'yarn install' or 'npm install' to install dependencies"
fi

# Check if vite is available
if command -v vite &> /dev/null; then
    echo "✓ Vite is available"
else
    echo "ℹ Vite is not available (will be installed in dev container)"
fi

echo "Local environment check completed."
echo "Note: Full dev container setup will be available when running in the container."