// Animation Manager
const Animation = {
  enabled: true,
  
  setEnabled(val) {
    this.enabled = val;
    document.documentElement.style.setProperty('--trans-fast', val ? '0.15s ease' : '0.01ms');
    document.documentElement.style.setProperty('--trans-med', val ? '0.22s cubic-bezier(0.22, 0.8, 0.2, 1)' : '0.01ms');
    document.documentElement.style.setProperty('--trans-slow', val ? '0.4s cubic-bezier(0.22, 0.8, 0.2, 1)' : '0.01ms');
  },
  
  cardLift(cardEl) {
    if (!this.enabled || !cardEl) return;
    cardEl.classList.add('selected');
  },
  
  cardDrop(cardEl) {
    if (!this.enabled || !cardEl) return;
    cardEl.classList.remove('selected');
    cardEl.classList.add('animate-squash-settle');
    setTimeout(() => cardEl.classList.remove('animate-squash-settle'), 300);
  },
  
  cardFloatTo(cardEl, targetX, targetY, delay = 0) {
    return new Promise(resolve => {
      if (!this.enabled || !cardEl) {
        resolve();
        return;
      }
      
      const rect = cardEl.getBoundingClientRect();
      const startX = rect.left;
      const startY = rect.top;
      
      cardEl.style.transition = `transform ${0.22}s cubic-bezier(0.22, 0.8, 0.2, 1)`;
      cardEl.style.zIndex = '1000';
      
      setTimeout(() => {
        const dx = targetX - startX;
        const dy = targetY - rect.top;
        cardEl.style.transform = `translate(${dx}px, ${dy}px) scale(1.05)`;
        
        setTimeout(() => {
          this.cardDrop(cardEl);
          resolve();
        }, 220);
      }, delay);
    });
  },
  
  deckDraw(deckEl, handEl) {
    return new Promise(resolve => {
      if (!this.enabled) {
        resolve();
        return;
      }
      
      const card = document.createElement('div');
      card.className = 'card-back animate-fade-in-up';
      card.style.position = 'absolute';
      
      const deckRect = deckEl.getBoundingClientRect();
      card.style.left = deckRect.left + 'px';
      card.style.top = deckRect.top + 'px';
      card.style.width = deckRect.width + 'px';
      card.style.height = deckRect.height + 'px';
      
      document.body.appendChild(card);
      
      requestAnimationFrame(() => {
        const handRect = handEl.getBoundingClientRect();
        const targetX = handRect.left + handRect.width / 2 - deckRect.width / 2;
        const targetY = handRect.top;
        
        card.style.transition = 'all 0.4s cubic-bezier(0.22, 0.8, 0.2, 1)';
        card.style.transform = `translate(${targetX - deckRect.left}px, ${targetY - deckRect.top}px) rotate(0deg) scale(1)`;
        
        setTimeout(() => {
          card.remove();
          resolve();
        }, 400);
      });
    });
  },
  
  scorePop(scoreEl, points) {
    if (!this.enabled || !scoreEl) return;
    
    scoreEl.classList.add('animate-score-pop');
    
    const floatPlus = document.createElement('span');
    floatPlus.className = 'animate-float-plus';
    floatPlus.textContent = `+${points}`;
    floatPlus.style.cssText = `
      position: absolute;
      color: var(--gold);
      font-weight: 700;
      font-size: 1.2rem;
      pointer-events: none;
    `;
    
    scoreEl.parentElement.style.position = 'relative';
    scoreEl.parentElement.appendChild(floatPlus);
    
    setTimeout(() => {
      scoreEl.classList.remove('animate-score-pop');
      floatPlus.remove();
    }, 800);
  },
  
  confetti(count = 50) {
    if (!this.enabled) return;
    
    const container = document.querySelector('.confetti-container') || (() => {
      const c = document.createElement('div');
      c.className = 'confetti-container';
      document.body.appendChild(c);
      return c;
    })();
    
    const colors = ['#D4A84B', '#2E7D5B', '#4A90A4', '#C97B3C', '#7B1FA2'];
    
    for (let i = 0; i < count; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 2 + 's';
      confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      
      container.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 5000);
    }
  },
  
  turnPulse(el, isPlayer) {
    if (!el) return;
    el.classList.remove('animate-turn-pulse', 'animate-turn-pulse-ai');
    void el.offsetWidth; // Force reflow
    el.classList.add(isPlayer ? 'animate-turn-pulse' : 'animate-turn-pulse-ai');
  }
};
