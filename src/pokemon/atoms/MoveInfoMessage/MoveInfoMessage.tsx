import { Typography } from 'antd'
import { Move } from '../../models/move'
import { Pokemon } from '../../models/pokemon'
import styles from './MoveInfoMessage.module.scss'

const { Title } = Typography

interface MoveInfoMessageProperties {
	pokemon?: Pokemon
	move: Move
}

export function MoveInfoMessage({ pokemon, move }: MoveInfoMessageProperties) {
	return (
		<>
			<Title level={5}>
				<img
					src={pokemon?.sprites.front_default}
					alt={`picture of ${pokemon?.name}`}
					width={40}
					className={styles.image}
				/>
				<span className={styles.capitalize}>{pokemon?.name}</span> uses{' '}
				<span className={styles.capitalize}>{move.name}</span>
			</Title>
		</>
	)
}
