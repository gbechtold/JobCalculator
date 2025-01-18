# Job Calculator

Ein intelligenter Rechner zur Bestimmung der Reichweite von Stellenanzeigen im Hotelgewerbe.

## 🚀 Features

- Regionale Reichweitenberechnung für ganz Österreich
- Detaillierte Segmentierung nach Hotelkategorien
- Demografische Zielgruppenauswahl
- Powerup-System für zusätzliche Reichweite
- Dynamische Kampagnenfaktoren
- Responsive Design
- Echtzeit-Berechnungen

## 🛠 Technologien

- React 19
- Next.js 15
- TypeScript
- Tailwind CSS
- shadcn/ui Components
- Radix UI Primitives

## 📦 Installation

```bash
# Repository klonen
git clone https://github.com/gbechtold/JobCalculator.git

# In das Projektverzeichnis wechseln
cd JobCalculator

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

## 🏗 Projekt-Struktur

```
src/
├── app/                    # Next.js App Router
├── components/            # React Komponenten
│   ├── Calculator/       # Hauptrechner-Komponente
│   └── ui/              # UI Komponenten
└── lib/                 # Utilities
```

## 🧪 Entwicklung

```bash
# Entwicklungsserver
npm run dev

# TypeScript-Check
npm run type-check

# Linting
npm run lint

# Build
npm run build
```

## 🚀 Deployment

Das Projekt kann einfach auf Vercel oder anderen Next.js-kompatiblen Hosting-Plattformen deployt werden.

### Deployment auf GitHub Pages

1. Repository Settings öffnen
2. Pages aktivieren
3. Build Command: `npm run build && npm run export`
4. Output Directory: `out`

## 📄 Lizenz

MIT

## 👥 Contribution

Beiträge sind willkommen! Bitte erst Issues erstellen und dann Pull Requests einreichen.
