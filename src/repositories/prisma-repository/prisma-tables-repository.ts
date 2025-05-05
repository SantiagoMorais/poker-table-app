import { randomUUID } from "crypto";

import { Player } from "@/core/entities/player";
import { Table } from "@/core/entities/table";
import { db } from "@/db";

import { ITablesRepository } from "../tables-repository";

export class PrismaTablesRepository implements ITablesRepository {
  async create({ table }: { table: Table }): Promise<void> {
    const ownerId = randomUUID();
    await db.table.create({
      data: {
        tableName: table.tableName,
        token: table.token!,
        ownerId,
      },
      include: {
        players: true,
      },
    });
  }

  async findByToken({
    token,
  }: {
    token: string;
  }): Promise<{ table: Table } | null> {
    const tableRecord = await db.table.findUnique({
      where: { token },
      include: { players: true },
    });

    if (!tableRecord) return null;

    const players = tableRecord.players.map(
      (p) => new Player(p.name, p.isOwner, token)
    );

    const table = new Table(
      {
        tableName: tableRecord.tableName,
        isLocked: tableRecord.isLocked,
        isVisible: tableRecord.isVisible,
        createdAt: tableRecord.createdAt,
        players,
      },
      tableRecord.id
    );

    return { table };
  }

  async save({ table }: { table: Table }): Promise<void> {
    await db.table.update({
      where: { id: table.id },
      data: {
        tableName: table.tableName,
        token: table.token,
        isVisible: table.isVisible,
        isLocked: table.isLocked,
        ownerId: table.ownerId ?? null,
      },
    });
  }
}
