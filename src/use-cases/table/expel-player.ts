import { ActionNotPermittedError } from "@/core/errors/action-not-permitted-error";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { IExpelPlayerUseCase } from "@/core/interfaces/expel-player-use-case";
import { IPlayer } from "@/core/interfaces/player";
import { ITablesRepository } from "@/repositories/tables-repository";

export class ExpelPlayerUseCase {
  constructor(private tablesRepository: ITablesRepository) {}

  async execute({ playerName, token }: IExpelPlayerUseCase): Promise<{
    players: IPlayer[];
  }> {
    const table = await this.tablesRepository.findByToken(token);

    if (!table) {
      throw new ResourceNotFoundError("Table not found");
    }

    if (table.isLocked) {
      throw new ActionNotPermittedError(
        "Cannot expel players after the game has started"
      );
    }

    const playerIndex = table.players.findIndex(
      (player) => player.name === playerName
    );

    if (playerIndex === -1) {
      throw new ResourceNotFoundError("Player not found");
    }

    table.players.splice(playerIndex, 1);
    await this.tablesRepository.save(table);

    return { players: table.players };
  }
}
