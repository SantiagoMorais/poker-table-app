import { InMemoryTableRepository } from "@/repositories/in-memory/in-memory-tables-repository";

import { CreateTableUseCase } from "../table/create-table";

export const makeCreateTableUseCase = () => {
  const tablesRepository = new InMemoryTableRepository();
  const useCase = new CreateTableUseCase(tablesRepository);

  return useCase;
};

