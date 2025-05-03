import { InMemoryTableRepository } from "@/repositories/in-memory/in-memory-tables-repository";

import { GetPlayersFromTableUseCase } from "../table/get-players-from-table";

export const makeGetPlayersFromTableUseCase = () => {
  const tablesRepository = new InMemoryTableRepository();
  const useCase = new GetPlayersFromTableUseCase(tablesRepository);

  return useCase;
};
