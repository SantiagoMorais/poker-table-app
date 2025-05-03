import { FastifyReply, FastifyRequest } from "fastify";

import { makeGetPlayersFromTableUseCase } from "@/use-cases/factories/make-get-players-from-table-use-case";

export const getPlayersFromTableController = async (
  request: FastifyRequest<{ Params: { token: string } }>,
  reply: FastifyReply
) => {
  const { token } = request.params;

  const getPlayersFromTableUseCase = makeGetPlayersFromTableUseCase();

  try {
    const { players } = await getPlayersFromTableUseCase.execute(token);

    return reply.status(200).send({ players });
  } catch (error) {
    return reply.status(404).send({ error });
  }
};
