import { Pokemon } from "../models/pokemon";
import { doubleKick, tackle } from "./exampleMoves";
import { hp } from "./exampleStats";

export const pikachu: Pokemon = {
  id: 1,
  name: "pikachu",
  sprites: {
    front_default: "/sprites/pikachu/front_default",
  },
  stats: [
    {
      base_stat: 42,
      stat: hp,
    },
  ],
  moves: [tackle, doubleKick],
};
