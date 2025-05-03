import { randomUUID } from "crypto";

import { Table } from "@/core/entities/table";
import {
  createTableInput,
  TCreateTableInputDTO,
} from "@/core/types/create-table-input";
import { ITablesRepository } from "@/repositories/tables-repository";

export class CreateTableUseCase {
  constructor(private tablesRepository: ITablesRepository) {}

  async execute(input: TCreateTableInputDTO): Promise<{ table: Table }> {
    const parsed = createTableInput.parse(input);

    const ownerId = randomUUID();
    const owner = {
      id: ownerId,
      name: parsed.ownerName,
      isOwner: true,
      chips: 500,
    };

    const table = new Table({
      name: parsed.tableName,
      ownerId: ownerId,
      players: [owner],
    });

    await this.tablesRepository.create(table);

    return { table };
  }
}
