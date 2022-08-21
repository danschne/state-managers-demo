import { Dispatch, SetStateAction, useState } from 'react'
import { Pokemon } from '../models/pokemon'
import { Store } from '../models/store'

export function useUseStateStore(): Store {
	const [pokemon1, setPokemon1] = useState<Pokemon>()
	const [pokemon2, setPokemon2] = useState<Pokemon>()
	const [isPokemon1sTurn, setIsPokemon1sTurn] = useState(true)

	function setCurrentHp(hp: number, setPokemon: Dispatch<SetStateAction<Pokemon | undefined>>) {
		setPokemon((previous) => {
			if (previous) {
				return {
					...previous,
					currentHp: hp,
				}
			}
		})
	}

	function toggleIsPokemon1sTurn() {
		setIsPokemon1sTurn((previous) => !previous)
	}

	return {
		pokemon1,
		setPokemon1,
		setCurrentHpOfPokemon1: (hp: number) => setCurrentHp(hp, setPokemon1),
		pokemon2,
		setPokemon2,
		setCurrentHpOfPokemon2: (hp: number) => setCurrentHp(hp, setPokemon2),
		isPokemon1sTurn,
		toggleIsPokemon1sTurn,
	}
}
