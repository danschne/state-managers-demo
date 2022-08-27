import { useEffect } from 'react'
import { Pokemon } from '../models/pokemon'
import { get2RandomPokemon } from '../services/pokemonService'

export function useInitializePokemon(setPokemon: (pokemon1?: Pokemon, pokemon2?: Pokemon) => void) {
	useEffect(() => {
		let isOutdated = false

		async function initializeFight() {
			const [randomPokemon1, randomPokemon2] = await get2RandomPokemon()
			if (!isOutdated) {
				setPokemon(randomPokemon1, randomPokemon2)
			}
		}

		initializeFight()
		return () => {
			isOutdated = true
		}
	}, [setPokemon])
}
