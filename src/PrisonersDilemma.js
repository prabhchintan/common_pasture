export const outcomes = {
    USER: 'USER',
    AI: 'AI',
    TIE: 'TIE',
  };
  
  export const scores = {
    cooperate: {
      cooperate: 10,
      defect: -1,
    },
    defect: {
      cooperate: 11,
      defect: 0,
    },
  };
  
  export function getRoundOutcome(userChoice, aiChoice) {
    if (scores[userChoice][aiChoice] > scores[aiChoice][userChoice]) {
      return outcomes.USER;
    } else if (scores[userChoice][aiChoice] < scores[aiChoice][userChoice]) {
      return outcomes.AI;
    } else {
      return outcomes.TIE;
    }
  }
  
  export function getAIChoice() {
    const randomNum = Math.random();
    if (randomNum < 0.5) {
      return 'cooperate';
    } else {
      return 'defect';
    }
  }
  
  export function getScore(userChoice, aiChoice) {
    return scores[userChoice][aiChoice];
  }
  