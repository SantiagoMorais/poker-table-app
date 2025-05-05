import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryPlayersRepository } from "@/repositories/in-memory-repository/in-memory-players-repository";
import { InMemoryTableRepository } from "@/repositories/in-memory-repository/in-memory-table-repository";
import { IPlayersRepository } from "@/repositories/players-repository";
import { ITablesRepository } from "@/repositories/tables-repository";

import { CreateTableUseCase } from "./create-table";
import { ExpelPlayerUseCase } from "./expel-player";
import { JoinTableUseCase } from "./join-table";

let tableRepository: ITablesRepository;
let createTableUseCase: CreateTableUseCase;
let joinTableUseCase: JoinTableUseCase;
let playersRepository: IPlayersRepository;
let sut: ExpelPlayerUseCase;

describe("expel player use case", () => {
  beforeEach(() => {
    tableRepository = new InMemoryTableRepository();
    playersRepository = new InMemoryPlayersRepository(tableRepository);
    createTableUseCase = new CreateTableUseCase(
      tableRepository,
      playersRepository
    );
    joinTableUseCase = new JoinTableUseCase(tableRepository);
    sut = new ExpelPlayerUseCase(tableRepository);
  });

  it("should be able to expel a player from a table", async () => {
    const { table } = await createTableUseCase.execute({
      ownerName: "John Doe",
      tableName: "Poker Night",
    });

    await joinTableUseCase.execute({
      playerName: "Jane Doe",
      token: table.token!,
    });

    expect(table.players).toHaveLength(2);

    const result = await sut.execute({
      playerName: "Jane Doe",
      token: table.token!,
    });

    expect(result.players).toHaveLength(1);
    expect(result.players[0].name).toBe("John Doe");
  });
});
