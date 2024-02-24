import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Match } from "./Match";

void describe(`Match`, () => {
  it(`should throw an error when trying to create a match with the same team id as local and visitor`, () => {
    const local = { id: "CRC" };
    const visitor = { id: "CRC" };
    
    assert.throws(() => new Match(local, visitor), Error)
  });
});
