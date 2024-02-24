import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Tournament } from "./index";
import type { Match } from "./Match";

void describe(`start a new match`, () => {
  it(`should start a new match with score 0 for the local team and 0 for the visitor team`, async () => {
    // create tournament
    const worldCup = new Tournament("Fifa World Cup 2024");

    // add teams to the tournament
    const local = worldCup.addTeam({ id: "CRC" });
    const visitor = worldCup.addTeam({ id: "NOR" });

    // create a match
    const match = worldCup.addMatch(local, visitor);

    // check id of the match
    assert.equal(match?.getId(), `${local.id}-${visitor.id}`); // expected:  "CRC-NOR"

	// check score
    const score = match.getScore();
    assert.equal(score.local, 0);
    assert.equal(score.visitor, 0);
  });

  it(`should add the new match to the live scoreboard`, async () => {
    // create tournament
    const worldCup = new Tournament("Fifa World Cup 2024");

    // add teams to the tournament
    const local = worldCup.addTeam({ id: "CRC" });
    const visitor = worldCup.addTeam({ id: "NOR" });

    // create a match
    const match = worldCup.addMatch(local, visitor);

    const liveScoreboard = worldCup.getLiveScoreboard();

    const isMatchInLiveScoreboard = liveScoreboard.some(
      (liveMatch) => liveMatch.getId() === match.getId()
    );

    assert.equal(isMatchInLiveScoreboard, true);
  });
});

void describe(`update score`, () => {
  it(`should update score of an existing match`, () => {
    // create tournament
    const worldCup = new Tournament("Fifa World Cup 2024");

    // add teams to the tournament
    const local = worldCup.addTeam({ id: "CRC" });
    const visitor = worldCup.addTeam({ id: "NOR" });

    // create a match
    const match = worldCup.addMatch(local, visitor);

    // check initial score
    assert.equal(match.getScore().local, 0);
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

    // add teams to the tournament
    const local = worldCup.addTeam({ id: "CRC" });
    const visitor = worldCup.addTeam({ id: "NOR" });

    // create the match
    const match = worldCup.addMatch(local, visitor);

    // finish the match
    const finishedMatch = worldCup.finishMatch(`${local.id}-${visitor.id}`);

    // check finished match status
    if (finishedMatch !== undefined) {
      assert.equal(finishedMatch.getStatus(), "finish");
    } else {
      // if finishedMatch is undefined means that the match id is not found, and is not possible to finish it. Because of that, it should fail
      assert.equal(
        (finishedMatch as unknown as Match).getId(),
        `${local.id}-${visitor.id}`
      );
    }

    // check live scoreboard
    const liveScoreboard = worldCup.getLiveScoreboard();

    const isMatchInLiveScoreboard = liveScoreboard.some(
      (liveMatch) => liveMatch.getId() === match.getId()
    );

    assert.equal(isMatchInLiveScoreboard, false);
  });
});
