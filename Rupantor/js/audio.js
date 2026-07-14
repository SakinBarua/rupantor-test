// Web Audio Sound Manager
const Audio = {
  ctx: null,
  enabled: true,
  volume: 0.7,
  
  init() {
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn('Web Audio not supported');
      this.enabled = false;
    }
  },
  
  setEnabled(val) {
    this.enabled = val;
    if (this.ctx && val) this.ctx.resume();
  },
  
  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
  },
  
  playTone(freq, type, duration, delay = 0) {
    if (!this.enabled || !this.ctx) return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delay);
    
    gain.gain.setValueAtTime(this.volume * 0.3, this.ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + delay + duration);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(this.ctx.currentTime + delay);
    osc.stop(this.ctx.currentTime + delay + duration);
  },
  
  playDraw() {
    this.playTone(523.25, 'sine', 0.1); // C5
  },
  
  playPlay() {
    this.playTone(659.25, 'sine', 0.15, 0); // E5
    this.playTone(783.99, 'sine', 0.15, 0.05); // G5
  },
  
  playChain() {
    this.playTone(523.25, 'sine', 0.1, 0);
    this.playTone(659.25, 'sine', 0.1, 0.1);
    this.playTone(783.99, 'sine', 0.15, 0.2);
  },
  
  playScore() {
    this.playTone(523.25, 'sine', 0.1, 0);
    this.playTone(659.25, 'sine', 0.1, 0.1);
    this.playTone(783.99, 'sine', 0.1, 0.2);
    this.playTone(1046.50, 'sine', 0.2, 0.3); // C6
  },
  
  playWin() {
    [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((freq, i) => {
      this.playTone(freq, 'sine', 0.2, i * 0.15);
    });
  },
  
  playError() {
    this.playTone(150, 'sawtooth', 0.2);
  },
  
  playPass() {
    this.playTone(300, 'triangle', 0.15);
  }
};
