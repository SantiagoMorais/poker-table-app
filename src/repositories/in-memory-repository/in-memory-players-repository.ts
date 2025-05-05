import { Player } from "@/core/entities/player";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";

import { IPlayersRepository } from "../players-repository";
import { ITablesRepository } from "../tables-repository";

export class InMemoryPlayersRepository implements IPlayersRepository {
  private players: Player[] = [];
  private tableRepository: ITablesRepository;

  constructor(tableRepository: ITablesRepository) {
    this.tableRepository = tableRepository;
  }

  async create({
    name,
    tableToken,
  }: {
    name: string;
    tableToken: string;
  }): Promise<{ player: Player }> {
    const response = await this.tableRepository.findByToken({
      token: tableToken,
    });

    if (!response) throw new ResourceNotFoundError("Table not Found");

    const table = response.table;
    const isOwner = table.players.length === 0;
    const player = new Player(name, isOwner, table.token!);
    table.addPlayer(player);
    this.players.push(player);
    await this.tableRepository.save({ table });

    return { player };
  }

  async findById({ id }: { id: string }): Promise<{ player: Player }> {
    const player = this.players.find((player) => player.id === id);

    if (!player) throw new ResourceNotFoundError();

    return { player };
  }

  async exclude({ id }: { id: string }): Promise<void> {
    const index = this.players.findIndex((player) => player.id === id);
    if (index === -1) throw new ResourceNotFoundError();

    this.players.splice(index, 1);
  }

  async updateOwner({ id }: { id: string }): Promise<void> {
    const player = this.players.find((player) => player.id === id);

    if (!player) throw new ResourceNotFoundError();

    player.isOwner = true;
  }
}
