// Game Engine
const MAX_HAND = 7;
const WIN_SCORE = 30;

const GS = {
  deck: [], history: [], worldState: null,
  players: [], current: 0, turn: 1, moves: 0,
  phase: 'playing', startTime: 0, paused: false, pauseTime: 0,
  undoStack: [], autoPlaying: false, playedCats: {},
  timerInt: null, chain: []
};

const Engine = {
  shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },
  
  canPlay(card, ws) {
    if (!card || !ws || card.isReact) return false;
    if (card.c === 'Special' && [85,89,90,91].includes(card.id)) return true;
    if (ws.tp && ws.tp.includes(card.c)) return true;
    if (card.isWorld && ws.tp && ws.tp.includes('World')) return true;
    return false;
  },
  
  safeDraw(playerIdx) {
    const p = GS.players[playerIdx];
    if (!p || p.hand.length >= MAX_HAND) return null;
    if (GS.deck.length === 0) {
      if (GS.history.length > 0) {
        GS.deck = this.shuffle(GS.history.slice());
        GS.history = [];
      } else {
        return null;
      }
    }
    return GS.deck.pop();
  },
  
  getChainPoints(length, isPure) {
    const pts = {1:1, 2:1, 3:3, 4:6, 5:10}[length] || 0;
    return isPure ? pts * 2 : pts;
  },
  
  findAutoChain(hand, ws, maxLen = 4) {
    const playable = hand.filter(c => this.canPlay(c, ws));
    if (playable.length === 0) return [];
    
    // Prefer pure chains
    const byCat = {};
    playable.forEach(c => {
      byCat[c.c] = byCat[c.c] || [];
      byCat[c.c].push(c);
    });
    
    for (const cat in byCat) {
      if (byCat[cat].length >= 2 && byCat[cat].length <= maxLen) {
        return byCat[cat].slice(0, Math.min(byCat[cat].length, maxLen));
      }
    }
    
    // Fallback: single best card
    return [playable[Math.floor(Math.random() * playable.length)]];
  },
  
  checkWin(score) {
    return score >= WIN_SCORE;
  },
  
  startTimer() {
    if (GS.timerInt) clearInterval(GS.timerInt);
    GS.startTime = Date.now() - (GS.pauseTime || 0);
    GS.timerInt = setInterval(() => {
      const elapsed = Math.floor((Date.now() - GS.startTime) / 1000);
      const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
      const secs = String(elapsed % 60).padStart(2, '0');
      const el = document.getElementById('timer');
      if (el) el.textContent = `${mins}:${secs}`;
    }, 1000);
  },
  
  stopTimer() {
    if (GS.timerInt) clearInterval(GS.timerInt);
    GS.pauseTime = Date.now() - GS.startTime;
  }
};
