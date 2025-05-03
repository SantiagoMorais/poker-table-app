import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryTableRepository } from "@/repositories/in-memory/in-memory-tables-repository";
import { ITablesRepository } from "@/repositories/tables-repository";

import { CreateTableUseCase } from "./create-table";
import { GetPlayersFromTableUseCase } from "./get-players-from-table";
import { JoinTableUseCase } from "./join-table";

let tablesRepository: ITablesRepository;
let createTableUseCase: CreateTableUseCase;
let joinTableUseCase: JoinTableUseCase;
let sut: GetPlayersFromTableUseCase;

describe("GetPlayersFromTableUseCase", () => {
  beforeEach(() => {
    tablesRepository = new InMemoryTableRepository();
    createTableUseCase = new CreateTableUseCase(tablesRepository);
    joinTableUseCase = new JoinTableUseCase(tablesRepository);
    sut = new GetPlayersFromTableUseCase(tablesRepository);
  });

  it("should be list all players from a table", async () => {
    const { table } = await createTableUseCase.execute({
      ownerName: "John Doe",
      tableName: "Poker Night",
    });

    for (let i = 0; i < 4; i++) {
      await joinTableUseCase.execute({
        playerName: `Player ${i}`,
        token: table.token,
      });
    }

    const { players } = await sut.execute(table.token);
    const playerNames = players.map((p) => p.name);

    expect(players).toHaveLength(5); // Should include the owner + 4 joined players
    expect(playerNames).toContain("John Doe");
    expect(playerNames).toContain("Player 0");
  });
});
