type Team = { id: string };

type MatchStatus = "active" | "finish";
type Match = {
  id: string;
  local: Team;
  localScore: number;
  visitor: Team;
  visitorScore: number;
  startTime: Date;
  status: MatchStatus;
};

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
    const match = {
      id: `${localTeam.id}-${visitorTeam.id}`,
      local: localTeam,
      localScore: 0,
      visitor: visitorTeam,
      visitorScore: 0,
      startTime: new Date(),
      status: "active" as MatchStatus,
    };
    this.matches.push(match);
    return match
  };

  public getMatch = (matchId: string) => {
    const match = this.matches.filter((match) => match.id === matchId);
    return match[0];
  };

  public getLiveScoreboard = () =>
    this.matches.filter((match) => match.status === "active");

  public getName = () => this.name;
}
