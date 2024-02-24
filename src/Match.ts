export type Team = { id: string };
type MatchStatus = "active" | "finish";

export class Match {
  private id: string;
  private local: Team;
  private localScore: number = 0;
  private visitor: Team;
  private visitorScore: number = 0;
  private startTime: Date = new Date();
  private status: MatchStatus = "active";

  constructor(local: Team, visitor: Team) {
    this.id = `${local.id}-${visitor.id}`;
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

  public setGoal = (local: number, visitor: number) => {
    this.localScore += local;
    this.visitorScore += visitor;
    return this.getScore();
  };

  /**
   * Get the total amount of goals in the match
   */
  public getTotalAmountOfGoals = (): number => this.localScore + this.visitorScore

  private setStatus = (status: MatchStatus) => (this.status = status);

  public finishMatch = () => {
    this.setStatus("finish");
    return this;
  };
}
