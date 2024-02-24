# Live Football World Cup Scoreboard

![Unit Tests](https://github.com/MLopezJ/Live-Football-World-Cup-Scoreboard/actions/workflows/test.yaml/badge.svg)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

A Live Football World Cup Scoreboard library that shows all the ongoing matches and their scores.

## Installation

```
npm ci
```

## Running tests

```
npm test
```

## Operations supported

| Operation                            | About                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Start a new match                    | When initing a new match, the initial score is 0 for the local team and 0 for the visitor team. When created, the new match is visible in the scoreboard.                                                                                                                                                                                                                   |
| Update score                         | It is possible to update the score of the match. Value to update the score must be a whole number.                                                                                                                                                                                                                                                                          |
| Finish match currently in progress   | It is possible to finish a match that is currently in progress. By this action, the match is removed from the scoreboard.                                                                                                                                                                                                                                                   |
| Get a summary of matches in progress | It is possible to get a summary of the matches that are in progress. The information is orderer by total score, presenting first the match with more goals. If matches have same amount of goals, the most recently started is returned first. This operation can be implementing any time as far as there is a scoreboard. Only matches that are in progress are returned. |

# Example of usage

```TypeScript
// create tournament
const worldCup = new Tournament("Fifa World Cup 2024");

// add teams to the tournament
const crc = worldCup.addTeam(new Team("CRC")); // Costa Rica
const nor = worldCup.addTeam(new Team("NOR")); // Norway

// create match                                local - visitor
const CRCvsNOR = worldCup.addMatch(crc, nor); // CRC vs NOR
// print live scoreboard
console.log(worldCup.getLiveScoreboard()) // [CRC 0 - 0 NOR]

// Goal: CRC 1 - 0 NOR
CRCvsNOR?.setGoal(1, 0);
// print live scoreboard
console.log(worldCup.getLiveScoreboard()) // [CRC 1 - 0 NOR]

// Goal: CRC 1 - 1 NOR
CRCvsNOR?.setGoal(1, 1);
// print live scoreboard
console.log(worldCup.getLiveScoreboard()) // [CRC 1 - 1 NOR]

// finish the match
const finishedMatch = worldCup.finishMatch(`CRC-NOR`)
// print live scoreboard
console.log(worldCup.getLiveScoreboard()) // []

```

See [./src/example.ts](./src/example.ts) for an example with more teams

# UML class diagram

![UML class diagram](./img/UML-class-diagram.png)

# Application decision records

See [./appdrs](./appdr/README.md)

# Architecture decision records

See [./adr](./adr/README.md)
