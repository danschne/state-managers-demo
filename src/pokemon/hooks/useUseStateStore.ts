import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { Move } from '../models/move'
import { Pokemon } from '../models/pokemon'
import { Store } from '../models/store'

export function useUseStateStore(): Store {
	const [pokemon1, setPokemon1] = useState<Pokemon>()
	const [pokemon2, setPokemon2] = useState<Pokemon>()
	const [isPokemon1sTurn, setIsPokemon1sTurn] = useState(true)
	const [pokemon1HasWon, setPokemon1HasWon] = useState(false)

	const setPokemon = useCallback((pokemon1?: Pokemon, pokemon2?: Pokemon) => {
		setPokemon1(pokemon1)
		setPokemon2(pokemon2)
	}, [])

	const makeMove = useCallback(
		(move: Move) => {
			const pokemon = isPokemon1sTurn ? pokemon2 : pokemon1
			const currentHp = Math.max((pokemon?.currentHp ?? 0) - move.pp, 0)

			setCurrentHp(currentHp, isPokemon1sTurn ? setPokemon2 : setPokemon1)
			setIsPokemon1sTurn((previous) => !previous)

			if (currentHp === 0 && pokemon === pokemon2) {
				setPokemon1HasWon(true)
			}
		},
		[isPokemon1sTurn, pokemon1, pokemon2]
	)

	const resetFight = useCallback(
		(pokemon1?: Pokemon, pokemon2?: Pokemon) => {
			setPokemon(pokemon1, pokemon2)
			setIsPokemon1sTurn(true)
			setPokemon1HasWon(false)
		},
		[setPokemon]
	)

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

	return {
		pokemon1,
		pokemon2,
		isPokemon1sTurn,
		pokemon1HasWon,
		setPokemon,
		makeMove,
		resetFight,
	}
}
