import { Table } from "@/core/entities/table";
import {
  createTableInput,
  TCreateTableInputDTO,
} from "@/core/types/create-table-input";
import { IPlayersRepository } from "@/repositories/players-repository";
import { ITablesRepository } from "@/repositories/tables-repository";

export class CreateTableUseCase {
  constructor(
    private tablesRepository: ITablesRepository,
    private playersRepository: IPlayersRepository
  ) {}

  async execute(input: TCreateTableInputDTO): Promise<{ table: Table }> {
    const parsed = createTableInput.parse(input);

    const table = new Table({
      isLocked: false,
      tableName: parsed.tableName,
      players: [],
    });

    await this.tablesRepository.create({ table });

    const { player: owner } = await this.playersRepository.create({
      name: input.ownerName,
      tableToken: table.token,
    });

    table.updateOwner({ ownerId: owner.id }, true);
    await this.tablesRepository.save({ table });

    return { table };
  }
}
