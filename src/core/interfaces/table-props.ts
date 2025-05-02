import { IPlayer } from "./player";

export interface ITableProps {
  name: string;
  ownerId: string;
  token?: string;
  isVisible?: boolean;
  isLocked?: boolean;
  players?: Array<IPlayer>;
  createdAt?: Date;
}
