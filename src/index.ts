import { Team } from "./classes/Team";
import { Tournament as TournamentClass } from "./classes/Tournament";

/**
 * Interface of Live Football World Cup Scoreboard lib
 */
export class Tournament {
  private tournament: TournamentClass;

  constructor(name: string) {
    this.tournament = new TournamentClass(name);
  }

  /**
   * Get name of Tournament
   */
  public get name() {
    return this.tournament.getName();
  }

  /**
   * Create an object of Team class.
   * Note that this method DOES NOT add team to the Tournament class
   */
  public createTeam = (id: string) => {
    const team = new Team(id);
    return team;
  };

  /**
   * Add team to Tournament
   */
  public addTeam = (team: Team) => this.tournament.addTeam(team);

  /**
   * Add Match to Tournament
   */
  public addMatch = (local: Team, visitor: Team) =>
    this.tournament.addMatch(local, visitor);

  /**
   * Get Match from Tournament
   */
  public getMatch = (local: Team, visitor: Team) =>
    this.tournament.getMatch(local, visitor);

  /**
   * Finish Match from Tournament
   */
  public finishMatch = (local: Team, visitor: Team) =>
    this.tournament.finishMatch(local, visitor);

  /**
   * Get live matches from Tournament
   */
  public get liveScoreboard() {
    return this.tournament.getLiveScoreboard();
  }
}

export { MatchError } from "./classes/Match";
export { TeamError } from "./classes/Team";
export { TournamentError } from "./classes/Tournament";
