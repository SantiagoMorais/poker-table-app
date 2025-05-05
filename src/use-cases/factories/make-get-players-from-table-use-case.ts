import { InMemoryTableRepository } from "@/repositories/in-memory-repository/in-memory-table-repository";

import { GetPlayersFromTableUseCase } from "../table/get-players-from-table";

export const makeGetPlayersFromTableUseCase = () => {
  const tableRepository = new InMemoryTableRepository();

  const useCase = new GetPlayersFromTableUseCase(tableRepository);

  return useCase;
};
