import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Match } from "./Match";
import { Team } from "./Team";

void describe(`Match`, () => {
  it(`should throw an error when trying to create a match with the same team id as local and visitor`, () => {
    const local = new Team("CRC");
    const visitor = new Team("CRC");

    assert.throws(() => new Match(local, visitor), Error);
  });

  void describe(`Increase score`, () => {
    for (const [token] of [
      [-1],
      ["hei"],
      [3.14],
      ["??!!%%$$##"],
      [-2.6788],
      ["2"],
    ] as [string][]) {
      void it(`should not increase the score if any of the goals is not whole numbers: token ${token}`, () => {
        const local = new Team("CRC");
        const visitor = new Team("NOR");

        const match = new Match(local, visitor);

        match.setGoal(token as unknown as number, 7);
        assert.equal(match.getTotalAmountOfGoals(), 0);
      });
    }

    for (const [goal] of [[1], [100], [3], [10], [0]] as [number][]) {
      void it(`should increase the score when the goals are whole numbers: goal ${goal}`, () => {
        const local = new Team("CRC");
        const visitor = new Team("NOR");

        const match = new Match(local, visitor);

        match.setGoal(goal, 0);
        assert.equal(match.getTotalAmountOfGoals(), goal);
      });
    }
  });
});
