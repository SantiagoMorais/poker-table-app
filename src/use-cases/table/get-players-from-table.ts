import { ITablesRepository } from "@/repositories/tables-repository";

export class GetPlayersFromTableUseCase {
  constructor(private tablesRepository: ITablesRepository) {}

  async execute(tableToken: string) {
    const response = await this.tablesRepository.findByToken({
      token: tableToken,
    });

    if (!response) throw new Error("Table not found");

    const table = response.table;

    return {
      players: table.players.map((player) => ({
        id: player.id,
        name: player.name,
        isOwner: player.isOwner,
      })),
    };
  }
}
