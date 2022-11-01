import { useCallback, useReducer } from 'react'
import { Move } from '../models/move'
import { Pokemon } from '../models/pokemon'
import { Store } from '../models/store'

export interface FightState {
	pokemon1?: Pokemon
	pokemon2?: Pokemon
	isPokemon1sTurn: boolean
	pokemon1HasWon: boolean
}

export const INITIAL_FIGHT_STATE: FightState = {
	isPokemon1sTurn: true,
	pokemon1HasWon: false,
}

export type Action =
	| { type: 'setPokemon'; pokemon1?: Pokemon; pokemon2?: Pokemon }
	| { type: 'advance'; movePower: number }
	| { type: 'reset'; pokemon1?: Pokemon; pokemon2?: Pokemon }

export function fightReducer(state: FightState, action: Action): FightState {
	switch (action.type) {
		case 'setPokemon':
			return {
				...state,
				pokemon1: action.pokemon1,
				pokemon2: action.pokemon2,
			}
		case 'advance':
			return advanceFight(state, action.movePower)
		case 'reset':
			return {
				...INITIAL_FIGHT_STATE,
				pokemon1: action.pokemon1,
				pokemon2: action.pokemon2,
			}
		default:
			return state
	}
}

export function advanceFight(state: FightState, movePower: number): FightState {
	const { pokemon1, pokemon2, isPokemon1sTurn } = state
	const pokemon = isPokemon1sTurn ? pokemon2 : pokemon1
	const currentHp = Math.max((pokemon?.currentHp ?? 0) - movePower, 0)

	return {
		pokemon1: pokemon === pokemon2 ? pokemon1 : reduceHp(currentHp, pokemon1),
		pokemon2: pokemon === pokemon1 ? pokemon2 : reduceHp(currentHp, pokemon2),
		isPokemon1sTurn: !isPokemon1sTurn,
		pokemon1HasWon: currentHp === 0 && pokemon === pokemon2,
	}
}

function reduceHp(currentHp: number, pokemon?: Pokemon): Pokemon | undefined {
	if (pokemon) {
		return {
			...pokemon,
			currentHp,
		}
	}
	return undefined
}

export function useUseReducerStore(): Store {
	const [state, dispatch] = useReducer(fightReducer, INITIAL_FIGHT_STATE)

	return {
		...state,
		setPokemon: useCallback(
			(pokemon1?: Pokemon, pokemon2?: Pokemon) => dispatch({ type: 'setPokemon', pokemon1, pokemon2 }),
			[]
		),
		makeMove: useCallback((move: Move) => dispatch({ type: 'advance', movePower: move.pp }), []),
		resetFight: useCallback(
			(pokemon1?: Pokemon, pokemon2?: Pokemon) => dispatch({ type: 'reset', pokemon1, pokemon2 }),
			[]
		),
	}
}
