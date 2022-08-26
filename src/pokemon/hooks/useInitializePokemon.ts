import { useEffect } from 'react'
import { Pokemon } from '../models/pokemon'
import { get2RandomPokemon } from '../services/pokemonService'

export function useInitializePokemon(
	setPokemon1: (pokemon?: Pokemon) => void,
	setPokemon2: (pokemon?: Pokemon) => void
) {
	useEffect(() => {
		let isOutdated = false

		async function initializeFight() {
			const [randomPokemon1, randomPokemon2] = await get2RandomPokemon()
			if (!isOutdated && randomPokemon1 && randomPokemon2) {
				setPokemon1(randomPokemon1)
				setPokemon2(randomPokemon2)
			}
		}

		initializeFight()
		return () => {
			isOutdated = true
		}
	}, [setPokemon1, setPokemon2])
}
