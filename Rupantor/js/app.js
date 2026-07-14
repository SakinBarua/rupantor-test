// Main App Controller
const App = {
  async init() {
    await this.loadHeader();
    await Cards.load();
    await Missions.load();
    this.setupGlobalEvents();
    console.log('RUPANTOR initialized');
  },
  
  async loadHeader() {
    try {
      const res = await fetch('components/header.html');
      const html = await res.text();
      const header = document.getElementById('header');
      if (header) header.innerHTML = html;
    } catch (e) {
      console.warn('Header fetch failed, using fallback');
      this.renderFallbackHeader();
    }
  },
  
  renderFallbackHeader() {
    const header = document.getElementById('header');
    if (!header) return;
    header.innerHTML = `
      <nav class="navbar">
        <div class="nav-brand">
          <div class="logo-circle">রূ</div>
          <span class="brand-title">RUPANTOR</span>
        </div>
        <ul class="nav-links" style="display:flex">
          <li><a href="index.html">হোম</a></li>
          <li><a href="tutorial.html">টিউটোরিয়াল</a></li>
          <li><a href="play.html">খেলুন</a></li>
          <li><a href="cards.html">কার্ড</a></li>
          <li><a href="rulebook.html">নিয়ম</a></li>
          <li><a href="about.html">পরিচিতি</a></li>
          <li><a href="settings.html">সেটিংস</a></li>
        </ul>
      </nav>
    `;
  },
  
  setupGlobalEvents() {
    document.addEventListener('pointerdown', UI.rippleEffect);
    document.addEventListener('click', (e) => {
      if (e.target.hasAttribute('data-close')) {
        const modalId = e.target.dataset.close;
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove('active');
      }
      if (e.target.classList.contains('overlay')) {
        e.target.classList.remove('active');
      }
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.card-modal.active').forEach(m => {
          m.classList.remove('active');
          m.previousElementSibling?.classList.remove('active');
        });
      }
    });
  }
};

// Missions Manager
const Missions = {
  data: [],
  
  async load() {
    try {
      const res = await fetch('data/missions.json');
      const json = await res.json();
      this.data = json.missions;
      return this.data;
    } catch (e) {
      console.error('Failed to load missions:', e);
      return [];
    }
  },
  
  getRandom(count = 3) {
    const shuffled = [...this.data].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
