export class TeamError extends Error {
  id: string;
  standard = "https://www.iso.org/obp/ui/#search";

  constructor(id: string) {
    super(
      `team with id ${id} can not be created. Id must follow ISO 3166-1 alfa-3 standard`,
    );
    this.id = id;
  }
}

export class Team {
  private id: string;

  constructor(id: string) {
    if (this.hasISO3166Format(id) === false) throw new TeamError(id);
    this.id = id.toUpperCase();
  }

  /**
   * check if input has ISO 3166-1 alfa-3 standard
   * @see https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3
   */
  private hasISO3166Format = (input: string) =>
    input.length === 3 && input.match(/[a-z]/i) !== null;

  public getId = () => this.id;
}
