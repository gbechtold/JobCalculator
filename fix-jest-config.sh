#!/bin/bash

echo "🔍 Checking for Jest configuration files..."

# Create jest.config.js if it doesn't exist
if [ ! -f jest.config.js ]; then
    echo "📝 Creating jest.config.js..."
    cat > jest.config.js << 'EOL'
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  }
};
EOL
    echo "✅ Created jest.config.js"
fi

# Create temp file for package.json without jest config
echo "🔧 Removing Jest configuration from package.json..."
jq 'del(.jest)' package.json > package.json.tmp

# Check if jq command was successful
if [ $? -eq 0 ]; then
    # Backup original package.json
    mv package.json package.json.bak
    # Move new package.json into place
    mv package.json.tmp package.json
    echo "✅ Successfully removed Jest configuration from package.json"
    echo "📦 Original package.json backed up as package.json.bak"
else
    echo "❌ Error: Failed to process package.json. Please ensure jq is installed."
    rm package.json.tmp
    exit 1
fi

# Create jest.setup.js if it doesn't exist
if [ ! -f jest.setup.js ]; then
    echo "📝 Creating jest.setup.js..."
    cat > jest.setup.js << 'EOL'
import '@testing-library/jest-dom';
EOL
    echo "✅ Created jest.setup.js"
fi

echo "✨ Jest configuration cleanup complete!"
echo "🔍 You can now run Jest with: npm test"
