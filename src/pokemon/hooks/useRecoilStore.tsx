import { useCallback } from 'react'
import { Move } from '../models/move'
import { Pokemon } from '../models/pokemon'
import { Store } from '../models/store'
import { advanceFight, INITIAL_FIGHT_STATE } from './useUseReducerStore'
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil'

/*
 * In addition to React's useEffect(), atoms can also have effects. Since these are defined
 * outside of components, use casese would be e.g. logging something on each state change.
 */
const fightState = atom({ key: 'fight', default: INITIAL_FIGHT_STATE })
/*
 * You can select parts of other atoms. This can even be asynchronous operations (e.g.
 * fetching something from a database) - then you should wrap the corresponding component
 * in <React.Suspense> (and an error boundary) or use 'useRecoilValueLoadable()'.
 */
const pokemon1State = selector({ key: 'pokemon1', get: ({ get }) => get(fightState).pokemon1 })

export function useRecoilStore(): Store {
	const [fight, setFight] = useRecoilState(fightState) // there are also write-/read-only variants

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
		pokemon1: useRecoilValue(pokemon1State), // showcase selectors
		setPokemon,
		makeMove,
		resetFight,
	}
}
