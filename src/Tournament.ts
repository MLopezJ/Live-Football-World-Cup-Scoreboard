import { Match } from "./Match";
import type { Team } from "./Team";

export type liveScoreboard = { matchId: string; result: string };

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
   * Add a match to list of matches if:
   *  - Teams are register in teams list
   *  - Teams have not active matches
   *  - Teams follow Match class constraints
   *
   * Please check Match class to check class constraints
   */
  public addMatch = (localTeam: Team, visitorTeam: Team): this => {
    // check teams are register in teams list
    const teamNotRegister = (team: string, id: string) =>
      `${team} team is not register in the tournament teams list. Team id: ${id}`;

    if (this.getTeam(localTeam.getId()) === undefined) {
      console.error(new Error(teamNotRegister("Local", localTeam.getId())));
      return this;
    }

    if (this.getTeam(visitorTeam.getId()) === undefined) {
      console.error(new Error(teamNotRegister("Visitor", visitorTeam.getId())));
      return this;
    }

    // check teams have not active matches
    const activeMatch = (team: string, id: string) =>
      `${team} team has an active game in this moment in the tournament. Team id: ${id}`;

    if (
      this.matches.some(
        (match) =>
          match.getLocal().getId() === localTeam.getId() ||
          match.getVisitor().getId() === localTeam.getId(),
      ) === true
    ) {
      console.error(new Error(activeMatch("Local", localTeam.getId())));
      return this;
    }

    if (
      this.matches.some(
        (match) =>
          match.getLocal().getId() === visitorTeam.getId() ||
          match.getVisitor().getId() === visitorTeam.getId(),
      ) === true
    ) {
      console.error(new Error(activeMatch("Visitor", visitorTeam.getId())));
      return this;
    }

    try {
      const match = new Match(localTeam, visitorTeam);
      this.matches.push(match);
      return this;
    } catch (error) {
      console.log(error);
      return this;
    }
  };

  /**
   * TODO: finish match following getMatch example with params
   */
  public finishMatch = (matchId: string): Match | undefined => {
    const match = this.matches.find((match) => match.getId() === matchId); // TODO: use getMatch
    if (match !== undefined) {
      return match.finishMatch();
    }
    console.log(`Match with id ${matchId} not found`);
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
   * Find match by id in list of matches
   */
  public getTeam = (teamId: string): Team | undefined =>
    this.teams.find((team) => team.getId() === teamId);

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

  public getName = () => this.name;
}
