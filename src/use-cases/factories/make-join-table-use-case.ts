import { InMemoryTableRepository } from "@/repositories/in-memory/in-memory-tables-repository";

import { JoinTableUseCase } from "../table/join-table";

export const makeJoinTableUseCase = () => {
  const tablesRepository = new InMemoryTableRepository();
  const useCase = new JoinTableUseCase(tablesRepository);

  return useCase;
};
