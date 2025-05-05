import { Player } from "@/core/entities/player";

export interface IPlayersRepository {
  create({
    name,
    tableToken,
  }: {
    name: string;
    tableToken: string;
  }): Promise<{ player: Player }>;
  findById({ id }: { id: string }): Promise<{ player: Player }>;
  exclude({ id }: { id: string }): Promise<void>;
  updateOwner({ id }: { id: string }): Promise<void>;
}
