export class TableFullError extends Error {
  constructor(tableSize: number) {
    super(`The table already has the maximum number of players (${tableSize})`);
    this.name = "TableFullError";
  }
}
