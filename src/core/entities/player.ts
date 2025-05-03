import { randomUUID } from "crypto";

export class Player {
  private _id: string;
  private _name: string;
  private _chips: number;
  private _isOwner: boolean;

  constructor(name: string, isOwner = false, chips = 500, id?: string) {
    this._id = id ?? randomUUID();
    this._name = name;
    this._chips = chips;
    this._isOwner = isOwner;
  }

  get id() {
    return this._id;
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
