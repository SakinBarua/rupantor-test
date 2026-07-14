// Rule Validation Engine
const Validation = {
  validatePlay(card, worldState, hand) {
    const errors = [];
    
    if (!card) {
      errors.push('No card selected');
      return { valid: false, errors };
    }
    
    if (!worldState) {
      errors.push('No world state');
      return { valid: false, errors };
    }
    
    if (card.isReact) {
      errors.push('Reaction cards cannot be played on your turn');
      return { valid: false, errors };
    }
    
    if (hand.length > MAX_HAND) {
      errors.push('Hand limit exceeded');
      return { valid: false, errors };
    }
    
    if (!Engine.canPlay(card, worldState)) {
      errors.push(`Cannot play ${card.c} on current world state`);
      return { valid: false, errors };
    }
    
    return { valid: true, errors: [] };
  },
  
  validateChain(chain, worldState) {
    if (chain.length === 0) return { valid: false, errors: ['Empty chain'] };
    if (chain.length > 5) return { valid: false, errors: ['Chain too long (max 5)'] };
    
    let current = worldState;
    for (const card of chain) {
      if (!Engine.canPlay(card, current)) {
        return { valid: false, errors: [`Card ${card.n} cannot follow current state`] };
      }
      current = card;
    }
    
    return { valid: true, errors: [] };
  },
  
  isPureChain(chain) {
    if (chain.length < 2) return false;
    const firstCat = chain[0].c;
    return chain.every(c => c.c === firstCat);
  },
  
  checkMission(mission, gameState) {
    switch (mission.t) {
      case 'reach':
        return gameState.worldState?.id === mission.target;
      case 'chain':
        return gameState.lastChainLength >= mission.val;
      case 'pureChain':
        return gameState.lastChainLength >= mission.val && gameState.lastChainPure;
      case 'playCat':
        return (gameState.playedCats[mission.cat] || 0) >= mission.val;
      case 'playCard':
        return gameState.playedCards.includes(mission.target);
      case 'reachScore':
        return gameState.score >= mission.val;
      default:
        return false;
    }
  }
};
