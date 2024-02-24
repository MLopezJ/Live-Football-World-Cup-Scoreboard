import { Match } from "./Match";
import type { Team } from "./Team";

export class Tournament {
  private name: string;
  private teams: Team[] = [];
  private matches: Match[] = [];

  constructor(name: string) {
    this.name = name;
  }

  public addTeam = (team: Team): Team => {
    this.teams.push(team);
    return team;
  };

  /**
   * Add a match to list of match
   *
   * Please check Match class to check class constraints
   */
  public addMatch = (localTeam: Team, visitorTeam: Team): Match | undefined => {
    try {
      const match = new Match(localTeam, visitorTeam);
      this.matches.push(match);
      return match;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  };

  public finishMatch = (matchId: string): Match | undefined => {
    const match = this.matches.find((match) => match.getId() === matchId);
    if (match !== undefined) {
      return match.finishMatch();
    }
    console.log(`Match with id ${matchId} not found`);
    return undefined;
  };

  public getMatch = (matchId: string) => {
    const match = this.matches.filter((match) => match.getId() === matchId);
    return match[0];
  };

  /**
   * return matches following the next rules:
   * - return the matches that are being played
   * - return the matches sorted in ascending order by match score
   * - return matches ordered by the most recently started if score is the same
   */
  public getLiveScoreboard = () =>
    this.matches
      .filter((match) => match.getStatus() === "active")
      .sort(
        (match1, match2) =>
          match1.getTotalAmountOfGoals() - match2.getTotalAmountOfGoals()
      )
      .reverse();

  public getName = () => this.name;
}
