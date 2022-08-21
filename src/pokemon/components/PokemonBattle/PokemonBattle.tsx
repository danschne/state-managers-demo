import { Col, Row } from 'antd'
import { useEffect } from 'react'
import { Move } from '../../models/move'
import { Store } from '../../models/store'
import { getPokemon } from '../../services/pokemonService'
import { PokemonCard } from '../PokemonCard/PokemonCard'

interface PokemonBattleProperties {
	useStore: () => Store
}

// TODO: add a result screen and a new fight button (random new pokemon)
// TODO: wrap some things in a context (mostly relevant for children)?
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

	function makeMove(move: Move) {
		if (isPokemon1sTurn) {
			setCurrentHpOfPokemon2(Math.max((pokemon2?.currentHp ?? 0) - move.pp, 0))
		} else {
			setCurrentHpOfPokemon1(Math.max((pokemon1?.currentHp ?? 0) - move.pp, 0))
		}
		toggleIsPokemon1sTurn()
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
		<Row gutter={32}>
			<Col span={12}>{pokemon1 && <PokemonCard pokemon={pokemon1} onMove={makeMove} isActive={isPokemon1sTurn} />}</Col>
			<Col span={12}>
				{pokemon2 && <PokemonCard pokemon={pokemon2} onMove={makeMove} isActive={!isPokemon1sTurn} />}
			</Col>
		</Row>
	)
}
