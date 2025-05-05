import { InMemoryPlayersRepository } from "@/repositories/in-memory-repository/in-memory-players-repository";
import { InMemoryTableRepository } from "@/repositories/in-memory-repository/in-memory-table-repository";

import { CreateTableUseCase } from "../table/create-table";

export const makeCreateTableUseCase = () => {
  const tableRepository = new InMemoryTableRepository();
  const playersRepository = new InMemoryPlayersRepository(tableRepository);
  const useCase = new CreateTableUseCase(tableRepository, playersRepository);

  return useCase;
};
