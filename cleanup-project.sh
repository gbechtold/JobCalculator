#!/bin/bash

echo "🧹 Starting project cleanup..."

# Array of files to remove
declare -a files_to_remove=(
    "JobCalculator Original.jsx"
    "Old_store-implementation.sh"
    "calculator-tests.sh"
    "campaign-factors-script.sh"
    "check-components.sh"
    "fix-ui-components.sh"
    "restructure-calculator.sh"
    "store-implementation.sh"
    "ui-components-implementation.sh"
    "final-integration-script.sh"
)

# Array of redundant component files
declare -a redundant_components=(
    "src/components/JobCalculator.jsx"  # Now using the one in features
    "src/components/calculator"         # Moved to features
    "src/components/core"              # Logic moved to features
    "src/lib/utils.ts"                 # Duplicate of src/lib/utils.ts
)

# Create backup directory
backup_dir="cleanup_backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$backup_dir"

echo "📦 Created backup directory: $backup_dir"

# Function to safely remove files
safe_remove() {
    if [ -e "$1" ]; then
        echo "🔍 Found $1"
        # Create necessary subdirectories in backup
        mkdir -p "$(dirname "$backup_dir/$1")"
        # Move to backup instead of deleting
        mv "$1" "$backup_dir/$1"
        echo "✅ Moved $1 to backup"
    fi
}

# Remove unnecessary script files
echo "🧹 Removing unnecessary script files..."
for file in "${files_to_remove[@]}"; do
    safe_remove "$file"
done

# Remove redundant component files
echo "🧹 Removing redundant component files..."
for component in "${redundant_components[@]}"; do
    safe_remove "$component"
done

# Clean up empty directories
echo "🧹 Cleaning up empty directories..."
find . -type d -empty -not -path "./.git/*" -not -path "./node_modules/*" -delete

echo "✨ Cleanup complete! All removed files are backed up in: $backup_dir"
echo "📝 Please review the backup directory to ensure no needed files were removed."
echo "   You can delete the backup directory once you've verified everything works."
