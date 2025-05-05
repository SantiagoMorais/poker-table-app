import { randomUUID } from "crypto";

import { ITableProps } from "../interfaces/table-props";
import { Player } from "./player";

export class Table {
  private _id: string;
  private props: Omit<ITableProps, "token"> & { token: string };

  constructor(props: ITableProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      token: this.generateToken(),
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

  get tableName() {
    return this.props.tableName;
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

  addPlayer(player: Player) {
    if (!this.props.players) this.props.players = [];

    if (this.props.players.length >= 8) return;

    this.props.players.push(player);

    if (!this.props.ownerId) {
      this.props.ownerId = player.id;
    }
  }

  lockTable() {
    this.props.isLocked = true;
    this.props.isVisible = false;
  }

  unlockTable() {
    this.props.isLocked = false;
    this.props.isVisible = true;
  }

  updateOwner({ ownerId }: { ownerId: string }, force = false) {
    if (force || !this.props.ownerId) this.props.ownerId = ownerId;
  }

  changeOwnerToNextPlayer() {
    const nextPlayer = this.props.players?.find(
      (p) => p.id !== this.props.ownerId
    );
    if (nextPlayer) {
      this.props.ownerId = nextPlayer.id;
      nextPlayer.isOwner = true;
    }
  }
}
