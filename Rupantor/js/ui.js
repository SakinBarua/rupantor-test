// UI.js - UI Utilities for RUPANTOR
(function() {
  'use strict';

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  // Create card HTML element
  function createCardElement(card, size = 'normal', extraClass = '') {
    if (!card) return null;
    
    const sizeClass = size === 'small' ? 'card-sm' : size === 'large' ? 'card-lg' : '';
    const cardEl = document.createElement('div');
    cardEl.className = `card cat-${card.c} ${sizeClass} ${extraClass}`.trim();
    cardEl.dataset.cardId = card.id;
    
    const icon = RupantorUtils.getCategoryIcon(card.c);
    
    cardEl.innerHTML = `
      <div class="card-inner">
        <div class="card-banner">
          <span class="card-number">#${String(card.id).padStart(3, '0')}</span>
          <span class="card-banner-icon">${icon}</span>
        </div>
        <div class="card-illustration">${icon}</div>
        <div class="card-name">${card.n}</div>
        ${card.a ? `<div class="card-ability"><span class="card-ability-title">◆ Ability</span>${card.a}</div>` : ''}
        ${card.f ? `<div class="card-flavor">"${card.f}"</div>` : ''}
        <div class="card-footer">${card.c.toUpperCase()}</div>
      </div>
    `;
    
    return cardEl;
  }

  // Create card back element
  function createCardBack(size = 'normal') {
    const sizeClass = size === 'small' ? 'card-sm' : '';
    const cardEl = document.createElement('div');
    cardEl.className = `card-back ${sizeClass}`;
    return cardEl;
  }

  // Toast notification
  function showToast(message, type = 'info', duration = 3000) {
    let container = $('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    container.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideInRight 0.3s ease reverse';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // Modal functions
  function showModal(modalId) {
    const modal = $(`#${modalId}`);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(modalId) {
    const modal = $(`#${modalId}`);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function closeAllModals() {
    $$('.modal-overlay').forEach(modal => {
      modal.classList.remove('active');
    });
    document.body.style.overflow = '';
  }

  // Ripple effect on buttons
  function addRippleEffect(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  }

  // Animate score update
  function animateScore(element, oldValue, newValue) {
    if (!element) return;
    
    element.classList.add('animate-score-pop');
    element.textContent = newValue;
    
    // Create floating number
    const diff = newValue - oldValue;
    if (diff > 0) {
      const floatEl = document.createElement('span');
      floatEl.className = 'animate-float-score';
      floatEl.textContent = `+${diff}`;
      floatEl.style.cssText = `
        position: absolute;
        color: var(--success);
        font-weight: 700;
        font-size: 1.2rem;
        pointer-events: none;
        z-index: 1000;
      `;
      
      const rect = element.getBoundingClientRect();
      floatEl.style.left = `${rect.left + rect.width/2}px`;
      floatEl.style.top = `${rect.top}px`;
      
      document.body.appendChild(floatEl);
      setTimeout(() => floatEl.remove(), 800);
    }
    
    setTimeout(() => element.classList.remove('animate-score-pop'), 300);
  }

  // Update turn indicator
  function updateTurnIndicator(isPlayerTurn) {
    const indicator = $('.turn-indicator');
    if (indicator) {
      indicator.className = `turn-indicator ${isPlayerTurn ? 'player' : 'ai'}`;
      indicator.textContent = isPlayerTurn ? 'Your Turn' : 'AI Thinking...';
    }
  }

  // Highlight playable cards
  function highlightPlayableCards(handContainer, worldState) {
    if (!handContainer || !worldState) return;
    
    const cards = handContainer.querySelectorAll('.card');
    cards.forEach(cardEl => {
      const cardId = parseInt(cardEl.dataset.cardId);
      const card = RupantorApp.data.cards.find(c => c.id === cardId);
      
      if (card && canPlayCard(card, worldState)) {
        cardEl.classList.add('playable');
      } else {
        cardEl.classList.remove('playable');
      }
    });
  }

  // Check if card can be played
  function canPlayCard(card, worldState) {
    if (!card || !worldState || card.isReact) return false;
    
    // Special cards have unique rules
    if (card.c === 'Special') {
      if (worldState.tp && worldState.tp.includes('Special')) return true;
      if ([85, 89, 90, 91].includes(card.id)) return true;
    }
    
    // Check transform paths
    if (worldState.tp && worldState.tp.includes(card.c)) return true;
    
    // World cards
    if (card.isWorld && worldState.tp && worldState.tp.includes('World')) return true;
    
    return false;
  }

  // Confetti animation
  function launchConfetti() {
    const colors = ['#D4A84B', '#2E7D5B', '#4A90A4', '#C97B3C', '#6EC6E6'];
    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);
    
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = `${Math.random() * 2}s`;
      confetti.style.animationDuration = `${2 + Math.random() * 2}s`;
      
      container.appendChild(confetti);
    }
    
    setTimeout(() => container.remove(), 5000);
  }

  // Export UI utilities
  window.RupantorUI = {
    createCardElement,
    createCardBack,
    showToast,
    showModal,
    closeModal,
    closeAllModals,
    addRippleEffect,
    animateScore,
    updateTurnIndicator,
    highlightPlayableCards,
    canPlayCard,
    launchConfetti
  };

  // Add global ripple listener
  document.addEventListener('pointerdown', (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.classList.contains('btn')) {
      RupantorUI.addRippleEffect(e);
    }
  });

  // Close modals on overlay click
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      RupantorUI.closeAllModals();
    }
    if (e.target.hasAttribute('data-close')) {
      RupantorUI.closeModal(e.target.dataset.close);
    }
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      RupantorUI.closeAllModals();
    }
  });
})();
