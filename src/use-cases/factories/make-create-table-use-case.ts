import { singletonTableRepository } from "@/repositories/singleton-table-repository";

import { CreateTableUseCase } from "../table/create-table";

export const makeCreateTableUseCase = () => {
  const useCase = new CreateTableUseCase(singletonTableRepository);

  return useCase;
};
