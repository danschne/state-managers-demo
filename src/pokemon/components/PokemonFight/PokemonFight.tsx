import { Button, Col, Row } from 'antd'
import { useState } from 'react'
import { useInitializePokemon } from '../../hooks/useInitializePokemon'
import { Move } from '../../models/move'
import { Store } from '../../models/store'
import { get2RandomPokemon } from '../../services/pokemonService'
import { FightResultModal } from '../FightResultModal/FightResultModal'
import { PokemonCard } from '../PokemonCard/PokemonCard'

interface PokemonFightProperties {
	useStore: () => Store
}

export function PokemonFight({ useStore }: PokemonFightProperties) {
	const {
		pokemon1,
		setPokemon1,
		setCurrentHpOfPokemon1,
		pokemon2,
		setPokemon2,
		setCurrentHpOfPokemon2,
		isPokemon1sTurn,
		toggleIsPokemon1sTurn,
		playerHasWon,
		setPlayerHasWon,
		resetFightState,
	} = useStore()
	const [isFightResultModalVisible, setIsFightResultModalVisible] = useState(false)
	useInitializePokemon(setPokemon1, setPokemon2)

	function makeMove(move: Move) {
		const setCurrentHpOfPokemon = isPokemon1sTurn ? setCurrentHpOfPokemon2 : setCurrentHpOfPokemon1
		const pokemon = isPokemon1sTurn ? pokemon2 : pokemon1
		const currentHp = Math.max((pokemon?.currentHp ?? 0) - move.pp, 0)

		setCurrentHpOfPokemon(currentHp)
		toggleIsPokemon1sTurn()

		if (currentHp === 0) {
			setIsFightResultModalVisible(true)
			if (pokemon === pokemon2) {
				setPlayerHasWon(true)
			}
		}
	}

	async function setUpNewFight() {
		const [randomPokemon1, randomPokemon2] = await get2RandomPokemon()
		resetFightState(randomPokemon1, randomPokemon2)
	}

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
				playerHasWon={playerHasWon}
			/>
		</>
	)
}
