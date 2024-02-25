import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Team } from "./Team";

void describe(`Team`, () => {
  void describe(`ISO 3166-1 alfa-3 standard`, () => {
    for (const [token] of [
      [-1],
      ["A"],
      ["AA"],
      ["AAAA"],
      [3.14],
      ["?!%"],
      ["??!!%%"],
      [-2.6788],
      ["###"],
      ["222"],
      ["ITALY"],
    ] as [string][]) {
      void it(`should not create a team if id doesnt follow ISO 3166-1 alfa-3 standard. Token: ${token}`, () => {
        assert.throws(() => new Team(token), Error);
      });
    }

    for (const [token] of [["CRC"], ["NOR"], ["BRA"], ["ITA"]] as [string][]) {
      void it(`should create a team when id follow ISO 3166-1 alfa-3 standard. Token: ${token}`, () => {
        const team = new Team(token);
        assert.equal(team.getId(), token);
      });
    }
  });
});
