import { PropsWithChildren, useCallback, useMemo } from 'react'
import { createStore } from 'redux'
import { useSelector, useDispatch, Provider } from 'react-redux'
import { Pokemon } from '../models/pokemon'
import { Action, fightReducer, FightState, INITIAL_FIGHT_STATE } from './useUseReducerStore'
import { Store } from '../models/store'

function reducer(state: FightState = INITIAL_FIGHT_STATE, action: Action) {
	return fightReducer(state, action)
}

interface ReactReduxStoreProviderProperties extends PropsWithChildren {
	key?: React.Key | null
}

export function ReactReduxStoreProvider({ key, children }: ReactReduxStoreProviderProperties) {
	/*
	 * This is probably not a good practice since you generally only want to have one kind
	 * of store in your app and thus can make it a global instance, but for the sake of this
	 * demo it is convienent to confine the different store options.
	 */
	const store = useMemo(() => createStore(reducer), [])

	return (
		<Provider key={key} store={store}>
			{children}
		</Provider>
	)
}

export function useReactReduxStore(): Store {
	const state = useSelector((state: FightState) => state)
	const dispatch = useDispatch()

	const setPokemon = useCallback(
		(pokemon1?: Pokemon, pokemon2?: Pokemon) => dispatch({ type: 'setPokemon', pokemon1, pokemon2 }),
		[dispatch]
	)

	return {
		...state,
		setPokemon,
		advanceFight: (movePower: number) => dispatch({ type: 'advance', movePower }),
		resetFight: (pokemon1?: Pokemon, pokemon2?: Pokemon) => dispatch({ type: 'reset', pokemon1, pokemon2 }),
	}
}
