#!/bin/bash

echo "🔧 Fixing project structure..."

# Ensure src/lib directory exists
mkdir -p src/lib

# Create utils.ts if it doesn't exist
if [ ! -f src/lib/utils.ts ]; then
    echo "📝 Creating src/lib/utils.ts..."
    cat > src/lib/utils.ts << 'EOL'
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
EOL
    echo "✅ Created src/lib/utils.ts"
fi

# Remove duplicate utils.ts if it exists in the root lib directory
if [ -f lib/utils.ts ]; then
    echo "🗑️ Removing duplicate lib/utils.ts from root..."
    rm lib/utils.ts
    echo "✅ Removed duplicate utils.ts"
fi

# Clean up empty lib directory in root if it exists
if [ -d lib ] && [ -z "$(ls -A lib)" ]; then
    echo "🗑️ Removing empty lib directory from root..."
    rmdir lib
    echo "✅ Removed empty lib directory"
fi

echo "✨ Project structure fixed!"
echo "🔍 Please verify that your application builds correctly now."
