import { PrismaTablesRepository } from "@/repositories/prisma-repository/prisma-tables-repository";

import { ExpelPlayerUseCase } from "../table/expel-player";

export const makeExpelPlayerUseCase = () => {
  const tableRepository = new PrismaTablesRepository();
  const useCase = new ExpelPlayerUseCase(tableRepository);

  return useCase;
};
