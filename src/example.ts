import { Team } from "./Team";
import { Tournament, type liveScoreboard } from "./Tournament";

/**
 * Helper function to log the live scorerboard in the console
 */
const printLiveScoreboard = (liveScoreboard: liveScoreboard[]) => {
  console.log(`-- printing live scoreboard --`);
  liveScoreboard.map((scoreboard) => console.log(`     ${scoreboard.result}`));
  console.log(`\n`);
};

// create tournament
const worldCup = new Tournament("Fifa World Cup 2024");
console.log(`-- Tournament ${worldCup.getName()}  --\n`);

/**
 * Teams in the tournament:
 *  - Mexico
 *  - Canada
 *  - Spain
 *  - Brazil
 *  - Germany
 *  - France
 *  - Uruguay
 *  - Italy
 *  - Argentina
 *  - Australia
 */
const MEX = worldCup.addTeam(new Team("MEX"));
const CAN = worldCup.addTeam(new Team("CAN"));
const ESP = worldCup.addTeam(new Team("ESP"));
const BRA = worldCup.addTeam(new Team("BRA"));
const DEU = worldCup.addTeam(new Team("DEU"));
const FRA = worldCup.addTeam(new Team("FRA"));
const URY = worldCup.addTeam(new Team("URY"));
const ITA = worldCup.addTeam(new Team("ITA"));
const ARG = worldCup.addTeam(new Team("ARG"));
const AUS = worldCup.addTeam(new Team("AUS"));

console.log("-- starting matches   --\n");
/**
 * Matches:
 * - MEX vs CAN
 * - ESP vs BRA
 * - DEU vs FRA
 * - URY vs ITA
 * - ARG vs AUS
 */
worldCup
  .addMatch(MEX, CAN)
  .addMatch(ESP, BRA)
  .addMatch(DEU, FRA)
  .addMatch(URY, ITA)
  .addMatch(ARG, AUS);

printLiveScoreboard(worldCup.getLiveScoreboard());

// Update scores
worldCup.getMatch(MEX, CAN)?.setGoal(0, 5);
worldCup.getMatch(ESP, BRA)?.setGoal(10, 2);
worldCup.getMatch(DEU, FRA)?.setGoal(2, 2);
const URY_ITA = worldCup.getMatch(URY, ITA)?.setGoal(6, 6);
worldCup.getMatch(ARG, AUS)?.setGoal(3, 1);


console.log(
  "-- Scores are beign updated. Check src/example.ts to get more information --\n"
);

printLiveScoreboard(worldCup.getLiveScoreboard());

// end URY_ITA game
URY_ITA?.finishMatch();
console.log("-- Game ", URY_ITA?.getId(), " finished --\n");

printLiveScoreboard(worldCup.getLiveScoreboard());
