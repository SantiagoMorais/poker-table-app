import { Table } from "@/core/entities/table";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";

import { ITablesRepository } from "../tables-repository";

export class InMemoryTableRepository implements ITablesRepository {
  private tables: Table[] = [];

  async create(table: Table): Promise<void> {
    this.tables.push(table);
  }

  async findByToken(token: string): Promise<Table | null> {
    const table = this.tables.find((table) => table.token === token);
    return table || null;
  }

  async findById(id: string): Promise<Table | null> {
    const table = this.tables.find((table) => table.id === id);
    return table || null;
  }

  async listAll(): Promise<Table[]> {
    return this.tables;
  }

  async clear(): Promise<void> {
    this.tables = [];
  }

  async save(table: Table): Promise<void> {
    const index = this.tables.findIndex((t) => t.id === table.id);
    if (index !== -1) {
      this.tables[index] = table;
    } else {
      throw new ResourceNotFoundError("Table not found");
    }
  }
}
