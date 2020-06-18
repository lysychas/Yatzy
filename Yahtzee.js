window.onload = Yahtzee;

function Yahtzee() {
  //Global variables
  let rolls = 0;
  let dice = [
    { currentValue: document.getElementById("0"), hold: false },
    { currentValue: document.getElementById("1"), hold: false },
    { currentValue: document.getElementById("2"), hold: false },
    { currentValue: document.getElementById("3"), hold: false },
    { currentValue: document.getElementById("4"), hold: false },
  ];
  let upperSecAccumulator = 0;
  let totalScoreElement = document.getElementById("totalScore");

  const totalScore = (value) => {
    totalScoreElement.innerHTML = Number(totalScoreElement.innerHTML) + value;
  };

  //----------HOLD DICE----------
  // checks if checkbox is checked and updates value
  const checkHoldAndUpdate = () => {
    for (let i = 0; i < 5; i++) {
      dice[i].hold = document.getElementById("hold" + i).checked;
    }
  };
  // Applies hold check
  for (let i = 0; i < 5; i++) {
    document.getElementById("hold" + i).onclick = checkHoldAndUpdate;
  }

  //----------ROLL DICE----------
  const roll = () => {
    if (rolls < 3) {
      for (let i = 0; i < 5; i++) {
        if (dice[i].hold === false || rolls === 0) {
          dice[i].currentValue.innerHTML = Math.floor(Math.random() * 6) + 1;
        }
      }
      rolls++;
      document.getElementById("rollsLeft").innerHTML--;
    }
  };
  document.getElementById("roll").onclick = roll;

  //----------RESET ROLL DICE----------
  const rollReset = () => {
    rolls = 0;
    document.getElementById("rollsLeft").innerHTML = 3;
    for (let i = 0; i < 5; i++) {
      dice[i].currentValue.innerHTML = 0;
    }
  };

  //----------DISABLE SCOREBOARD ROW----------
  const disable = (name) => {
    document.getElementById(name).classList.add("strike");
    document.getElementById(name).classList.remove("cell");
    document.getElementById(name).onclick = undefined;
  };

  //----------UNCHECK HOLD----------
  const uncheckHold = () => {
    for (let i = 0; i < 5; i++) {
      dice[i].hold = document.getElementById("hold" + i).checked = false;
    }
  };

  //----------INPUT SCORE TO CELL----------
  const inputScoreToCell = (name, value) => {
    document.getElementById(name + "Score").innerHTML = value;
    rollReset();
    disable(name);
    totalScore(value);
    uncheckHold();
  };

  //----------SUM----------
  const sumDice = () => {
    let sum = 0;
    for (let i = 0; i < 5; i++) {
      sum += Number(dice[i].currentValue.innerHTML);
    }
    return sum;
  };

  //----------UPPER SECTION COUNT & SUM----------
  const upperSectionCount = (value) => {
    //Sums up dice containing argument value.
    let acc = 0;
    for (let i = 0; i < 5; i++) {
      if (Number(dice[i].currentValue.innerHTML) === value) {
        acc += value;
      }
    }
    return acc;
  };

  //----------UPPER SECTION SCORE----------
  const upperSectionScore = (name, value) => () => {
    if (rolls > 0) {
      let upperScore = upperSectionCount(value);
      upperSecAccumulator += upperScore;
      inputScoreToCell(name, upperScore);
    }
  };
  document.getElementById("fives").onclick = upperSectionScore("fives", 5);

  //----------X OF A KIND COUNT & SUM----------
  const kindCount = (value, kindVal) => {
    let numbersOfAKind = 0;
    for (let i = 0; i < 5; i++) {
      if (Number(dice[i].currentValue.innerHTML) === value) {
        numbersOfAKind += 1;
      }
    }
    if (numbersOfAKind >= kindVal) {
      return kindVal * value;
    } else {
      return undefined;
    }
  };

  //----------X OF A KIND SCORE----------
  const kindScore = (kindVal) => () => {
    let score = 0;
    for (let i = 1; i <= 6; i++) {
      score = kindCount(i, kindVal);
      if (score) {
        if (kindVal === 2) {
          inputScoreToCell("onePair", score);
        }
      }
    }
  };
  document.getElementById("onePair").onclick = kindScore(2);

  //----------CHANCE SCORE----------
  const chance = () => {
    if (rolls > 0) inputScoreToCell("chance", sumDice());
  };
  document.getElementById("chance").onclick = chance;

  // const newGame = () => {
  //   rolls = 0;
  //   for (
  //     let i = 0;
  //     i < document.getElementsByClassName("scoreCell").length;
  //     i++
  //   ) {
  //     document.getElementsByClassName("scoreCell")[i].innerHTML = "-";
  //   }

  //   // Reset the HTML dice to show 0's.
  //   for (let i = 0; i < dice[i].length; i++) {
  //     dice[i].currentValue.innerHTML = "0";
  //   }
  // uncheckHold()

  // document.getElementById("newGame").onclick = newGame;
}
