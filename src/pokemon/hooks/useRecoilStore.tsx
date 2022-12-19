import { useCallback } from 'react'
import { Move } from '../models/move'
import { Pokemon } from '../models/pokemon'
import { Store } from '../models/store'
import { atom, selector, SetterOrUpdater, useRecoilState, useRecoilValue } from 'recoil'

/*
 * In addition to React's useEffect(), atoms can also have effects. Since these are defined
 * outside of components, use casese would be e.g. logging something on each state change.
 *
 * Thing to stumble over: 'If no default is provided, as opposed to a value which could include
 * null or undefined, the atom will start in a "pending" state and trigger Suspense until it is set.'
 */
const pokemon1State = atom<Pokemon | undefined>({ key: 'pokemon1', default: undefined })
/*
 * You can select parts of other atoms. This can even be asynchronous operations (e.g.
 * fetching something from a database) - then you should wrap the corresponding component
 * in <React.Suspense> (and an error boundary) or use 'useRecoilValueLoadable()'.
 */
const pokemon1ReadOnlyState = selector({ key: 'pokemon1ReadOnly', get: ({ get }) => get(pokemon1State) })
const pokemon2State = atom<Pokemon | undefined>({ key: 'pokemon2', default: undefined })
const isPokemon1sTurnState = atom({ key: 'isPokemon1sTurn', default: true })
const pokemon1HasWonState = atom({ key: 'pokemon1HasWon', default: false })

export function useRecoilStore(): Store {
	const [pokemon1, setPokemon1] = useRecoilState(pokemon1State)
	const [pokemon2, setPokemon2] = useRecoilState(pokemon2State)
	const [isPokemon1sTurn, setIsPokemon1sTurn] = useRecoilState(isPokemon1sTurnState)
	const [pokemon1HasWon, setPokemon1HasWon] = useRecoilState(pokemon1HasWonState)

	const setPokemon = useCallback(
		(pokemon1?: Pokemon, pokemon2?: Pokemon) => {
			setPokemon1(pokemon1)
			setPokemon2(pokemon2)
		},
		[setPokemon1, setPokemon2]
	)

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
		[isPokemon1sTurn, setIsPokemon1sTurn, pokemon1, setPokemon1, pokemon2, setPokemon2, setPokemon1HasWon]
	)

	const resetFight = useCallback(
		(pokemon1?: Pokemon, pokemon2?: Pokemon) => {
			setPokemon(pokemon1, pokemon2)
			setIsPokemon1sTurn(true)
			setPokemon1HasWon(false)
		},
		[setPokemon, setPokemon1HasWon, setIsPokemon1sTurn]
	)

	function setCurrentHp(hp: number, setPokemon: SetterOrUpdater<Pokemon | undefined>) {
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
		pokemon1: useRecoilValue(pokemon1ReadOnlyState), // showcase selectors
		pokemon2,
		isPokemon1sTurn,
		pokemon1HasWon,
		setPokemon,
		makeMove,
		resetFight,
	}
}
