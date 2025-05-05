import { InMemoryTableRepository } from "@/repositories/in-memory-repository/in-memory-table-repository";

import { JoinTableUseCase } from "../table/join-table";

export const makeJoinTableUseCase = () => {
  const tableRepository = new InMemoryTableRepository();

  const useCase = new JoinTableUseCase(tableRepository);

  return useCase;
};
