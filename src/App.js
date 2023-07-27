import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import SecondStep from "./SecondStep";
import "./App.css";

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'time to reflect!'];
const socraticConsiderations = [
  "is there a way to ensure you both get the maximum happiness?",
  "do you think there's a way for both you and your neighbor to be equally happy?",
  "would it make a difference if your neighbor knew about your choice beforehand?",
  "what if your neighbor always chooses to graze at the pasture, would your choices change?",
  "is it better to always be cautious and graze at your own farm?",
  "can you guess what your neighbor will choose based on their previous choices?",
  "if both you and your neighbor choose to graze at the pasture, who loses?",
  "what's the best strategy if you could communicate with your neighbor?",
  "is there any benefit in changing your choice frequently?",
  "what strategy would you follow if you were to play this game multiple times?",
  "do you think your strategy would work if your neighbor also knew about it?",
  "can you come up with a win-win situation for both you and your neighbor?",
  "how would the game change if there were more neighbors?",
  "would you change your strategy if you knew your neighbor was very competitive?",
  "can a selfish strategy lead to higher happiness?",
  "can you win this game without ever grazing at the pasture?",
  "what if your neighbor is kind and always lets you graze at the pasture?",
  "is it possible to always win in this game?",
  "can you predict the outcome of the game based on the first few rounds?",
  "is this game fair to both you and your neighbor?",
  "what if you had more than one sheep? Would it change your strategy?"
];

function getAIChoice() {
  return Math.random() < 0.5 ? "graze at farm" : "graze at pasture";
}

function getRoundOutcome(userChoice, aiChoice) {
  if (userChoice === aiChoice) {
    if (userChoice === "graze at farm") {
      return {userOutcome: "you chose to graze at your farm", aiOutcome: "your neighbor grazed at theirs"};
    } else {
      return {userOutcome: "you chose to graze at the pasture", aiOutcome: "your neighbor did, too"};
    }
  } else if (userChoice === "graze at farm") {
    return {userOutcome: "you chose to graze at your farm", aiOutcome: "your neighbor grazed at the pasture"};
  } else {
    return {userOutcome: "you chose to graze at the pasture", aiOutcome: "your neighbor grazed at their farm"};
  }
}

function getScore(userChoice, aiChoice) {
  if (userChoice === aiChoice) {
    return userChoice === "graze at farm" ? { userScore: 10, aiScore: 10 } : { userScore: 0, aiScore: 0 };
  } else if (userChoice === "graze at farm") {
    return { userScore: -1, aiScore: 11 };
  } else {
    return { userScore: 11, aiScore: -1 };
  }
}

function App() {
  const [step, setStep] = useState(1);
  const [userHappiness, setUserHappiness] = useState(0);
  const [aiHappiness, setAIHappiness] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [notification, setNotification] = useState('Oh, and by the way, both you and your neighbor have a good memory of what happened the day before.');
  const [consideration, setConsideration] = useState(socraticConsiderations[0]); 
  const [userChoice, setUserChoice] = useState(null);
  const [aiChoice, setAIChoice] = useState(null);

  useEffect(() => {
    if(rounds > 0) {
      const outcome = getRoundOutcome(userChoice, aiChoice);
      setNotification(`${days[rounds - 1]}'s memory: ${outcome.userOutcome} and ${outcome.aiOutcome}.`);
    }
  }, [rounds, userChoice, aiChoice]);

  const handleNextStep = () => {
    setStep(2);
  };

  const handleFarmGraze = () => {
    if (rounds < 7) { 
      handleUserChoice("graze at farm");
    }
  };

  const handlePastureGraze = () => {
    if (rounds < 7) { 
      handleUserChoice("graze at pasture");
    }
  };

  const handleUserChoice = (choice) => {
    setUserChoice(choice);
    const aiChoice = getAIChoice();
    setAIChoice(aiChoice);
    const { userScore, aiScore } = getScore(choice, aiChoice);

    setUserHappiness(userHappiness + userScore);
    setAIHappiness(aiHappiness + aiScore);
    setRounds(rounds + 1);
    setConsideration(socraticConsiderations[Math.floor(Math.random() * socraticConsiderations.length)]);
  };

  if (step === 2) {
    return <SecondStep onGoBack={() => setStep(1)} />;
  }

  return (
    <div className="App">
      <img src="https://img.freepik.com/premium-photo/pasture-on-a-horse-ranch-with-a-house-and-fence-old-farm-house-generative-ai_922357-2905.jpg?w=1480" alt="Pasture" className="pastureImage" />
      <h1>Welcome to the Common Pasture Game!</h1>
      Your happiness: {userHappiness} :: Your neighbor's happiness: {aiHappiness}
      <p className="storyline">
        
You and your neighbor are shepherds. You each have a flock of sheep to care for, and there's a common pasture where your sheep can graze. But remember, the grass in this pasture isn't unlimited. If overgrazed, it won't grow back and may go barren.
<p></p>
Every day, you face a decision: do you let your sheep graze at your own farm, or do you send them to the common pasture? Your neighbor faces the same dilemma. Your choices will directly impact not only your own flock but also your neighbor's. This creates a delicate balance that changes with each decision you make.
<p></p>
So, shepherd, with each sunrise comes a new decision. Will you keep your sheep at home, or will they join the others in the shared pasture? Choose wisely, for the well-being of your flock and the sustainability of the pasture depends on it.
      </p>
      <p className="dayAndConsideration"><strong>It's {days[rounds]}</strong>, {consideration}</p>
      {notification && <p style={{fontStyle: "italic"}}>{notification}</p>}
      {rounds < 7 ? (
        <>
          <Button variant="contained" color="primary" onClick={handleFarmGraze}>Graze at Farm</Button>
          <Button variant="contained" color="secondary" onClick={handlePastureGraze}>Graze at Pasture</Button>
        </>
      ) : (
        <>
          <Button variant="contained" color="default" onClick={() => window.location.reload()}>Start a New Week</Button>
          <Button variant="contained" color="default" onClick={handleNextStep}>Skip to next year</Button>
        </>
      )}
    </div>
  );
}

export default App;
