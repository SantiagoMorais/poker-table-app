export class ActionNotPermittedError extends Error {
  constructor(message: string = "Action not permitted") {
    super(message);
    this.name = "ActionNotPermittedError"
  }
}
