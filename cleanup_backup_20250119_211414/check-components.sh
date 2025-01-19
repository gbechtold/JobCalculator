#!/bin/bash

# Farben für Output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Basis-Verzeichnisse
BASE_DIR="$(pwd)"
SECTIONS_DIR="${BASE_DIR}/src/features/calculator/ui/sections"

# Erstelle Verzeichnisse falls sie nicht existieren
mkdir -p "${SECTIONS_DIR}"

# Liste aller erwarteten Komponenten
declare -a components=(
    "RegionSection"
    "HotelSegmentSection"
    "AgeGroupSection"
    "DemographicsSection"
    "DistanceSection"
    "PowerUpsSection"
    "MarketingCampaignSection"
    "ResultsSection"
    "WechselgruendeSection"
    "AnreizeSection"
    "HinderungsgruendeSection"
    "LoesungsansaetzeSection"
)

echo -e "${BLUE}Checking components...${NC}"

# Prüfe jede Komponente
for component in "${components[@]}"; do
    if [ ! -f "${SECTIONS_DIR}/${component}.tsx" ]; then
        echo -e "${RED}Missing:${NC} ${component}"
        # Hier könnten wir die fehlende Komponente erstellen
        # create_component "${component}"
    else
        echo -e "${GREEN}Found:${NC} ${component}"
    fi
done

echo -e "\n${BLUE}Next steps:${NC}"
echo "1. Create missing components"
echo "2. Verify imports in Calculator.tsx"
echo "3. Check component implementations"