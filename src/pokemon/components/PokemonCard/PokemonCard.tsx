import { Typography } from 'antd'
import { HpBar } from '../../atoms/HpBar/HpBar'
import { MoveSelection } from '../../atoms/MoveSelection/MoveSelection'
import { Move } from '../../models/move'
import { getHp, Pokemon } from '../../models/pokemon'
import styles from './PokemonCard.module.scss'

const { Title } = Typography

interface PokemonCardProperties {
	pokemon: Pokemon
	onMove: (move: Move) => void
	isActive?: boolean
}

// TODO: remove HP and power values after trying out (and adjusting damage scaling) a few fights
export function PokemonCard({ pokemon, onMove, isActive }: PokemonCardProperties) {
	const hp = getHp(pokemon)
	const { currentHp } = pokemon

	return (
		<div>
			<img
				src={pokemon.sprites.front_default}
				alt={`picture of ${pokemon.name}`}
				width={200}
				className={styles.image}
			/>
			<Title className={`${styles.text} ${styles.capitalize}`}>
				{pokemon.name} ({hp?.base_stat} HP)
			</Title>
			{hp && currentHp !== undefined && (
				<div className={styles.hpBar}>
					<HpBar hp={hp.base_stat} currentHp={currentHp} />
				</div>
			)}
			<MoveSelection moves={pokemon.moves} onMove={onMove} disabled={!isActive || !currentHp} />
		</div>
	)
}
