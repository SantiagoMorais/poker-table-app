export class PlayerAlreadyExistsError extends Error {
  constructor(message: string = "Player already exists") {
    super(message);
    this.name = "PlayerAlreadyExistsError";
  }
}
