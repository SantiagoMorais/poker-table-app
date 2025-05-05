import { randomUUID } from "crypto";

export class Player {
  private _id: string;
  private _name: string;
  private _chips: number;
  private _isOwner: boolean;
  private _tableToken: string;

  constructor(
    name: string,
    isOwner: boolean = false,
    tableToken: string,
    chips = 500,
    id?: string
  ) {
    this._id = id ?? randomUUID();
    this._name = name;
    this._tableToken = tableToken;
    this._chips = chips;
    this._isOwner = isOwner;
  }

  get id() {
    return this._id;
  }

  get tableToken() {
    return this._tableToken;
  }

  get name() {
    return this._name;
  }

  get chips() {
    return this._chips;
  }

  set chips(value: number) {
    this._chips = value;
  }

  get isOwner() {
    return this._isOwner;
  }

  set isOwner(value: boolean) {
    this._isOwner = value;
  }
}
