import { PrismaTablesRepository } from "@/repositories/prisma-repository/prisma-tables-repository";

import { GetPlayersFromTableUseCase } from "../table/get-players-from-table";

export const makeGetPlayersFromTableUseCase = () => {
  const tableRepository = new PrismaTablesRepository();

  const useCase = new GetPlayersFromTableUseCase(tableRepository);

  return useCase;
};
