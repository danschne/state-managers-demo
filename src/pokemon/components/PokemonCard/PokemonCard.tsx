import { Typography } from 'antd'
import { HpBar } from '../../atoms/HpBar/HpBar'
import { MoveSelection } from '../../atoms/MoveSelection/MoveSelection'
import { Move } from '../../models/move'
import { Pokemon } from '../../models/pokemon'
import styles from './PokemonCard.module.scss'

const { Title } = Typography

interface PokemonCardProperties {
	pokemon: Pokemon
	onMove: (move: Move) => void
	isUpForNextTurn?: boolean
}

export function PokemonCard({ pokemon, onMove, isUpForNextTurn }: PokemonCardProperties) {
	const { currentHp } = pokemon

	return (
		<div>
			<img
				src={pokemon.sprites.front_default}
				alt={`picture of ${pokemon.name}`}
				width={200}
				className={styles.image}
			/>
			<Title className={`${styles.text} ${styles.capitalize}`}>{pokemon.name}</Title>
			<div className={styles.hpBar}>
				<HpBar pokemon={pokemon} />
			</div>
			<MoveSelection moves={pokemon.moves} onMove={onMove} disabled={!isUpForNextTurn || !currentHp} />
		</div>
	)
}
