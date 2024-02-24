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
    ] as [string][]) {
      void it(`should not create a team if id doesnt follow ISO 3166-1 alfa-3 standard. Token: ${token}`, () => {
        assert.throws(() => new Team("CRC"), Error);
      });
    }
  });
});
