import { singletonTableRepository } from "@/repositories/singleton-table-repository";

import { JoinTableUseCase } from "../table/join-table";

export const makeJoinTableUseCase = () => {
  const useCase = new JoinTableUseCase(singletonTableRepository);

  return useCase;
};
