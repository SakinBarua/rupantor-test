// Settings Manager
const Settings = {
  defaults: {
    sound: true,
    music: true,
    animations: true,
    volume: 0.7,
    language: 'bn'
  },
  
  data: null,
  
  load() {
    this.data = Save.getSettings();
    return this.data;
  },
  
  get(key) {
    if (!this.data) this.load();
    return this.data[key] ?? this.defaults[key];
  },
  
  set(key, value) {
    if (!this.data) this.load();
    this.data[key] = value;
    Save.saveSettings(this.data);
    
    // Apply settings
    if (key === 'sound') Audio.setEnabled(value);
    if (key === 'volume') Audio.setVolume(value);
    if (key === 'animations') Animation.setEnabled(value);
  },
  
  reset() {
    this.data = { ...this.defaults };
    Save.saveSettings(this.data);
    this.applyAll();
  },
  
  applyAll() {
    Audio.setEnabled(this.get('sound'));
    Audio.setVolume(this.get('volume'));
    Animation.setEnabled(this.get('animations'));
  }
};
