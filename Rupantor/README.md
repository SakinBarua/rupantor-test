# RUPANTOR (রূপান্তর) - Complete Premium Card Game Website

**"Everything Transforms." / "সবকিছু পরিবর্তিত হয়।"**

A transformation-based card game website built with vanilla HTML5, CSS3, and JavaScript ES2024. No frameworks, no libraries — pure premium code.

## 📁 Project Structure

```
Rupantor/
├── index.html              → Home page
├── play.html               → Complete playable game (single file)
├── tutorial.html           → Interactive 7-step tutorial (TODO)
├── cards.html              → Card library (TODO)
├── rulebook.html           → Searchable rulebook (TODO)
├── about.html              → Game story, philosophy (TODO)
├── settings.html           → Settings & statistics (TODO)
├── components/
│   └── header.html         → Reusable navigation bar
├── data/
│   ├── cards.json          → 108 card definitions
│   ├── missions.json       → 8 mission definitions
│   └── rules.json          → 11 rule sections
├── css/
│   ├── style.css           → Main stylesheet
│   ├── responsive.css      → Responsive breakpoints
│   ├── animation.css       → Keyframe animations
│   ├── cards.css           → Card visual styles
│   ├── tutorial.css        → Tutorial page styles
│   └── gameplay.css        → Game board styles
├── js/
│   ├── app.js              → Main controller, data loading
│   └── ui.js               → UI utilities
├── assets/
│   ├── images/             → Game images
│   ├── icons/              → Category icons
│   ├── logo/               → Logo files
│   └── audio/              → Audio files
├── manifest.json           → PWA manifest (TODO)
└── README.md               → This file
```

## 🎮 Game Features

### Core Mechanics
- **Transformation System**: Transform World State cards by playing matching category cards
- **12 Categories**: Nature, Weather, Energy, Water, Earth, Plants, Animals, Objects, Reaction, Mission, World, Special
- **108 Unique Cards**: Each with special abilities and flavor text
- **Chain Building**: Play multiple cards in sequence for multiplied points
- **Pure Chain Bonus**: 2x points for chains of same category
- **Mission System**: Complete secret objectives for bonus points
- **AI Opponent**: Intelligent AI that adapts to your strategy

### Gameplay Features
- **Hand Limit**: Maximum 7 cards (must play or pass)
- **Deck Recycling**: History pile reshuffles when deck empties
- **Undo System**: 20-step undo history
- **Hint System**: Shows best playable card
- **Pause/Resume**: Freeze game anytime
- **Auto-Save**: Progress saved to LocalStorage
- **Statistics Tracking**: Games played, wins, best score

### UI/UX Features
- **Dark Luxury Theme**: Deep navy backgrounds with amber gold accents
- **Glassmorphism**: Backdrop blur effects on panels
- **Premium Animations**: Card float, squash-settle, score pop, confetti
- **Responsive Design**: Works from 320px to 4K displays
- **Keyboard Shortcuts**: H (hint), P (pause), Ctrl+Z (undo), Esc (close)
- **Accessibility**: ARIA labels, keyboard navigation, reduced motion support

## 🚀 Quick Start

1. **Open `index.html`** in a modern browser (Chrome, Firefox, Edge, Safari)
2. **Click "খেলুন (Play)"** to start the game
3. **Draw a card** by clicking the deck
4. **Play cards** by clicking playable cards in your hand (green glow)
5. **Reach 30 points** or complete your mission to win!

## 📊 Card Distribution

| Category | Count | IDs | Bengali |
|----------|-------|-----|---------|
| Nature | 12 | 1–12 | প্রকৃতি |
| Weather | 12 | 13–24 | আবহাওয়া |
| Energy | 10 | 25–34 | শক্তি |
| Water | 10 | 35–44 | পানি |
| Earth | 10 | 45–54 | পৃথিবী |
| Plants | 10 | 55–64 | উদ্ভিদ |
| Animals | 10 | 65–74 | প্রাণী |
| Objects | 10 | 75–84 | বস্তু |
| Special | 8 | 85–92 | বিশেষ |
| Reaction | 8 | 93–100 | রিঅ্যাকশন |
| World | 8 | 101–108 | বিশ্ব |

## 🎯 Scoring System

| Action | Points |
|--------|--------|
| Single transform | 1 |
| 2-chain | 1 |
| 3-chain | 3 |
| 4-chain | 6 |
| 5-chain | 10 |
| Pure chain | 2x multiplier |
| Mission completion | 10–20 |
| Successful reaction | 1 |

## 🏆 Win Conditions

1. **First to 30 points**
2. **Mission complete + highest score**
3. **Deck exhausted** — highest score wins

## 🎨 Design System

### Colors
- **Navy (#0F1419)**: Primary background
- **Emerald (#2E7D5B)**: Brand primary
- **Amber Gold (#D4A84B)**: Accent, highlights
- **Ivory (#FAF7F2)**: Text, card background
- **Teal (#4A90A4)**: Secondary accent, AI

### Typography
- **Titles**: Inter 700–900
- **Body**: Inter 400–500
- **Bengali**: Noto Serif Bengali 400–700

### Visual Style
- Modern, minimal, premium, elegant
- NO vintage, medieval, fantasy, cartoon
- Culturally and religiously neutral
- Nature and science themed

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `H` | Show hint |
| `P` | Pause/Resume |
| `Ctrl+Z` | Undo |
| `Esc` | Close modals |

## 📱 Responsive Breakpoints

- **4K**: 1920px+ (larger fonts)
- **Desktop**: 1024px–1919px
- **Tablet**: 768px–1023px
- **Mobile**: 320px–767px
- **Landscape**: Max height 500px

## ♿ Accessibility

- ✅ Keyboard navigation
- ✅ ARIA labels on buttons
- ✅ `prefers-reduced-motion` support
- ✅ `prefers-contrast: high` support
- ✅ Color-blind friendly (icons + text redundant)
- ✅ WCAG AA contrast (4.5:1 minimum)

## 🔧 Technical Requirements

- **Browser**: Modern browser with ES2024 support
- **JavaScript**: Enabled
- **LocalStorage**: For save system
- **No server required**: Runs entirely client-side

## 📝 TODO Pages

The following pages are planned but not yet implemented:

- [ ] `tutorial.html` — Interactive 7-step tutorial
- [ ] `cards.html` — Full card library with search/filter
- [ ] `rulebook.html` — Searchable rulebook
- [ ] `about.html` — Game story and philosophy
- [ ] `settings.html` — Settings and statistics
- [ ] `manifest.json` — PWA manifest for installability

## 🌟 Quality Checklist

- [x] Zero JavaScript console errors
- [x] Header loads via fetch with fallback
- [x] 108 unique cards defined
- [x] 12 categories with correct colors
- [x] Hand limit enforced (MAX_HAND = 7)
- [x] Deck reshuffles history when empty
- [x] History pile visible and updating
- [x] Auto-play on card click
- [x] Card animations (float, squash-settle)
- [x] Score pop animation
- [x] Turn indicator pulse
- [x] Playable card green glow
- [x] Undo works (20 steps)
- [x] Hint works
- [x] Pause works
- [x] Statistics saved to LocalStorage
- [x] Responsive 320px–4K
- [x] Keyboard shortcuts work
- [x] Ripple effects on buttons
- [x] Confetti on win
- [x] Game-over modal with stats
- [x] AI opponent functional
- [x] Mission system works
- [x] Cultural/religious neutrality maintained

## 📄 License

This project is created as a demonstration of premium vanilla web development. All card names, abilities, and game mechanics are original creations.

## 🙏 Credits

**Game Design & Development**: RUPANTOR Team  
**Art Direction**: Nature-inspired, culturally neutral  
**Technology**: Vanilla HTML5, CSS3, JavaScript ES2024  

---

**RUPANTOR © 2024**  
*"Everything Transforms." / "সবকিছু পরিবর্তিত হয়।"*
