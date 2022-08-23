import { Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import { Move } from '../../models/move'
import { Store } from '../../models/store'
import { getPokemon } from '../../services/pokemonService'
import { BattleEndingModal } from '../BattleEndingModal/BattleEndingModal'
import { PokemonCard } from '../PokemonCard/PokemonCard'

interface PokemonBattleProperties {
	useStore: () => Store
}

// TODO: add a new fight button (random new pokemon)
// TODO: add rudimentary tests to fight mechanics
// [TODO: wrap some things in a context (mostly relevant for children)?]
export function PokemonBattle({ useStore }: PokemonBattleProperties) {
	const {
		pokemon1,
		setPokemon1,
		setCurrentHpOfPokemon1,
		pokemon2,
		setPokemon2,
		setCurrentHpOfPokemon2,
		isPokemon1sTurn,
		toggleIsPokemon1sTurn,
	} = useStore()
	const [isBattleEndingModalVisible, setIsBattleEndingModalVisible] = useState(false)
	const [playerHasWon, setPlayerHasWon] = useState(false)

	function makeMove(move: Move) {
		const setCurrentHpOfPokemon = isPokemon1sTurn ? setCurrentHpOfPokemon2 : setCurrentHpOfPokemon1
		const pokemon = isPokemon1sTurn ? pokemon2 : pokemon1
		const currentHp = Math.max((pokemon?.currentHp ?? 0) - move.pp, 0)

		setCurrentHpOfPokemon(currentHp)
		toggleIsPokemon1sTurn()

		if (currentHp === 0) {
			setIsBattleEndingModalVisible(true)
			if (pokemon === pokemon2) {
				setPlayerHasWon(true)
			}
		}
	}

	function closeBattleEndingModal() {
		setIsBattleEndingModalVisible(false)
	}

	useEffect(() => {
		async function fetchPokemon() {
			let isOutdated = false

			try {
				const pikachu = await getPokemon('pikachu')
				const squirtle = await getPokemon('squirtle')
				if (!isOutdated) {
					setPokemon1(pikachu)
					setPokemon2(squirtle)
				}
			} catch (exception) {
				console.log('error fetching pokemon', exception)
			}

			return () => (isOutdated = true)
		}

		fetchPokemon()
	}, [])

	return (
		<>
			<Row gutter={32}>
				<Col span={12}>
					{pokemon1 && <PokemonCard pokemon={pokemon1} onMove={makeMove} isActive={isPokemon1sTurn} />}
				</Col>
				<Col span={12}>
					{pokemon2 && <PokemonCard pokemon={pokemon2} onMove={makeMove} isActive={!isPokemon1sTurn} />}
				</Col>
			</Row>
			<BattleEndingModal
				isVisible={isBattleEndingModalVisible}
				onClose={closeBattleEndingModal}
				// eslint-disable-next-line @typescript-eslint/no-empty-function
				onNewFight={() => {}}
				playerHasWon={playerHasWon}
			/>
		</>
	)
}
