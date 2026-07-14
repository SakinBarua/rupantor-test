// Tutorial System
const Tutorial = {
  steps: [
    {
      id: 1,
      title: 'Welcome to RUPANTOR',
      titleBn: 'রূপান্তরে স্বাগতম',
      content: 'RUPANTOR is a transformation-based card game. Your goal is to transform the World State by playing cards whose category matches the current transformation paths.',
      contentBn: 'রূপান্তর একটি ট্রান্সফর্মেশন-ভিত্তিক কার্ড গেম। আপনার লক্ষ্য হলো কার্ড খেলে বিশ্ব অবস্থা রূপান্তর করা।',
      tip: 'Remember: This is NOT a matching game - it\'s about logical transformation!',
      tipBn: 'মনে রাখবেন: এটি ম্যাচিং গেম নয় - এটি যৌক্তিক রূপান্তর!'
    },
    {
      id: 2,
      title: 'The World State',
      titleBn: 'বিশ্ব অবস্থা',
      content: 'The center card shows the current World State. Each World State has "transform paths" (tp) that show which categories can transform it.',
      contentBn: 'কেন্দ্রের কার্ডটি বর্তমান বিশ্ব অবস্থা দেখায়। প্রতিটি বিশ্ব অবস্থার "ট্রান্সফর্ম পাথ" (tp) থাকে।',
      tip: 'Look at the transform paths before planning your move!',
      tipBn: 'চাল পরিকল্পনার আগে ট্রান্সফর্ম পাথ দেখুন!'
    },
    {
      id: 3,
      title: 'Playing Cards',
      titleBn: 'কার্ড খেলা',
      content: 'Play a card from your hand if its CATEGORY matches one of the World State\'s transform paths. The played card becomes the new World State.',
      contentBn: 'আপনার হাত থেকে কার্ড খেলুন যদি এর ক্যাটাগরি বিশ্ব অবস্থার ট্রান্সফর্ম পাথের সাথে মেলে।',
      tip: 'Example: If World State has tp:[Plants, Water], you can play a Plants or Water card.',
      tipBn: 'উদাহরণ: যদি বিশ্ব অবস্থার tp:[Plants, Water] থাকে, আপনি Plants বা Water কার্ড খেলতে পারেন।'
    },
    {
      id: 4,
      title: 'Building Chains',
      titleBn: 'চেইন তৈরি',
      content: 'You can play multiple cards in one turn to form a chain. Each card must be playable on the previous card\'s transform paths. Max chain length is 5.',
      contentBn: 'এক টার্নে একাধিক কার্ড খেলে চেইন তৈরি করতে পারেন। সর্বোচ্চ চেইন দৈর্ঘ্য ৫।',
      tip: 'Longer chains = more points! 3-chain=3pts, 4-chain=6pts, 5-chain=10pts',
      tipBn: 'দীর্ঘ চেইন = বেশি পয়েন্ট! 3-চেইন=3প, 4-চেইন=6প, 5-চেইন=10প'
    },
    {
      id: 5,
      title: 'Pure Chain Bonus',
      titleBn: 'বিশুদ্ধ চেইন বোনাস',
      content: 'If all cards in your chain are the same category, you get a 2x bonus multiplier on your chain points!',
      contentBn: 'যদি সব কার্ড একই ক্যাটাগরির হয়, আপনি 2x বোনাস পাবেন!',
      tip: 'A pure 3-chain gives 6 points instead of 3!',
      tipBn: 'বিশুদ্ধ 3-চেইন 3-এর বদলে 6 পয়েন্ট দেয়!'
    },
    {
      id: 6,
      title: 'Missions & Scoring',
      titleBn: 'মিশন ও স্কোরিং',
      content: 'Complete secret missions for bonus points. First player to reach 30 points wins, or highest score when deck runs out.',
      contentBn: 'গোপন মিশন সম্পন্ন করে বোনাস পয়েন্ট পান। প্রথমে 30 পয়েন্টে পৌঁছালে জেতেন।',
      tip: 'Watch your mission progress in the mission bar!',
      tipBn: 'মিশন বারে অগ্রগতি দেখুন!'
    },
    {
      id: 7,
      title: 'Ready to Play!',
      titleBn: 'খেলতে প্রস্তুত!',
      content: 'You\'ve learned the basics. Now start playing and master the art of transformation!',
      contentBn: 'আপনি মূল বিষয়গুলো শিখেছেন। এখন খেলুন এবং রূপান্তরের কলা আয়ত্ত করুন!',
      tip: 'Good luck! Remember: Everything Transforms.',
      tipBn: 'শুভকামনা! মনে রাখবেন: সবকিছু পরিবর্তিত হয়।'
    }
  ],
  
  currentStep: 0,
  
  init() {
    const progress = Save.getTutorialProgress();
    this.currentStep = progress.step || 0;
    this.render();
  },
  
  render() {
    const container = document.getElementById('tutorialSteps');
    if (!container) return;
    
    const step = this.steps[this.currentStep];
    if (!step) return;
    
    container.innerHTML = `
      <div class="step-card active">
        <div class="step-header">
          <div class="step-number">${step.id}</div>
          <h3 class="step-title">${step.title}</h3>
          <span class="step-status">Step ${this.currentStep + 1} of ${this.steps.length}</span>
        </div>
        <div class="step-content">
          <p>${step.content}</p>
          <p class="bengali" style="color:var(--muted);margin-top:0.5rem;">${step.contentBn}</p>
        </div>
        <div class="step-tip">
          <strong>💡 Tip:</strong> ${step.tip}
        </div>
      </div>
    `;
    
    this.updateProgress();
    this.updateButtons();
  },
  
  updateProgress() {
    const fill = document.getElementById('progressFill');
    const text = document.getElementById('progressText');
    if (fill) fill.style.width = ((this.currentStep + 1) / this.steps.length * 100) + '%';
    if (text) text.textContent = `Step ${this.currentStep + 1} of ${this.steps.length}`;
  },
  
  updateButtons() {
    const prev = document.getElementById('btnPrev');
    const next = document.getElementById('btnNext');
    
    if (prev) prev.disabled = this.currentStep === 0;
    
    if (next) {
      if (this.currentStep >= this.steps.length - 1) {
        next.textContent = 'Start Playing';
        next.onclick = () => window.location.href = 'play.html';
      } else {
        next.textContent = 'Next';
        next.onclick = () => this.next();
      }
    }
  },
  
  next() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      Save.saveTutorialProgress(this.currentStep, false);
      this.render();
    }
  },
  
  prev() {
    if (this.currentStep > 0) {
      this.currentStep--;
      Save.saveTutorialProgress(this.currentStep, false);
      this.render();
    }
  },
  
  complete() {
    Save.saveTutorialProgress(this.steps.length - 1, true);
  }
};

document.addEventListener('DOMContentLoaded', () => Tutorial.init());
