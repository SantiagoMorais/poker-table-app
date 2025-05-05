import { Table } from "@/core/entities/table";

export interface ITablesRepository {
  create({ table }: { table: Table }): Promise<void>;
  findByToken({ token }: { token: string }): Promise<{ table: Table } | null>;
  save({ table }: { table: Table }): Promise<void>;
}
