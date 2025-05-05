import { Table } from "@/core/entities/table";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";

import { ITablesRepository } from "../tables-repository";

export class InMemoryTableRepository implements ITablesRepository {
  private tables: Table[] = [];

  async create({ table }: { table: Table }): Promise<void> {
    this.tables.push(table);
  }

  async findByToken({
    token,
  }: {
    token: string;
  }): Promise<{ table: Table } | null> {
    const table = this.tables.find((table) => table.token === token);

    if (!table) throw new ResourceNotFoundError();

    return { table };
  }

  async save({ table }: { table: Table }): Promise<void> {
    const index = this.tables.findIndex((t) => t.id === table.id);
    if (index !== -1) {
      this.tables[index] = table;
    } else {
      throw new ResourceNotFoundError("Table not found");
    }
  }
}
