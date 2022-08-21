import { Col, Row } from 'antd'
import { useEffect } from 'react'
import { usePokemon } from '../../hooks/usePokemon'
import { getPokemon } from '../../services/pokemonService'
import { PokemonCard } from '../PokemonCard/PokemonCard'

export function PokemonBattle() {
	const [pokemon1, setPokemon1] = usePokemon()
	const [pokemon2, setPokemon2] = usePokemon()

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
			<Col span={12}>{pokemon1 && <PokemonCard pokemon={pokemon1} />}</Col>
			<Col span={12}>{pokemon2 && <PokemonCard pokemon={pokemon2} />}</Col>
		</Row>
	)
}
