import { PrismaPlayersRepository } from "@/repositories/prisma-repository/prisma-players-repository";
import { PrismaTablesRepository } from "@/repositories/prisma-repository/prisma-tables-repository";

import { CreateTableUseCase } from "../table/create-table";

export const makeCreateTableUseCase = () => {
  const tableRepository = new PrismaTablesRepository();
  const playersRepository = new PrismaPlayersRepository();
  const useCase = new CreateTableUseCase(tableRepository, playersRepository);

  return useCase;
};
