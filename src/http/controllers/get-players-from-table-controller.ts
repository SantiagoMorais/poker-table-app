import { FastifyReply, FastifyRequest } from "fastify";

import { InMemoryTableRepository } from "@/repositories/in-memory/in-memory-tables-repository";
import { GetPlayersFromTableUseCase } from "@/use-cases/get-players-from-table";

export const getPlayersFromTableController = async (
  request: FastifyRequest<{ Params: { token: string } }>,
  reply: FastifyReply
) => {
  const { token } = request.params;

  const tablesRepository = InMemoryTableRepository.getInstance();
  const getPlayersFromTableUseCase = new GetPlayersFromTableUseCase(
    tablesRepository
  );

  try {
    const { players } = await getPlayersFromTableUseCase.execute(token);

    return reply.status(200).send({ players });
  } catch (error) {
    return reply.status(404).send({ error });
  }
};
