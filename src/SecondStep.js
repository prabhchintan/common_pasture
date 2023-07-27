import React, { useState, useRef } from "react";
import { Button, Slider } from "@material-ui/core";
import './SecondStep.css';

function valuetext(value) {
  return `${value}% tax rate`;
}

function SecondStep({ onGoBack }) {
  const [revenueState, setRevenueState] = useState(0);
  const [revenueFirstFarmer, setRevenueFirstFarmer] = useState(0);
  const [revenueSecondFarmer, setRevenueSecondFarmer] = useState(0);
  const [steps, setSteps] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [lastMonthAction, setLastMonthAction] = useState(null);
  const [lastMonthOutcome, setLastMonthOutcome] = useState([0, 0, 0]);
  const [farmer1Action, setFarmer1Action] = useState(null);
  const [farmer2Action, setFarmer2Action] = useState(null);
  const resetRef = useRef(0);

  const questions = [
    "how does your decision impact the state and its farmers?",
    "would the farmers make the same decision if they were in your place?",
    "how does your power influence the choices of the farmers?",
    "are the farmers better off due to your decisions?",
    "does your decision align with the best interest of the state?",
    "is the state's revenue justifiably earned?",
    "is there a balance between state's power and farmer's freedom?",
    "are the farmers adapting to your decision making?",
    "is there a way for farmers to better their situation without your intervention?",
    "how do your decisions align with the principles of spontaneous order?",
    "are you creating an order based on your perception or letting it form naturally?",
    "are you respecting the knowledge of the individual farmers?",
    "how has your governance shaped the state and its farmers over the year?",
    "it's time to reflect"
  ];

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'time to reflect'];

  const scoreMatrix = {
    "Do Nothing": {
      "Farm, Farm": [1000, 1000, 1000],
      "Farm, Pasture": [900, 2100, 500],
      "Pasture, Farm": [2100, 900, 500],
      "Pasture, Pasture": [500, 500, 0]
    },
    "Survey Pasture": {
      "Farm, Farm": [900, 900, 500],
      "Farm, Pasture": [1000, 1600, 500],
      "Pasture, Farm": [1600, 1000, 500],
      "Pasture, Pasture": [500, 500, 1500]
    },
    "Extract Resources": {
      "Farm, Farm": [500, 500, 2100],
      "Farm, Pasture": [500, 1000, 1000],
      "Pasture, Farm": [1000, 500, 1000],
      "Pasture, Pasture": [0, 0, 500]
    },
    "Collect Tax/Impose Fine": {
      "Farm, Farm": [500, 500, 1000],
      "Farm, Pasture": [700, 1000, 1000],
      "Pasture, Farm": [1000, 700, 1000],
      "Pasture, Pasture": [0, 0, 2100]
    }
  };

  const getFarmerAction = () => {
    return Math.random() < 0.5 ? "Farm" : "Pasture";
  };

  const reset = () => {
    setRevenueState(0);
    setRevenueFirstFarmer(0);
    setRevenueSecondFarmer(0);
    setSteps(0);
    setTaxRate(0);
    setLastMonthAction(null);
    setLastMonthOutcome([0, 0, 0]);
    setFarmer1Action(null);
    setFarmer2Action(null);
    resetRef.current++;
  };

  const handleStateAction = (action) => {
    if (steps >= 12) return;

    const farmer1Action = getFarmerAction();
    const farmer2Action = getFarmerAction();
    const [newRevenueFirstFarmer, newRevenueSecondFarmer, newRevenueState] = scoreMatrix[action][`${farmer1Action}, ${farmer2Action}`];

    setLastMonthAction(action);
    setLastMonthOutcome([newRevenueFirstFarmer, newRevenueSecondFarmer, newRevenueState]);
    setFarmer1Action(farmer1Action);
    setFarmer2Action(farmer2Action);

    if (action === 'Collect Tax/Impose Fine') {
      const tax = taxRate / 100;
      setRevenueFirstFarmer(revenueFirstFarmer + newRevenueFirstFarmer - newRevenueFirstFarmer * tax);
      setRevenueSecondFarmer(revenueSecondFarmer + newRevenueSecondFarmer - newRevenueSecondFarmer * tax);
      setRevenueState(revenueState + newRevenueState + newRevenueFirstFarmer * tax + newRevenueSecondFarmer * tax);
    } else {
      setRevenueState(revenueState + newRevenueState);
      setRevenueFirstFarmer(revenueFirstFarmer + newRevenueFirstFarmer);
      setRevenueSecondFarmer(revenueSecondFarmer + newRevenueSecondFarmer);
    }

    setSteps(steps + 1);
  };

  const getCurrentMonth = () => {
    if (steps < 12) return "It's " + months[steps];
    return "It's time to reflect";
  };

  const getLastMonthSummary = () => {
    if (steps === 0) {
      return "As last time, all players involved have memory of what happened last time.";
    } else {
      return `Last month, the state chose to ${lastMonthAction.toLowerCase()}, the first farmer chose to ${farmer1Action.toLowerCase()}, and the second farmer chose to ${farmer2Action.toLowerCase()}.`;
    }
  };

  return (
    <div className="SecondStep">
      <img src="https://www.agriculture.com/thmb/aGcDHUatTalmPKuQN6EczXg7Bwk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/103040744-2000-ffe538279fd7442c80bc249a3558cbf7.jpg" alt="Farm" className="farmImage" />
      <h1>Welcome to Seeing Like a State!</h1>
      <p className="revenue">
        State Revenue: ${revenueState.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} 
        :: First Farmer Revenue: ${revenueFirstFarmer.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} 
        :: Second Farmer Revenue: ${revenueSecondFarmer.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
      </p>
      <p className="storyline">
        Congratulations on your appointment as the governor of this pastoral land! The state has two farms under its jurisdiction. Each day the farmers must decide whether to graze their livestock on their own farm or in the shared pasture. As the governor, you have the power to influence this decision. Choose to do nothing, survey the pasture, extract resources, or collect taxes. Remember, each choice will impact both the farmers and the state. The fate of the state is in your hands.
      </p>
      <p className="month"><b>{getCurrentMonth()}</b>: {questions[steps].toLowerCase()}</p>
      <p className="lastAction">{getLastMonthSummary()}</p>
      {steps < 12 && (
        <>
          <Button variant="contained" color="default" onClick={() => handleStateAction('Do Nothing')}>Do Nothing</Button>
          <Button variant="contained" color="default" onClick={() => handleStateAction('Survey Pasture')}>Survey Pasture</Button>
          <Button variant="contained" color="default" onClick={() => handleStateAction('Extract Resources')}>Extract Resources</Button>
          <div className="tax-container">
            <Button variant="contained" color="default" onClick={() => handleStateAction('Collect Tax/Impose Fine')}>Collect Tax/Impose Fine</Button>
            <div className="slider-container">
            <Slider
              key={resetRef.current}
              className="slider"
              value={taxRate}
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={0}
              max={30}
              onChange={(event, newValue) => setTaxRate(newValue)}
            />
              <span className="slider-value">{taxRate}% tax rate</span>
            </div>
          </div>
        </>
      )}
      <Button variant="contained" color="default" onClick={reset} className="resetButton">Reset Seeing Like A State</Button>
      <Button variant="contained" color="default" onClick={onGoBack}>Go Back to Being a Farmer</Button>
    </div>
  );
}

export default SecondStep;
