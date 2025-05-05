import { Player } from "../entities/player";

export interface ITableProps {
  id?: string;
  tableName: string;
  isLocked: boolean;
  isVisible?: boolean;
  createdAt?: Date;
  ownerId?: string;
  players: Array<Player>;
}
