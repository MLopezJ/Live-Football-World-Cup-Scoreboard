export class Team {
  private id: string;

  constructor(id: string) {
    this.id = id;
  }

  public getId = () => this.id;
}
