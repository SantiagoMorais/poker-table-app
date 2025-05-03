import { FastifyReply, FastifyRequest } from "fastify";

import { makeJoinTableUseCase } from "@/use-cases/factories/make-join-table-use-case";

export async function joinTableController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { token, playerName } = request.body as {
    token: string;
    playerName: string;
  };

  const joinTableUseCase = makeJoinTableUseCase();

  try {
    const { tableId, playerId } = await joinTableUseCase.execute({
      token,
      playerName,
    });

    return reply.status(200).send({ tableId, playerId });
  } catch (err) {
    return reply.status(400).send({ error: err });
  }
}
