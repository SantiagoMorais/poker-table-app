import { singletonTableRepository } from "@/repositories/singleton-table-repository";

import { GetPlayersFromTableUseCase } from "../table/get-players-from-table";

export const makeGetPlayersFromTableUseCase = () => {
  const useCase = new GetPlayersFromTableUseCase(singletonTableRepository);

  return useCase;
};
