import { InMemoryTableRepository } from "@/repositories/in-memory-repository/in-memory-table-repository";

import { ExpelPlayerUseCase } from "../table/expel-player";

export const makeExpelPlayerUseCase = () => {
  const tableRepository = new InMemoryTableRepository();
  const useCase = new ExpelPlayerUseCase(tableRepository);

  return useCase;
};
