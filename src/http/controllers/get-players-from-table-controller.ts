import { FastifyReply, FastifyRequest } from "fastify";

import { singletonTableRepository } from "@/repositories/singleton-table-repository";
import { makeGetPlayersFromTableUseCase } from "@/use-cases/factories/make-get-players-from-table-use-case";

export const getPlayersFromTableController = async (
  request: FastifyRequest<{ Params: { token: string } }>,
  reply: FastifyReply
) => {
  const { token } = request.params;

  const table = await singletonTableRepository.findByToken(token);

  if (!table) {
    return reply.status(404).send({
      error: "Table not found",
    });
  }

  const getPlayersFromTableUseCase = makeGetPlayersFromTableUseCase();

  try {
    const { players } = await getPlayersFromTableUseCase.execute(token);

    return reply.status(200).send({ players });
  } catch {
    return reply.status(500).send({
      error: "An error occurred while retrieving players from the table",
    });
  }
};
