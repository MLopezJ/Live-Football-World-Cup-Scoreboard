import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Tournament } from "./index";

void describe(`start a new match`, () => {
  it(`should start a new match with score 0 for the local team and 0 for the visitor team`, async () => {
    // create tournament
    const worldCup = new Tournament("Fifa World Cup 2024");

    // add teams to the tournament
    const crc = worldCup.addTeam({ id: "CRC" });
    const nor = worldCup.addTeam({ id: "NOR" });

    // create a match
    worldCup.addMatch(crc, nor);

    const match = worldCup.getMatch(`${crc.id}-${nor.id}`);

    // check id of the match
    assert.equal(match?.id, "CRC-NOR");

    // check score
    assert.equal(match.localScore, 0);
    assert.equal(match.visitorScore, 0);
  });
});
