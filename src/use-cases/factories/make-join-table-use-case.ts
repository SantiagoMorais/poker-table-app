import { PrismaTablesRepository } from "@/repositories/prisma-repository/prisma-tables-repository";

import { JoinTableUseCase } from "../table/join-table";

export const makeJoinTableUseCase = () => {
  const tableRepository = new PrismaTablesRepository();

  const useCase = new JoinTableUseCase(tableRepository);

  return useCase;
};
