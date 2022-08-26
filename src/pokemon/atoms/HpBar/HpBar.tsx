import { Progress } from 'antd'
import { getHp, Pokemon } from '../../models/pokemon'

interface HpBarProperties {
	pokemon: Pokemon
}

export function HpBar({ pokemon }: HpBarProperties) {
	const hp = getHp(pokemon)
	const { currentHp } = pokemon

	return (
		<>
			{hp && currentHp !== undefined && (
				<span data-testid={`hp-bar-${pokemon.name}`}>
					<Progress strokeColor='#49aa19' percent={(currentHp / hp.base_stat) * 100} showInfo={false} />
				</span>
			)}
		</>
	)
}
