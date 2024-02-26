import { Match } from "./Match";
import type { Team } from "./Team";

export type liveScoreboard = { matchId: string; result: string };

export class TournamentError extends Error {
  teams: Team[];
  team: Team;
  matches: Match[];

  constructor({
    teams,
    team,
    matches,
    message,
  }: {
    teams: Team[];
    team: Team;
    matches: Match[];
    message: string;
  }) {
    super(message);
    this.teams = teams;
    this.team = team;
    this.matches = matches;
  }
}

export class Tournament {
  private name: string;
  private teams: Team[] = [];
  private matches: Match[] = [];

  constructor(name: string) {
    this.name = name;
  }

  public getName = () => this.name;

  public addTeam = (team: Team): this => {
    this.teams.push(team);
    return this;
  };

  /**
   * Find match by id in list of matches
   */
  public getTeam = (teamId: string): Team | undefined =>
    this.teams.find((team) => team.getId() === teamId);

  /**
   * Add a match to list of matches if:
   *  - Teams are register in teams list
   *  - Teams have not active matches
   *  - Teams follow Match class constraints
   *
   * Please check Match class to check class constraints
   */
  public addMatch = (localTeam: Team, visitorTeam: Team): this => {
    // check local team is register in tournament's teams list
    if (this.getTeam(localTeam.getId()) === undefined) {
      throw new TournamentError({
        team: localTeam,
        teams: this.teams,
        matches: this.matches,
        message: "team is not register in the tournament's teams list.",
      });
    }

    // check visitor team is register in tournament's teams list
    if (this.getTeam(visitorTeam.getId()) === undefined) {
      throw new TournamentError({
        team: visitorTeam,
        teams: this.teams,
        matches: this.matches,
        message: "team is not register in the tournament's teams list.",
      });
    }

    // check local team has not active matches
    if (
      this.matches.some(
        (match) =>
          match.getLocal().getId() === localTeam.getId() ||
          match.getVisitor().getId() === localTeam.getId(),
      ) === true
    ) {
      throw new TournamentError({
        team: localTeam,
        teams: this.teams,
        matches: this.matches,
        message: "team has an active game in this moment in the tournament",
      });
    }

    // check visitor team has not active matches
    if (
      this.matches.some(
        (match) =>
          match.getLocal().getId() === visitorTeam.getId() ||
          match.getVisitor().getId() === visitorTeam.getId(),
      ) === true
    ) {
      throw new TournamentError({
        team: visitorTeam,
        teams: this.teams,
        matches: this.matches,
        message: "team has an active game in this moment in the tournament",
      });
    }

    // create match
    const match = new Match(localTeam, visitorTeam);
    this.matches.push(match);
    return this;
  };

  /**
   * Finish a match
   */
  public finishMatch = (local: Team, visitor: Team): Match | undefined => {
    const match = this.getMatch(local, visitor);
    if (match !== undefined) {
      return match.finishMatch();
    }
    console.log(`Match ${local.getId()} vs ${visitor.getId()} not found`);
    return undefined;
  };

  /**
   * Find match by id in list of matches
   */
  public getMatch = (local: Team, visitor: Team): Match | undefined =>
    this.matches.find(
      (match) =>
        match.getId() === match.createId(local.getId(), visitor.getId()),
    );

  /**
   * return matches following the next rules:
   * - return the matches that are being played
   * - return the matches sorted in ascending order by match score
   * - return matches ordered by the most recently started if score is the same
   */
  public getLiveScoreboard = (): liveScoreboard[] =>
    this.matches
      .filter((match) => match.getStatus() === "active")
      .sort(
        (match1, match2) =>
          match1.getTotalAmountOfGoals() - match2.getTotalAmountOfGoals(),
      )
      .reverse()
      .map((match) => ({ matchId: match.getId(), result: match.printScore() }));
}
