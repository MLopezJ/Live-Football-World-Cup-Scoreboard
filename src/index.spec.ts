import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Tournament } from "./index";
import { type liveScoreboard } from "./classes/Tournament";
import type { Match } from "./classes/Match";

void describe(`start a new match`, () => {
  it(`should start a new match with score 0 for the local team and 0 for the visitor team`, async () => {
    // create tournament
    const worldCup = new Tournament("Fifa World Cup 2024");

    // create teams
    const local = worldCup.createTeam("CRC");
    const visitor = worldCup.createTeam("NOR");

    // add teams to the tournament
    worldCup.addTeam(local).addTeam(visitor);

    // create a match
    worldCup.addMatch(local, visitor);
    const match = worldCup.getMatch(local, visitor);

    // check id of the match
    assert.equal(match?.getId(), `${local.getId()}-${visitor.getId()}`); // expected:  "CRC-NOR"

    // check score
    const score = match.getScore();
    assert.equal(score.local, 0);
    assert.equal(score.visitor, 0);
  });

  it(`should add the new match to the live scoreboard`, async () => {
    // create tournament
    const worldCup = new Tournament("Fifa World Cup 2024");

    // create teams
    const local = worldCup.createTeam("CRC");
    const visitor = worldCup.createTeam("NOR");

    // add teams to the tournament
    worldCup.addTeam(local).addTeam(visitor);

    // create a match
    worldCup.addMatch(local, visitor);
    const match = worldCup.getMatch(local, visitor);

    const isMatchInLiveScoreboard = worldCup.liveScoreboard.some(
      (liveMatch) => liveMatch.matchId === match?.getId(),
    );

    assert.equal(isMatchInLiveScoreboard, true);
  });
});

void describe(`update score`, () => {
  it(`should update score of an existing match`, () => {
    // create tournament
    const worldCup = new Tournament("Fifa World Cup 2024");

    // create teams
    const local = worldCup.createTeam("CRC");
    const visitor = worldCup.createTeam("NOR");

    // add teams to the tournament
    worldCup.addTeam(local).addTeam(visitor);

    // create a match
    worldCup.addMatch(local, visitor);
    const match = worldCup.getMatch(local, visitor);

    // check initial score
    assert.equal(match?.getScore().local, 0);
    assert.equal(match.getScore().visitor, 0);

    // goal of local (CRC)
    match.setGoal(1, 0);

    // check updated score
    assert.equal(match.getScore().local, 1);
    assert.equal(match.getScore().visitor, 0);

    // goal of visitor (NOR)
    match.setGoal(0, 1);

    // check updated score
    assert.equal(match.getScore().local, 1);
    assert.equal(match.getScore().visitor, 1);
  });
});

void describe(`finish match`, () => {
  it(`should finish a match currently in progress`, () => {
    // create tournament
    const worldCup = new Tournament("Fifa World Cup 2024");

    // create teams
    const local = worldCup.createTeam("CRC");
    const visitor = worldCup.createTeam("NOR");

    // add teams to the tournament
    worldCup.addTeam(local).addTeam(visitor);

    // create the match
    worldCup.addMatch(local, visitor);

    // finish the match
    const finishedMatch = worldCup.finishMatch(local, visitor);
    assert.equal(finishedMatch?.getStatus(), "finish");
  });

  it(`should not display match in live scoreboard when match finished`, () => {
    // Check if match id is in list
    const isMatchInLiveScoreboard = (
      liveScoreboard: liveScoreboard[],
      matchId: string | undefined,
    ) => {
      if (matchId === undefined) return false;
      return liveScoreboard.some((liveMatch) => liveMatch.matchId === matchId);
    };

    // create tournament
    const worldCup = new Tournament("Fifa World Cup 2024");

    // create teams
    const local = worldCup.createTeam("CRC");
    const visitor = worldCup.createTeam("NOR");

    // add teams to the tournament
    worldCup.addTeam(local).addTeam(visitor);

    // create the match
    worldCup.addMatch(local, visitor);
    const match = worldCup.getMatch(local, visitor);

    // match should be in live scoreboard
    assert.equal(
      isMatchInLiveScoreboard(worldCup.liveScoreboard, match?.getId()),
      true,
    );

    // finish the match
    worldCup.finishMatch(local, visitor);

    // match should not be in live scoreboard
    assert.equal(
      isMatchInLiveScoreboard(worldCup.liveScoreboard, match?.getId()),
      false,
    );
  });
});

void describe(`Get a summary of matches in progress`, () => {
  it(`should return matches sorted in ascending order by match score`, () => {
    // create tournament
    const worldCup = new Tournament("Fifa World Cup 2024");

    // Create teams
    const crc = worldCup.createTeam("CRC"); // Costa Rica
    const nor = worldCup.createTeam("NOR"); // Norway
    const bra = worldCup.createTeam("BRA"); // Brazil
    const arg = worldCup.createTeam("ARG"); // Argentina
    const ita = worldCup.createTeam("ITA"); // Italy
    const esp = worldCup.createTeam("ESP"); // Spain

    // add teams to the tournament
    worldCup
      .addTeam(crc) // Costa Rica
      .addTeam(nor) // Norway
      .addTeam(bra) // Brazil
      .addTeam(arg) // Argentina
      .addTeam(ita) // Italy
      .addTeam(esp); // Spain

    // create the match           local - visitor
    worldCup
      .addMatch(crc, nor) // CRC vs NOR
      .addMatch(bra, arg) // BRA vs ARG
      .addMatch(ita, esp); // ITA vs ESP

    const BRAvsARG = worldCup.getMatch(bra, arg);

    // first element of the live scoreboard should not be the match BRAvsARG
    assert.notEqual(worldCup.liveScoreboard[0]?.matchId, BRAvsARG?.getId());

    // BRA 4 - 0 ARG
    BRAvsARG?.setGoal(4, 0);

    // first element of the live scoreboard should be the match BRAvsARG
    assert.equal(worldCup.liveScoreboard[0]?.matchId, BRAvsARG?.getId());
  });

  it(`should return matches ordered by the most recently started if score is the same`, () => {
    // create tournament
    const worldCup = new Tournament("Fifa World Cup 2024");

    // Create teams
    const crc = worldCup.createTeam("CRC"); // Costa Rica
    const nor = worldCup.createTeam("NOR"); // Norway
    const bra = worldCup.createTeam("BRA"); // Brazil
    const arg = worldCup.createTeam("ARG"); // Argentina
    const ita = worldCup.createTeam("ITA"); // Italy
    const esp = worldCup.createTeam("ESP"); // Spain

    // add teams to the tournament
    worldCup
      .addTeam(crc) // Costa Rica
      .addTeam(nor) // Norway
      .addTeam(bra) // Brazil
      .addTeam(arg) // Argentina
      .addTeam(ita) // Italy
      .addTeam(esp); // Spain

    // create the match    local - visitor
    worldCup
      .addMatch(crc, nor) // CRC vs NOR
      .addMatch(bra, arg) // BRA vs ARG
      .addMatch(ita, esp); // ITA vs ESP

    // first element of the live scoreboard should be ITA-ESP
    assert.equal(worldCup.liveScoreboard[0]?.matchId, "ITA-ESP");
  });
});
