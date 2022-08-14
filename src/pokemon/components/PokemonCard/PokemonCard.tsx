import { Typography } from "antd";
import { useEffect } from "react";
import { usePokemon } from "../../hooks/usePokemon";
import { getPokemon } from "../../services/pokemonService";
import styles from "./PokemonCard.module.scss";

const { Title, Paragraph } = Typography;

export function PokemonCard() {
  const [pokemon, setPokemon] = usePokemon();
  const hp = pokemon?.stats.find((stat) => stat.stat.name === "hp");
  const moves = pokemon?.moves
    .map((move) => `${move.name} (${move.power})`)
    .join(", ");

  useEffect(() => {
    setPokemon(getPokemon());
  }, []);

  if (!pokemon) {
    return <></>;
  }

  return (
    <div>
      <Title className={styles.text}>{pokemon.name}</Title>
      <Paragraph className={styles.text}>HP: {hp?.base_stat}</Paragraph>
      <Paragraph className={styles.text}>Moves: {moves}</Paragraph>
    </div>
  );
}
