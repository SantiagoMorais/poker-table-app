import { beforeEach, describe, expect, it } from "vitest";

import { PlayerAlreadyExistsError } from "@/core/errors/player-already-exists-error";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { TableFullError } from "@/core/errors/table-full-error";
import { InMemoryPlayersRepository } from "@/repositories/in-memory-repository/in-memory-players-repository";
import { InMemoryTableRepository } from "@/repositories/in-memory-repository/in-memory-table-repository";
import { IPlayersRepository } from "@/repositories/players-repository";
import { ITablesRepository } from "@/repositories/tables-repository";

import { CreateTableUseCase } from "./create-table";
import { JoinTableUseCase } from "./join-table";

let tablesRepository: ITablesRepository;
let createTableUseCase: CreateTableUseCase;
let playersRepository: IPlayersRepository;
let sut: JoinTableUseCase;

describe("JoinTableUseCase", () => {
  beforeEach(() => {
    tablesRepository = new InMemoryTableRepository();
    playersRepository = new InMemoryPlayersRepository(tablesRepository);
    createTableUseCase = new CreateTableUseCase(
      tablesRepository,
      playersRepository
    );
    sut = new JoinTableUseCase(tablesRepository);
  });

  it("should be able to join a created table", async () => {
    const { table } = await createTableUseCase.execute({
      ownerName: "John Doe",
      tableName: "Poker Night",
    });

    const { playerId } = await sut.execute({
      playerName: "Jane Doe",
      token: table.token!,
    });

    const joinedPlayer = table.players.find((p) => p.id === playerId);
    expect(joinedPlayer?.name).toBe("Jane Doe");
    expect(table.players).toHaveLength(2);
  });

  it("should not allow joining a table with a duplicate player name", async () => {
    const { table } = await createTableUseCase.execute({
      ownerName: "John Doe",
      tableName: "Poker Night",
    });

    await expect(() =>
      sut.execute({
        playerName: "John Doe",
        token: table.token!,
      })
    ).rejects.toBeInstanceOf(PlayerAlreadyExistsError);
  });

  it("should not allow joining a table with a wrong token", async () => {
    await expect(() =>
      sut.execute({ playerName: "John Doe", token: "inexisted-token" })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not allow joining a full table", async () => {
    const { table } = await createTableUseCase.execute({
      ownerName: "John Doe",
      tableName: "Poker Night",
    });

    for (let i = 0; i < 7; i++) {
      await sut.execute({
        playerName: `Player ${i}`,
        token: table.token!,
      });
    }

    await expect(() =>
      sut.execute({
        playerName: "New Player",
        token: table.token!,
      })
    ).rejects.toBeInstanceOf(TableFullError);
  });
});
