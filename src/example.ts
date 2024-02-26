import { Tournament } from "./index";
import { printLiveScoreboard } from "./utils/printLiveScoreboard";

// create tournament
const worldCup = new Tournament("Fifa World Cup 2024");
console.log(`-- Tournament ${worldCup.name}  --\n`);

// Create teams:
const MEX = worldCup.createTeam("MEX"); // Mexico
const CAN = worldCup.createTeam("CAN"); // Canada
const ESP = worldCup.createTeam("ESP"); // Spain
const BRA = worldCup.createTeam("BRA"); // Brazil
const DEU = worldCup.createTeam("DEU"); // Germany
const FRA = worldCup.createTeam("FRA"); // France
const URY = worldCup.createTeam("URY"); // Uruguay
const ITA = worldCup.createTeam("ITA"); // Italy
const ARG = worldCup.createTeam("ARG"); // Argentina
const AUS = worldCup.createTeam("AUS"); // Australia

// Register teams in the tournament
worldCup
  .addTeam(MEX)
  .addTeam(CAN)
  .addTeam(ESP)
  .addTeam(BRA)
  .addTeam(DEU)
  .addTeam(FRA)
  .addTeam(URY)
  .addTeam(ITA)
  .addTeam(ARG)
  .addTeam(AUS);

// Matches:
console.log("-- starting matches   --\n");
worldCup
  .addMatch(MEX, CAN) // MEX vs CAN
  .addMatch(ESP, BRA) // ESP vs BRA
  .addMatch(DEU, FRA) // DEU vs FRA
  .addMatch(URY, ITA) // URY vs ITA
  .addMatch(ARG, AUS); // ARG vs AUS
printLiveScoreboard(worldCup.liveScoreboard);

// Update scores
worldCup.getMatch(MEX, CAN)?.setGoal(0, 5);
worldCup.getMatch(ESP, BRA)?.setGoal(10, 2);
worldCup.getMatch(DEU, FRA)?.setGoal(2, 2);
worldCup.getMatch(URY, ITA)?.setGoal(6, 6);
worldCup.getMatch(ARG, AUS)?.setGoal(3, 1);
console.log(
  "-- Scores are beign updated. Check src/example.ts to get more information --\n"
);
printLiveScoreboard(worldCup.liveScoreboard);

worldCup.finishMatch(URY, ITA); // end URY vs ITA game
console.log("-- Game URY vs ITA finished --\n");
printLiveScoreboard(worldCup.liveScoreboard);
