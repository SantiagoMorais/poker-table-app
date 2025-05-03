import { singletonTableRepository } from "@/repositories/singleton-table-repository";

import { ExpelPlayerUseCase } from "../table/expel-player";

export const makeExpelPlayerUseCase = () => {
  const useCase = new ExpelPlayerUseCase(singletonTableRepository);

  return useCase;
};
