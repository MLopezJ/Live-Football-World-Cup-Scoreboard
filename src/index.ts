import { Match, type Team } from "./Match";

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

  public addMatch = (localTeam: Team, visitorTeam: Team): Match => {
    const match = new Match(localTeam, visitorTeam);

    this.matches.push(match);
    return match;
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

  public getLiveScoreboard = () =>
    this.matches.filter((match) => match.getStatus() === "active");

  public getName = () => this.name;
}
