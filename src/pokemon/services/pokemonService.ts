import { pikachu, squirtle } from "../testData/examplePokemon";

export function getPokemon(name: string) {
  if (name === "pikachu") {
    return pikachu;
  }

  return squirtle;
}
