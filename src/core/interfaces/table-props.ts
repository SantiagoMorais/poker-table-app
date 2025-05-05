import { IPlayer } from "./player";

export interface ITableProps {
  tableName: string;
  ownerId: string;
  token?: string;
  isVisible?: boolean;
  isLocked: boolean;
  players?: Array<IPlayer>;
  createdAt?: Date;
}
