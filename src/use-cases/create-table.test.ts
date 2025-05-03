import { beforeEach, describe, expect, it } from "vitest";

import { TCreateTableInputDTO } from "@/core/types/create-table-input";
import { InMemoryTableRepository } from "@/repositories/in-memory/in-memory-tables-repository";
import { ITablesRepository } from "@/repositories/tables-repository";

import { CreateTableUseCase } from "./create-table";

let tablesRepository: ITablesRepository;
let sut: CreateTableUseCase;

describe("CreateTableUseCase", () => {
  beforeEach(async () => {
    tablesRepository = new InMemoryTableRepository();
    sut = new CreateTableUseCase(tablesRepository);
  });

  it("should be able to create a table", async () => {
    const input: TCreateTableInputDTO = {
      ownerName: "John Doe",
      tableName: "Poker Night",
    };

    const { table } = await sut.execute(input);

    expect(table.players).toHaveLength(1);
    expect(table.name).toEqual("Poker Night");
    expect(table.players[0].isOwner).toBe(true);
    expect(table.players[0].name).toBe("John Doe");
    expect(table.id).toBeDefined();
    expect(table.token).toBeDefined();
  });
});
