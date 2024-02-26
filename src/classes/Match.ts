import type { Team } from "./Team";

type MatchStatus = "active" | "finish";

export class MatchError extends Error {
  local: Team;
  visitor: Team;

  constructor({ local, visitor }: { local: Team; visitor: Team }) {
    super(`id of local and visitor can not be the same.`);
    this.local = local;
    this.visitor = visitor;
  }
}

export class Match {
  private id: string;
  private local: Team;
  private localScore: number = 0;
  private visitor: Team;
  private visitorScore: number = 0;
  private status: MatchStatus = "active";

  /**
   * Rules for create a Match class:
   *    - teams ids must be different
   */
  constructor(local: Team, visitor: Team) {
    if (local.getId() === visitor.getId())
      throw new MatchError({ local, visitor });

    this.id = this.createId(local.getId(), visitor.getId());
    this.local = local;
    this.visitor = visitor;
  }

  public createId = (localId: string, visitorId: string) =>
    `${localId}-${visitorId}`;

  public getId = () => this.id;

  public getLocal = () => this.local;

  public getVisitor = () => this.visitor;

  public getStatus = () => this.status;

  private setStatus = (status: MatchStatus) => (this.status = status);

  public finishMatch = () => {
    this.setStatus("finish");
    return this;
  };

  public getScore = () => ({
    local: this.localScore,
    visitor: this.visitorScore,
  });

  public printScore = () =>
    `${this.local.getId()} ${this.localScore} - ${
      this.visitorScore
    } ${this.visitor.getId()} `;

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

    return this;
  };

  /**
   * Get the total amount of goals in the match
   */
  public getTotalAmountOfGoals = (): number =>
    this.localScore + this.visitorScore;
}
