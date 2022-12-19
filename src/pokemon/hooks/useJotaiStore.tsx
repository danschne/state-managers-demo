import { useCallback } from 'react'
import { Move } from '../models/move'
import { Pokemon } from '../models/pokemon'
import { Store } from '../models/store'
import { atom, SetStateAction, useAtom } from 'jotai'

// https://jotai.org/docs/basics/comparison

const pokemon1State = atom<Pokemon | undefined>(undefined)
/*
 * You can select (computed) parts of other atoms. This can even be asynchronous operations (e.g.
 * fetching something from a database) - then you should wrap the corresponding component
 * in <React.Suspense> (and an error boundary) or use 'loadable()'.
 * You can also define a setter here (even an asynchronous one!)
 */
const pokemon1ReadOnlyState = atom((get) => get(pokemon1State))
const pokemon2State = atom<Pokemon | undefined>(undefined)
const isPokemon1sTurnState = atom(true)
const pokemon1HasWonState = atom(false)

export function useJotaiStore(): Store {
	const [pokemon1, setPokemon1] = useAtom(pokemon1State) // there are also write-/read-only variants
	const [pokemon2, setPokemon2] = useAtom(pokemon2State)
	const [isPokemon1sTurn, setIsPokemon1sTurn] = useAtom(isPokemon1sTurnState)
	const [pokemon1HasWon, setPokemon1HasWon] = useAtom(pokemon1HasWonState)

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

	function setCurrentHp(hp: number, setPokemon: (update?: SetStateAction<Pokemon | undefined>) => void) {
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
		pokemon1: useAtom(pokemon1ReadOnlyState)[0], // showcase derived atom
		pokemon2,
		isPokemon1sTurn,
		pokemon1HasWon,
		setPokemon,
		makeMove,
		resetFight,
	}
}
