import { ActionNotPermittedError } from "@/core/errors/action-not-permitted-error";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { singletonTableRepository } from "@/repositories/singleton-table-repository";

export const expelPlayerUseCase = async (token: string, playerName: string) => {
  const table = await singletonTableRepository.findByToken(token);

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
  return table.players;
};
