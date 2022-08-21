import { Button, Col, Progress, Row, Typography } from 'antd'
import { Pokemon } from '../../models/pokemon'
import styles from './PokemonCard.module.scss'

const { Title } = Typography

interface PokemonCardProperties {
	pokemon: Pokemon
}

export function PokemonCard({ pokemon }: PokemonCardProperties) {
	const hp = pokemon.stats.find((stat) => stat.stat.name === 'hp')
	const currentHp = hp

	return (
		<div>
			<img
				src={pokemon.sprites.front_default}
				alt={`picture of ${pokemon.name}`}
				width={200}
				className={styles.image}
			/>
			<Title className={`${styles.text} ${styles.capitalize}`}>{pokemon.name}</Title>
			{hp && currentHp && (
				<Progress
					strokeColor={{
						'0%': '#a61d24',
						'100%': '#49aa19',
					}}
					percent={(currentHp.base_stat / hp.base_stat) * 100}
					showInfo={false}
					className={styles.progress}
				/>
			)}
			<Row gutter={[16, 16]}>
				{pokemon.moves.map((move) => {
					return (
						<Col key={move.id} span={12}>
							<Button type='primary' block className={styles.capitalize}>
								{move.name}
							</Button>
						</Col>
					)
				})}
			</Row>
		</div>
	)
}
