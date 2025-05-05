import { Table } from "../entities/table";

export interface IPlayer {
  id: string;
  name: string;
  isOwner: boolean;
  chips: number;
  tableId: string;
  table: Table;
}
