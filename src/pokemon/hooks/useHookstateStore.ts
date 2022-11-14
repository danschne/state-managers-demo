import { useCallback } from 'react'
import { Move } from '../models/move'
import { Pokemon } from '../models/pokemon'
import { Store } from '../models/store'
import { SetStateAction, useHookstate } from '@hookstate/core'

export function useHookstateStore(): Store {
	const pokemon1State = useHookstate<Pokemon | undefined>(undefined)
	const pokemon2State = useHookstate<Pokemon | undefined>(undefined)
	const isPokemon1sTurnState = useHookstate(true)
	const pokemon1HasWonState = useHookstate(false)

	const setPokemon = useCallback(
		(pokemon1?: Pokemon, pokemon2?: Pokemon) => {
			pokemon1State.set(pokemon1)
			pokemon2State.set(pokemon2)
		},
		[pokemon1State, pokemon2State]
	)

	const makeMove = useCallback(
		(move: Move) => {
			const pokemon = isPokemon1sTurnState.value ? pokemon2State.value : pokemon1State.value
			const currentHp = Math.max((pokemon?.currentHp ?? 0) - move.pp, 0)

			setCurrentHp(currentHp, isPokemon1sTurnState.value ? pokemon2State.set : pokemon1State.set)
			isPokemon1sTurnState.set((previous) => !previous)

			if (currentHp === 0 && pokemon === pokemon2State.value) {
				pokemon1HasWonState.set(true)
			}
		},
		[isPokemon1sTurnState, pokemon1State, pokemon2State, pokemon1HasWonState]
	)

	const resetFight = useCallback(
		(pokemon1?: Pokemon, pokemon2?: Pokemon) => {
			setPokemon(pokemon1, pokemon2)
			isPokemon1sTurnState.set(true)
			pokemon1HasWonState.set(false)
		},
		[setPokemon, isPokemon1sTurnState, pokemon1HasWonState]
	)

	function setCurrentHp(hp: number, setPokemon: (pokemon: SetStateAction<Pokemon | undefined>) => void) {
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
		pokemon1: pokemon1State.value,
		pokemon2: pokemon2State.value,
		setPokemon,
		isPokemon1sTurn: isPokemon1sTurnState.value,
		pokemon1HasWon: pokemon1HasWonState.value,
		makeMove,
		resetFight,
	}
}
