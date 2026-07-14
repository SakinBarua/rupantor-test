// LocalStorage Save System
const Save = {
  KEY_STATS: 'rupantor_stats',
  KEY_SETTINGS: 'rupantor_settings',
  KEY_TUTORIAL: 'rupantor_tutorial',
  
  getStats() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY_STATS)) || {
        games: 0, wins: 0, bestTime: null, bestScore: 0, winRate: 0
      };
    } catch { return { games: 0, wins: 0, bestTime: null, bestScore: 0, winRate: 0 }; }
  },
  
  saveStats(stats) {
    localStorage.setItem(this.KEY_STATS, JSON.stringify(stats));
  },
  
  updateStats(win, time, score) {
    const s = this.getStats();
    s.games++;
    if (win) s.wins++;
    s.winRate = s.games > 0 ? Math.round((s.wins / s.games) * 100) : 0;
    if (!s.bestTime || time < s.bestTime) s.bestTime = time;
    if (score > s.bestScore) s.bestScore = score;
    this.saveStats(s);
    return s;
  },
  
  getSettings() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY_SETTINGS)) || {
        sound: true, music: true, animations: true, volume: 0.7
      };
    } catch { return { sound: true, music: true, animations: true, volume: 0.7 }; }
  },
  
  saveSettings(settings) {
    localStorage.setItem(this.KEY_SETTINGS, JSON.stringify(settings));
  },
  
  getTutorialProgress() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY_TUTORIAL)) || { step: 0, completed: false };
    } catch { return { step: 0, completed: false }; }
  },
  
  saveTutorialProgress(step, completed) {
    localStorage.setItem(this.KEY_TUTORIAL, JSON.stringify({ step, completed }));
  },
  
  resetAll() {
    localStorage.removeItem(this.KEY_STATS);
    localStorage.removeItem(this.KEY_SETTINGS);
    localStorage.removeItem(this.KEY_TUTORIAL);
  }
};
