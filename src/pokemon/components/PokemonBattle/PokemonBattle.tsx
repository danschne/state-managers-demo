import { Col, Row } from "antd";
import { useEffect } from "react";
import { usePokemon } from "../../hooks/usePokemon";
import { getPokemon } from "../../services/pokemonService";
import { PokemonCard } from "../PokemonCard/PokemonCard";

export function PokemonBattle() {
  const [pokemon1, setPokemon1] = usePokemon();
  const [pokemon2, setPokemon2] = usePokemon();

  useEffect(() => {
    setPokemon1(getPokemon("pikachu"));
    setPokemon2(getPokemon("squirtle"));
  }, []);

  return (
    <Row>
      <Col span={12}>{pokemon1 && <PokemonCard pokemon={pokemon1} />}</Col>
      <Col span={12}>{pokemon2 && <PokemonCard pokemon={pokemon2} />}</Col>
    </Row>
  );
}
