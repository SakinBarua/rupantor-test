// Cards Data Manager
const Cards = {
  data: [],
  categories: ['Nature','Weather','Energy','Water','Earth','Plants','Animals','Objects','Reaction','Mission','World','Special'],
  icons: {
    'Nature': '🌿', 'Weather': '☁️', 'Energy': '☀️', 'Water': '💧',
    'Earth': '⛰️', 'Plants': '🌱', 'Animals': '🦋', 'Objects': '🌂',
    'Reaction': '↻', 'Mission': '🎯', 'World': '🌍', 'Special': '✦'
  },
  
  async load() {
    try {
      const res = await fetch('data/cards.json');
      const json = await res.json();
      this.data = json.cards;
      return this.data;
    } catch (e) {
      console.error('Failed to load cards:', e);
      return [];
    }
  },
  
  getById(id) {
    return this.data.find(c => c.id === id);
  },
  
  getByCategory(cat) {
    return this.data.filter(c => c.c === cat);
  },
  
  getStartCards() {
    return this.data.filter(c => c.isStart && c.isWorld);
  },
  
  getPlayable(ws) {
    if (!ws) return [];
    return this.data.filter(card => {
      if (card.isReact || card.isWorld) return false;
      if (card.c === 'Special' && [85,89,90,91].includes(card.id)) return true;
      if (ws.tp && ws.tp.includes(card.c)) return true;
      return false;
    });
  },
  
  search(query) {
    const q = query.toLowerCase();
    return this.data.filter(c => 
      c.n.toLowerCase().includes(q) || 
      c.c.toLowerCase().includes(q) ||
      String(c.id).includes(q)
    );
  },
  
  getCategoryColor(cat) {
    const colors = {
      'Nature': '#2E7D5B', 'Weather': '#4A6FA5', 'Energy': '#D4A84B',
      'Water': '#3E8FB0', 'Earth': '#8B6F47', 'Plants': '#5A8F3D',
      'Animals': '#B65A3C', 'Objects': '#607D8B', 'Reaction': '#C97B3C',
      'Mission': '#5A2D8F', 'World': '#1B2A1F', 'Special': '#7B1FA2'
    };
    return colors[cat] || '#7A8290';
  }
};
