// UI Utilities
const UI = {
  $: (id) => document.getElementById(id),
  
  toast(msg, type='info') {
    const container = this.$('toastContainer') || this.createToastContainer();
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<button class="toast-close" onclick="this.parentElement.remove()">×</button>${msg}`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  },
  
  createToastContainer() {
    const c = document.createElement('div');
    c.id = 'toastContainer';
    c.className = 'toast-container';
    document.body.appendChild(c);
    return c;
  },
  
  modal(content, onClose) {
    const overlay = document.createElement('div');
    overlay.className = 'card-modal-overlay';
    const modal = document.createElement('div');
    modal.className = 'card-modal';
    modal.innerHTML = content;
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
    
    setTimeout(() => {
      overlay.classList.add('active');
      modal.classList.add('active');
    }, 10);
    
    const close = () => {
      overlay.classList.remove('active');
      modal.classList.remove('active');
      setTimeout(() => {
        overlay.remove();
        modal.remove();
        if (onClose) onClose();
      }, 300);
    };
    
    modal.querySelector('.card-modal-close')?.addEventListener('click', close);
    overlay.addEventListener('click', close);
    document.addEventListener('keydown', function h(e) {
      if (e.key === 'Escape') {
        document.removeEventListener('keydown', h);
        close();
      }
    });
  },
  
  cardHTML(card, size='normal', extraClass='') {
    if (!card) return '';
    const icon = Cards.icons[card.c] || '?';
    const num = String(card.id).padStart(3, '0');
    const cls = size === 'large' ? 'world-state' : '';
    return `
      <div class="card ${cls} ${extraClass}" data-id="${card.id}" data-category="${card.c}">
        <div class="card-banner">
          <span class="card-number">#${num}</span>
          <span class="card-icon">${icon}</span>
        </div>
        <div class="card-illustration">${icon}</div>
        <div class="card-name">${card.n}</div>
        <div class="card-ability"><strong class="card-ability-title">◆ Ability</strong>${card.a}</div>
        <div class="card-flavor">"${card.f}"</div>
        <div class="card-footer">${card.c.toUpperCase()}</div>
      </div>
    `;
  },
  
  cardBackHTML() {
    return '<div class="card-back"></div>';
  },
  
  showCardDetail(id) {
    const card = Cards.getById(id);
    if (!card) return;
    
    const paths = card.tp.map(t => 
      `<span class="path-badge" style="background:${Cards.getCategoryColor(t)}">${t}</span>`
    ).join('');
    
    const content = `
      <div class="card-modal-content">
        <div class="card-modal-header">
          <h3>${card.n}</h3>
          <button class="card-modal-close">×</button>
        </div>
        ${this.cardHTML(card, 'large')}
        <div><strong>Transform Paths:</strong></div>
        <div class="transform-paths">${paths}</div>
        <div><strong>Ability:</strong> ${card.a}</div>
        <div><em>"${card.f}"</em></div>
      </div>
    `;
    this.modal(content);
  },
  
  rippleEffect(e) {
    const btn = e.target.closest('button');
    if (!btn) return;
    
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = e.clientX - rect.left - size/2 + 'px';
    ripple.style.top = e.clientY - rect.top - size/2 + 'px';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  },
  
  debounce(fn, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }
};

window.$ = UI.$;
window.rippleEffect = UI.rippleEffect.bind(UI);
