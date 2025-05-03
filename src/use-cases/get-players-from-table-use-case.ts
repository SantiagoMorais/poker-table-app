import { ITablesRepository } from "@/repositories/tables-repository";

export class GetPlayersFromTableUseCase {
  constructor(private tablesRepository: ITablesRepository) {}

  async execute(tableToken: string) {
    const table = await this.tablesRepository.findByToken(tableToken);

    if (!table) throw new Error("Table not found");

    return {
      players: table.players.map((player) => ({
        id: player.id,
        name: player.name,
        isOwner: player.isOwner,
      })),
    };
  }
}
