export function randomChoice(choices) {
    let index = Math.floor(Math.random() * choices.length);
    return choices[index];
  }
  