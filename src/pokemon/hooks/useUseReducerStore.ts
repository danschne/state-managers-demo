import { useCallback, useReducer } from 'react'
import { Pokemon } from '../models/pokemon'
import { Store } from '../models/store'

interface FightState {
	pokemon1?: Pokemon
	pokemon2?: Pokemon
	isPokemon1sTurn: boolean
	playerHasWon: boolean
}

const INITIAL_FIGHT_STATE: FightState = {
	isPokemon1sTurn: true,
	playerHasWon: false,
}

type Action =
	| { type: 'setPokemon1'; pokemon?: Pokemon }
	| { type: 'setCurrentHpOfPokemon1'; hp: number }
	| { type: 'setPokemon2'; pokemon?: Pokemon }
	| { type: 'setCurrentHpOfPokemon2'; hp: number }
	| { type: 'toggleIsPokemon1sTurn' }
	| { type: 'setPlayerHasWon'; playerHasWon: boolean }
	| { type: 'reset'; pokemon1?: Pokemon; pokemon2?: Pokemon }

function fightReducer(state: FightState, action: Action): FightState {
	switch (action.type) {
		case 'setPokemon1':
			return {
				...state,
				pokemon1: action.pokemon,
			}
		case 'setCurrentHpOfPokemon1':
			return {
				...state,
				pokemon1: state.pokemon1 ? { ...state.pokemon1, currentHp: action.hp } : undefined,
			}
		case 'setPokemon2':
			return {
				...state,
				pokemon2: action.pokemon,
			}
		case 'setCurrentHpOfPokemon2':
			return {
				...state,
				pokemon2: state.pokemon2 ? { ...state.pokemon2, currentHp: action.hp } : undefined,
			}
		case 'toggleIsPokemon1sTurn':
			return {
				...state,
				isPokemon1sTurn: !state.isPokemon1sTurn,
			}
		case 'setPlayerHasWon':
			return {
				...state,
				playerHasWon: action.playerHasWon,
			}
		case 'reset':
			return {
				...INITIAL_FIGHT_STATE,
				pokemon1: action.pokemon1,
				pokemon2: action.pokemon2,
			}
	}
}

export function useUseReducerStore(): Store {
	const [state, dispatch] = useReducer(fightReducer, INITIAL_FIGHT_STATE)

	const setPokemon1 = useCallback((pokemon?: Pokemon) => dispatch({ type: 'setPokemon1', pokemon }), [])

	const setPokemon2 = useCallback((pokemon?: Pokemon) => dispatch({ type: 'setPokemon2', pokemon }), [])

	return {
		...state,
		setPokemon1,
		setCurrentHpOfPokemon1: (hp: number) => dispatch({ type: 'setCurrentHpOfPokemon1', hp }),
		setPokemon2,
		setCurrentHpOfPokemon2: (hp: number) => dispatch({ type: 'setCurrentHpOfPokemon2', hp }),
		toggleIsPokemon1sTurn: () => dispatch({ type: 'toggleIsPokemon1sTurn' }),
		setPlayerHasWon: (playerHasWon: boolean) => dispatch({ type: 'setPlayerHasWon', playerHasWon }),
		resetFightState: (pokemon1?: Pokemon, pokemon2?: Pokemon) => dispatch({ type: 'reset', pokemon1, pokemon2 }),
	}
}
