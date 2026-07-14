# RUPANTOR (রূপান্তর)

**Everything Transforms.** / **সবকিছু পরিবর্তিত হয়।**

A premium transformation-based card game built with vanilla HTML5, CSS3, and JavaScript ES2024.

## 🎮 Game Overview

RUPANTOR is NOT a matching game. Players transform the current World State into new states by playing cards whose category matches the World State's transformation paths.

- **Players:** 2–6 (website: 1 player vs AI)
- **Age:** 10+
- **Play Time:** 15–30 minutes
- **Cards:** 108 unique cards across 12 categories
- **Missions:** 45+ secret mission cards

## 📁 Project Structure

```
Rupantor/
├── index.html              # Home page
├── play.html               # Complete playable game (single file)
├── tutorial.html           # Interactive 7-step tutorial
├── cards.html              # Card library (108 cards)
├── rulebook.html           # Searchable rulebook
├── about.html              # Game story & philosophy
├── settings.html           # Settings & statistics
├── components/
│   └── header.html         # Reusable navigation
├── data/
│   ├── cards.json          # 108 card definitions
│   ├── missions.json       # 45 mission definitions
│   └── rules.json          # Rulebook sections
├── css/
│   ├── style.css           # Main stylesheet
│   ├── responsive.css      # Responsive breakpoints
│   ├── animation.css       # Keyframe animations
│   ├── cards.css           # Card visual styles
│   ├── tutorial.css        # Tutorial page styles
│   └── gameplay.css        # Game board styles
├── js/
│   ├── app.js              # Main controller
│   ├── ui.js               # UI utilities
│   ├── cards.js            # Card data manager
│   ├── engine.js           # Game engine
│   ├── validation.js       # Rule validation
│   ├── animation.js        # Animation manager
│   ├── audio.js            # Web Audio sound
│   ├── save.js             # LocalStorage saves
│   ├── settings.js         # Settings manager
│   └── tutorial.js         # Tutorial system
├── assets/
│   ├── images/
│   ├── icons/
│   ├── logo/
│   └── audio/
├── manifest.json           # PWA manifest
└── README.md               # This file
```

## 🚀 Features

- **12 Categories:** Nature, Weather, Energy, Water, Earth, Plants, Animals, Objects, Reaction, Mission, World, Special
- **Chain System:** Build chains up to 5 cards for bonus points
- **Pure Chain Bonus:** 2x multiplier for same-category chains
- **AI Opponent:** Strategic AI with auto-chain detection
- **Mission System:** 45+ secret objectives
- **Undo/Redo:** 20-step history
- **Auto-Save:** LocalStorage persistence
- **Statistics:** Games, wins, win rate, best time, best score
- **Responsive:** 320px to 4K support
- **Accessibility:** Keyboard navigation, ARIA labels, reduced motion support
- **PWA Ready:** Install as native app

## 🎯 How to Play

1. **Draw** 1 card from deck
2. **Observe** the World State and your hand
3. **Plan** your transformation
4. **Transform** by playing a card whose category matches a transform path
5. **Resolve** reactions
6. **End** turn (hand limit: 7 cards)

### Scoring

| Action | Points |
|--------|--------|
| Single transform | 1 |
| 2-chain | 1 |
| 3-chain | 3 |
| 4-chain | 6 |
| 5-chain | 10 |
| Pure chain | 2x multiplier |
| Mission complete | 10–20 |
| Successful reaction | 1 |

### Win Conditions

1. Reach 30 points first
2. Complete mission with highest score when deck exhausted
3. Deck empty — highest score wins

## 🛠️ Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Grid, Flexbox, Custom Properties, backdrop-filter, animations
- **Vanilla JavaScript ES2024** — No frameworks, no libraries
- **Web Audio API** — Programmatic sound effects
- **Local Storage API** — Save game, statistics, settings
- **Google Fonts** — Inter (sans), Noto Serif Bengali (Bengali)

## 🌐 Running Locally

1. Clone or download the project
2. Open `index.html` in a modern browser
3. For full functionality, serve via local server:
   ```bash
   python -m http.server 8000
   # or
   npx serve .
   ```
4. Navigate to `http://localhost:8000`

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎨 Design Principles

- **Dark Luxury:** Deep navy backgrounds with amber gold accents
- **Glassmorphism:** Backdrop blur on panels, modals, header
- **Modern Minimal:** No vintage, medieval, fantasy, or cartoon elements
- **Cultural Neutral:** Nature and science themed, religion-neutral

## 📄 License

© 2024 RUPANTOR. All rights reserved.

---

**Built with ❤️ using pure web technologies**
