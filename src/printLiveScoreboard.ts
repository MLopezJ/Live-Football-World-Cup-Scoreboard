import { type liveScoreboard } from "./Tournament";

/**
 * Helper function to log the live scorerboard in the console
 */
export const printLiveScoreboard = (liveScoreboard: liveScoreboard[]) => {
    console.log(`-- printing live scoreboard --`);
    liveScoreboard.map((scoreboard) => console.log(`     ${scoreboard.result}`));
    console.log(`\n`);
  };