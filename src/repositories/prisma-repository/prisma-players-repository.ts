import { Player } from "@/core/entities/player";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { db } from "@/db";

import { IPlayersRepository } from "../players-repository";

export class PrismaPlayersRepository implements IPlayersRepository {
  async create({
    name,
    tableToken,
  }: {
    name: string;
    tableToken: string;
  }): Promise<{ player: Player }> {
    const table = await db.table.findUnique({
      where: { token: tableToken },
      include: { players: true },
    });

    if (!table) throw new ResourceNotFoundError("Table not found");

    const isOwner = table.players.length === 0;

    await db.table.update({
      where: { token: tableToken },
      include: { players: true },
      data: {
        players: {
          create: { name, isOwner },
        },
      },
    });

    const player = new Player(name, isOwner, table.id);

    return { player };
  }

  async findById({ id }: { id: string }): Promise<{ player: Player }> {
    const playerRecord = await db.player.findUnique({
      where: { id },
    });

    if (!playerRecord) throw new ResourceNotFoundError("Player not found");

    const player = new Player(
      playerRecord?.name,
      playerRecord.isOwner,
      playerRecord.tableId
    );

    return { player };
  }

  async exclude({ id }: { id: string }): Promise<void> {
    const playerRecord = await db.player.findUnique({
      where: { id },
    });

    if (!playerRecord) throw new ResourceNotFoundError("Player not found");

    await db.player.delete({
      where: { id },
    });
  }

  async updateOwner({ id }: { id: string }): Promise<void> {
    const playerRecord = await db.player.findUnique({
      where: { id },
    });

    if (!playerRecord) throw new ResourceNotFoundError("Player not found");

    await db.player.update({ where: { id }, data: { isOwner: true } });
  }
}
