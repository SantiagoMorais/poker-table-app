import { Table } from "@/core/entities/table";

export interface ITablesRepository {
  create(table: Table): Promise<void>;
  findByToken(token: string): Promise<Table | null>;
  save(table: Table): Promise<void>;
}
