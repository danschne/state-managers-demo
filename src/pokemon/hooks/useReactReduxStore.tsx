import { PropsWithChildren, useCallback, useMemo } from 'react'
import { createStore } from 'redux'
import { useSelector, useDispatch, Provider } from 'react-redux'
import { Pokemon } from '../models/pokemon'
import { Action, fightReducer, FightState, INITIAL_FIGHT_STATE } from './useUseReducerStore'
import { Store } from '../models/store'
import { Move } from '../models/move'

function reducer(state: FightState = INITIAL_FIGHT_STATE, action: Action) {
	return fightReducer(state, action)
}

export function ReactReduxStoreProvider({ children }: PropsWithChildren) {
	/*
	 * This is probably not a good practice since you generally only want to have one kind
	 * of store in your app and thus can make it a global instance, but for the sake of this
	 * demo it is convenient to confine the different state management options.
	 */
	const store = useMemo(() => createStore(reducer), [])

	return <Provider store={store}>{children}</Provider>
}

export function useReactReduxStore(): Store {
	const state = useSelector((state: FightState) => state)
	const dispatch = useDispatch()

	return {
		...state,
		setPokemon: useCallback(
			(pokemon1?: Pokemon, pokemon2?: Pokemon) => dispatch({ type: 'setPokemon', pokemon1, pokemon2 }),
			[dispatch]
		),
		makeMove: useCallback((move: Move) => dispatch({ type: 'advance', movePower: move.pp }), [dispatch]),
		resetFight: useCallback(
			(pokemon1?: Pokemon, pokemon2?: Pokemon) => dispatch({ type: 'reset', pokemon1, pokemon2 }),
			[dispatch]
		),
	}
}
