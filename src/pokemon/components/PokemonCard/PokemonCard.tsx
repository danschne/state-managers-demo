import { Typography } from 'antd'
import { Pokemon } from '../../models/pokemon'
import styles from './PokemonCard.module.scss'

const { Title, Paragraph } = Typography

interface PokemonCardProperties {
	pokemon: Pokemon
}

export function PokemonCard({ pokemon }: PokemonCardProperties) {
	const hp = pokemon.stats.find((stat) => stat.stat.name === 'hp')
	const moves = pokemon.moves.map((move) => `${move.name} (${move.pp})`).join(', ')

	return (
		<div>
			<img src={pokemon.sprites.front_default} alt={`picture of ${pokemon.name}`} />
			<Title className={styles.text}>{pokemon.name}</Title>
			<Paragraph className={styles.text}>HP: {hp?.base_stat}</Paragraph>
			<Paragraph className={styles.text}>Moves: {moves}</Paragraph>
		</div>
	)
}