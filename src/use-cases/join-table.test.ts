import { beforeEach, describe, expect, it } from "vitest";

import { PlayerAlreadyExistsError } from "@/core/errors/player-already-exists-error";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { TCreateTableInputDTO } from "@/core/types/create-table-input";
import { InMemoryTableRepository } from "@/repositories/in-memory/in-memory-tables-repository";
import { ITablesRepository } from "@/repositories/tables-repository";

import { CreateTableUseCase } from "./create-table";
import { JoinTableUseCase } from "./join-table";

let tablesRepository: ITablesRepository;
let createTableUseCase: CreateTableUseCase;
let sut: JoinTableUseCase;

describe("JoinTableUseCase", () => {
  beforeEach(() => {
    tablesRepository = new InMemoryTableRepository();
    createTableUseCase = new CreateTableUseCase(tablesRepository);
    sut = new JoinTableUseCase(tablesRepository);
  });

  it("should be able to join a created table", async () => {
    const { table } = await createTableUseCase.execute({
      ownerName: "John Doe",
      tableName: "Poker Night",
    });

    const { playerId } = await sut.execute({
      playerName: "Jane Doe",
      token: table.token,
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
      sut.execute({ playerName: "John Doe", token: table.token })
    ).rejects.toBeInstanceOf(PlayerAlreadyExistsError);
  });

  it("should not allow joining a table with a wrong token", async () => {
    await expect(() =>
      sut.execute({ playerName: "John Doe", token: "inexisted-token" })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
