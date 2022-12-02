#! nodemon

const path = require("path");
const fs = require("fs");

const file = fs.readFileSync(
  path.resolve(__dirname, "./data/day2.txt"),
  "utf8"
);

/// Question 1
const rules = {
  o: {
    A: "Rock",
    B: "Paper",
    C: "Scissors",
  },
  u: {
    X: "Rock",
    Y: "Paper",
    Z: "Scissors",
  },
  beats: {
    Paper: "Rock",
    Rock: "Scissors",
    Scissors: "Paper",
  },
  beatBy: {
    Paper: "Scissors",
    Rock: "Paper",
    Scissors: "Rock",
  },
  needTo: {
    X: "lose",
    Y: "draw",
    Z: "win",
  },
  resultPoints: {
    lose: 0,
    draw: 3,
    win: 6,
  },
  handPoints: {
    Rock: 1,
    Paper: 2,
    Scissors: 3,
  },
};
const rounds = file.split("\r\n").filter((r) => r.length > 0);
const one = [...rounds]
  .map((round) => {
    const flop = {
      opponent: rules.o[round.split(" ")[0]],
      user: rules.u[round.split(" ")[1]],
    };

    const isDraw = flop.opponent === flop.user;
    const isWin = rules.beats[flop.user] === flop.opponent;
    const isLose = rules.beats[flop.opponent] === flop.user;
    let points = isDraw
      ? rules.resultPoints.draw
      : isWin
      ? rules.resultPoints.win
      : rules.resultPoints.lose;
    points += rules.handPoints[flop.user];

    return {
      isDraw,
      isWin,
      isLose,
      points,
    };
  })
  .reduce(
    (acc, cur, index, arr) => {
      acc.totalPoints += cur.points;

      if (cur.isWin) {
        acc.wins++;
      } else if (cur.isLose) {
        acc.loses++;
      } else {
        acc.draws++;
      }

      return acc;
    },
    { wins: 0, draws: 0, loses: 0, totalPoints: 0 }
  );
console.info("one", one.totalPoints);

/// Question 2
const two = [...rounds]
  .filter((r) => r.length > 0)
  .map((round) => {
    const flop = {
      opponent: rules.o[round.split(" ")[0]],
      user: rules.needTo[round.split(" ")[1]],
    };

    let playToPass;
    if (flop.user === "win") {
      playToPass = rules.beatBy[flop.opponent];
    } else if (flop.user === "lose") {
      playToPass = rules.beats[flop.opponent];
    } else {
      playToPass = flop.opponent;
    }

    let points = rules.handPoints[playToPass];
    points += rules.resultPoints[flop.user];

    return {
      result: flop.user,
      hand: playToPass,
      opponent: flop.opponent,
      points,
    };
  })
  .reduce(
    (acc, cur, index, arr) => {
      acc.totalPoints += cur.points;

      if (cur.result === "win") {
        acc.wins++;
      } else if (cur.result === "lose") {
        acc.loses++;
      } else {
        acc.draws++;
      }

      return acc;
    },
    { wins: 0, draws: 0, loses: 0, totalPoints: 0 }
  );
console.info("two", two.totalPoints);
