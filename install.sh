#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Define directories
SCRIPTS_DIR="./scripts"
FRONTEND_DIR="./frontend"

# Create and activate a Python virtual environment
echo "Setting up Python virtual environment..."
python3 -m venv "${SCRIPTS_DIR}/.venv"
source "${SCRIPTS_DIR}/venv/bin/activate"

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -r "${SCRIPTS_DIR}/requirements.txt"

# Deactivate the Python virtual environment
deactivate

# Navigate to the frontend directory
echo "Navigating to the frontend directory..."
cd "${FRONTEND_DIR}"

# Install Node.js dependencies
echo "Installing Node.js dependencies..."
npm install

# Return to the root directory
cd ..

echo "Setup complete!"