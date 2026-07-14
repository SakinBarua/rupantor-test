// App.js - Main Controller for RUPANTOR
(function() {
  'use strict';

  // Global app state
  window.RupantorApp = {
    version: '1.0.0',
    loaded: false,
    data: {
      cards: [],
      missions: [],
      rules: []
    }
  };

  // Utility functions
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  // Load JSON data
  async function loadJSON(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`Failed to load ${url}:`, error);
      return null;
    }
  }

  // Initialize app
  async function init() {
    console.log('RUPANTOR v' + RupantorApp.version);
    
    // Load data files
    const [cardsData, missionsData, rulesData] = await Promise.all([
      loadJSON('data/cards.json'),
      loadJSON('data/missions.json'),
      loadJSON('data/rules.json')
    ]);

    if (cardsData && cardsData.cards) {
      RupantorApp.data.cards = cardsData.cards;
    }
    if (missionsData && missionsData.missions) {
      RupantorApp.data.missions = missionsData.missions;
    }
    if (rulesData && rulesData.rules) {
      RupantorApp.data.rules = rulesData.rules;
    }

    RupantorApp.loaded = true;
    console.log('Data loaded:', {
      cards: RupantorApp.data.cards.length,
      missions: RupantorApp.data.missions.length,
      rules: RupantorApp.data.rules.length
    });

    // Trigger page-specific initialization
    if (typeof window.onRupantorReady === 'function') {
      window.onRupantorReady();
    }
  }

  // Category utilities
  const CATEGORIES = ['Nature', 'Weather', 'Energy', 'Water', 'Earth', 'Plants', 'Animals', 'Objects', 'Reaction', 'Mission', 'World', 'Special'];
  
  const CATEGORY_ICONS = {
    'Nature': '🌿',
    'Weather': '☁️',
    'Energy': '☀️',
    'Water': '💧',
    'Earth': '⛰️',
    'Plants': '🌱',
    'Animals': '🦋',
    'Objects': '🌂',
    'Reaction': '↻',
    'Mission': '🎯',
    'World': '🌍',
    'Special': '✦'
  };

  function getCategoryIcon(category) {
    return CATEGORY_ICONS[category] || '❓';
  }

  function getCategoryColor(category) {
    const colors = {
      'Nature': '#2E7D5B',
      'Weather': '#4A6FA5',
      'Energy': '#D4A84B',
      'Water': '#3E8FB0',
      'Earth': '#8B6F47',
      'Plants': '#5A8F3D',
      'Animals': '#B65A3C',
      'Objects': '#607D8B',
      'Reaction': '#C97B3C',
      'Mission': '#5A2D8F',
      'World': '#1B2A1F',
      'Special': '#7B1FA2'
    };
    return colors[category] || '#7A8290';
  }

  // Shuffle array (Fisher-Yates)
  function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Debounce function
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Format time (seconds to mm:ss)
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  // Export utilities
  window.RupantorUtils = {
    $,
    $$,
    loadJSON,
    CATEGORIES,
    CATEGORY_ICONS,
    getCategoryIcon,
    getCategoryColor,
    shuffle,
    debounce,
    formatTime
  };

  // Start app when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
