export class Team {
  private id: string;

  constructor(id: string) {
    if (this.hasISO3166Format(id) === false) {
      throw Error(`team with id ${id} can not be created. Id must follow ISO 3166-1 alfa-3 standard`);
    }
    this.id = id;
  }

  /**
   * check if input has ISO 3166-1 alfa-3 standard
   * @see https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3
   */
  private hasISO3166Format = (input: string) =>
    input.length === 3 && input.match(/[a-z]/i) !== null;

  public getId = () => this.id;
}
