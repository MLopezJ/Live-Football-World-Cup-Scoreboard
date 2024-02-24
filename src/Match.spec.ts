import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Match } from "./Match";

void describe(`Match`, () => {
  it(`should throw an error when trying to create a match with the same team id as local and visitor`, () => {
    const local = { id: "CRC" };
    const visitor = { id: "CRC" };

    assert.throws(() => new Match(local, visitor), Error);
  });

  for (const [token] of [
    [-1],
    ["hei"],
    [3.14],
    [-0],
    ["??!!%%$$##"],
    [-2.6788],
  ] as [string][]) {
    /**
     * Whole numbers are a set of numbers including all natural numbers and 0. 
     * They are a part of real numbers that do not include fractions, decimals, or negative numbers. 
     * @see https://www.cuemath.com/numbers/whole-numbers/
     */
    void it(`goals must be whole numbers`, () => {
        const local = { id: "CRC" };
        const visitor = { id: "NOR" };
        
        const match = new Match(local, visitor)

        match.setGoal((token as unknown as number), (token as unknown as number))
        assert.equal(match.getTotalAmountOfGoals(),0)
    });
  }
});
