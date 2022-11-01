import { Button, Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import { useInitializePokemon } from '../../hooks/useInitializePokemon'
import { usePlayVersusAi } from '../../hooks/usePlayVersusAi'
import { Store } from '../../models/store'
import { get2RandomPokemon } from '../../services/pokemonService'
import { FightResultModal } from '../FightResultModal/FightResultModal'
import { PokemonCard } from '../PokemonCard/PokemonCard'

interface PokemonFightProperties {
	useStore: () => Store
	versusAi?: boolean
}

export function PokemonFight({ useStore, versusAi = true }: PokemonFightProperties) {
	const { pokemon1, pokemon2, setPokemon, isPokemon1sTurn, pokemon1HasWon, makeMove, resetFight } = useStore()
	const [isFightResultModalVisible, setIsFightResultModalVisible] = useState(false)

	async function setUpNewFight() {
		const [randomPokemon1, randomPokemon2] = await get2RandomPokemon()
		resetFight(randomPokemon1, randomPokemon2)
	}

	useEffect(() => {
		const fightIsOver = pokemon1?.currentHp === 0 || pokemon2?.currentHp === 0
		if (fightIsOver) {
			setIsFightResultModalVisible(true)
		}
	}, [pokemon1, pokemon2])

	useInitializePokemon(setPokemon)

	usePlayVersusAi({
		isActivated: versusAi,
		pokemon1,
		pokemon2,
		isPokemon1sTurn,
		makeMove,
	})

	return (
		<>
			<Row justify='end'>
				<Button size='large' onClick={setUpNewFight}>
					New fight
				</Button>
			</Row>
			<Row gutter={32}>
				<Col span={12}>
					{pokemon1 && <PokemonCard pokemon={pokemon1} onMove={makeMove} isUpForNextTurn={isPokemon1sTurn} />}
				</Col>
				<Col span={12}>
					{pokemon2 && <PokemonCard pokemon={pokemon2} onMove={makeMove} isUpForNextTurn={!isPokemon1sTurn} />}
				</Col>
			</Row>
			<FightResultModal
				isVisible={isFightResultModalVisible}
				onClose={() => setIsFightResultModalVisible(false)}
				onNewFight={setUpNewFight}
				playerHasWon={pokemon1HasWon}
			/>
		</>
	)
}
