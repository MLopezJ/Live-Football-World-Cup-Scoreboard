import type { Team } from "./Team";

type MatchStatus = "active" | "finish";

export class Match {
  private id: string;
  private local: Team;
  private localScore: number = 0;
  private visitor: Team;
  private visitorScore: number = 0;
  private startTime: Date = new Date();
  private status: MatchStatus = "active";

  /**
   * Rules for create a Match class:
   *    - teams ids must be different
   */
  constructor(local: Team, visitor: Team) {
    if (local.getId() === visitor.getId()) {
      throw Error("id of local and visitor can not be the same");
    }
    this.id = `${local.getId()}-${visitor.getId()}`;
    this.local = local;
    this.visitor = visitor;
  }

  public returnInfo = () => ({
    id: this.id,
    local: this.local,
    localScore: this.localScore,
    visitor: this.visitor,
    visitorScore: this.visitorScore,
    startTime: this.startTime,
    status: this.status,
  });

  public getId = () => this.id;

  public getStatus = () => this.status;

  public getScore = () => ({
    local: this.localScore,
    visitor: this.visitorScore,
  });

  /**
   * Whole numbers are a set of numbers including all natural numbers and 0.
   * They are a part of real numbers that do not include fractions, decimals, or negative numbers.
   * @see https://www.cuemath.com/numbers/whole-numbers/
   */
  private isWholeNumber = (input: any) =>
    isNaN(input) !== true && input >= 0 && Number.isInteger(input); //

  /**
   * Update score of local and visitor team
   */
  public setGoal = (local: number, visitor: number) => {
    if (this.isWholeNumber(local) && this.isWholeNumber(visitor)) {
      this.localScore += local;
      this.visitorScore += visitor;
    }

    return this.getScore();
  };

  /**
   * Get the total amount of goals in the match
   */
  public getTotalAmountOfGoals = (): number =>
    this.localScore + this.visitorScore;

  private setStatus = (status: MatchStatus) => (this.status = status);

  public finishMatch = () => {
    this.setStatus("finish");
    return this;
  };
}
