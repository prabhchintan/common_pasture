export const outcomes = {
    userCooperatesAIDefects: 'You grazed at your own farm but your neighbor grazed their sheep at the common pasture!',
    userDefectsAICooperates: 'You grazed your sheep at the common pasture while your neighbor grazed at their own farm!',
    bothCooperate: 'Both you and your neighbor grazed your sheep at your own farms!',
    bothDefect: 'Both you and your neighbor grazed your sheep at the common pasture!',
};

export function getAIChoice() {
    const choices = ['graze at farm', 'graze at pasture'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

export function getRoundOutcome(userChoice, aiChoice) {
    if (userChoice === 'graze at farm' && aiChoice === 'graze at farm') {
        return outcomes.bothCooperate;
    } else if (userChoice === 'graze at farm' && aiChoice === 'graze at pasture') {
        return outcomes.userCooperatesAIDefects;
    } else if (userChoice === 'graze at pasture' && aiChoice === 'graze at farm') {
        return outcomes.userDefectsAICooperates;
    } else {
        return outcomes.bothDefect;
    }
}

export function getScore(myChoice, theirChoice) {
    let userScore, aiScore;

    if (myChoice === 'graze at farm' && theirChoice === 'graze at farm') {
        userScore = 10;
        aiScore = 10;
    } else if (myChoice === 'graze at farm' && theirChoice === 'graze at pasture') {
        userScore = -1;
        aiScore = 11;
    } else if (myChoice === 'graze at pasture' && theirChoice === 'graze at farm') {
        userScore = 11;
        aiScore = -1;
    } else {
        userScore = 0;
        aiScore = 0;
    }

    return { userScore, aiScore };
}
