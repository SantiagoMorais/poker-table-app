import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryPlayersRepository } from "@/repositories/in-memory-repository/in-memory-players-repository";
import { InMemoryTableRepository } from "@/repositories/in-memory-repository/in-memory-table-repository";
import { IPlayersRepository } from "@/repositories/players-repository";
import { ITablesRepository } from "@/repositories/tables-repository";

import { CreateTableUseCase } from "./create-table";

let tableRepository: ITablesRepository;
let playersRepository: IPlayersRepository;
let sut: CreateTableUseCase;

describe("CreateTableUseCase", () => {
  beforeEach(() => {
    tableRepository = new InMemoryTableRepository();
    playersRepository = new InMemoryPlayersRepository(tableRepository);
    sut = new CreateTableUseCase(tableRepository, playersRepository);
  });

  it("should be able to create a table", async () => {
    const { table } = await sut.execute({
      ownerName: "John Doe",
      tableName: "Poker Night",
    });

    expect(table.players).toHaveLength(1);
    expect(table.tableName).toEqual("Poker Night");
    expect(table.players[0].isOwner).toBe(true);
    expect(table.players[0].name).toBe("John Doe");
    expect(table.id).toBeDefined();
    expect(table.token).toBeDefined();
  });
});
