import { randomUUID } from "crypto";

import { IPlayer } from "../interfaces/player";
import { ITableProps } from "../interfaces/table-props";

export class Table {
  private _id: string;
  private props: Required<ITableProps>;

  constructor(props: ITableProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      token: props.token ?? this.generateToken(),
      isVisible: props.isVisible ?? true,
      isLocked: props.isLocked ?? false,
      players: props.players ?? [],
      createdAt: props.createdAt ?? new Date(),
    };
  }

  private generateToken(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  get id() {
    return this._id;
  }

  get name() {
    return this.props.name;
  }

  get ownerId() {
    return this.props.ownerId;
  }

  get token() {
    return this.props.token;
  }

  get isVisible() {
    return this.props.isVisible;
  }

  get isLocked() {
    return this.props.isLocked;
  }

  get players() {
    return this.props.players;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  addPlayer(player: IPlayer) {
    if (this.props.players.length >= 8) return;
    this.props.players.push(player);
  }

  lockTable() {
    this.props.isLocked = true;
    this.props.isVisible = false;
  }

  unlockTable() {
    this.props.isLocked = false;
    this.props.isVisible = true;
  }
}
