import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryTableRepository } from "@/repositories/in-memory/in-memory-tables-repository";
import { ITablesRepository } from "@/repositories/tables-repository";

import { CreateTableUseCase } from "./create-table";
import { ExpelPlayerUseCase } from "./expel-player";
import { JoinTableUseCase } from "./join-table";

let tablesRepository: ITablesRepository;
let createTableUseCase: CreateTableUseCase;
let joinTableUseCase: JoinTableUseCase;
let sut: ExpelPlayerUseCase;

describe("expel player use case", () => {
  beforeEach(() => {
    tablesRepository = new InMemoryTableRepository();
    createTableUseCase = new CreateTableUseCase(tablesRepository);
    joinTableUseCase = new JoinTableUseCase(tablesRepository);
    sut = new ExpelPlayerUseCase(tablesRepository);
  });

  it("should be able to expel a player from a table", async () => {
    const { table } = await createTableUseCase.execute({
      ownerName: "John Doe",
      tableName: "Poker Night",
    });

    await joinTableUseCase.execute({
      playerName: "Jane Doe",
      token: table.token,
    });

    expect(table.players).toHaveLength(2);

    const result = await sut.execute({
      playerName: "Jane Doe",
      token: table.token,
    });

    expect(result.players).toHaveLength(1);
    expect(result.players[0].name).toBe("John Doe");
  });
});
