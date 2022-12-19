import { useCallback } from 'react'
import { Move } from '../models/move'
import { Pokemon } from '../models/pokemon'
import { Store } from '../models/store'
import { advanceFight, INITIAL_FIGHT_STATE } from './useUseReducerStore'
import { atom, useAtom } from 'jotai'

// https://jotai.org/docs/basics/comparison

const fightState = atom(INITIAL_FIGHT_STATE)
/*
 * You can select (computed) parts of other atoms. This can even be asynchronous operations (e.g.
 * fetching something from a database) - then you should wrap the corresponding component
 * in <React.Suspense> (and an error boundary) or use 'loadable()'.
 * You can also define a setter here (even an asynchronous one!)
 */
const pokemon1State = atom((get) => get(fightState).pokemon1)

export function useJotaiStore(): Store {
	const [fight, setFight] = useAtom(fightState) // there are also write-/read-only variants

	const setPokemon = useCallback(
		(pokemon1?: Pokemon, pokemon2?: Pokemon) => setFight((fight) => ({ ...fight, pokemon1, pokemon2 })),
		[setFight]
	)

	const makeMove = useCallback((move: Move) => setFight((fight) => ({ ...advanceFight(fight, move.pp) })), [setFight])

	const resetFight = useCallback(
		(pokemon1?: Pokemon, pokemon2?: Pokemon) =>
			setFight({ pokemon1, pokemon2, isPokemon1sTurn: true, pokemon1HasWon: false }),
		[setFight]
	)

	return {
		...fight,
		pokemon1: useAtom(pokemon1State)[0], // showcase derived atom
		setPokemon,
		makeMove,
		resetFight,
	}
}
