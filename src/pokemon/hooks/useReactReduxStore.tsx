import { PropsWithChildren, useCallback } from 'react'
import { createStore, Store as ReduxStore } from 'redux'
import { useSelector, useDispatch, Provider } from 'react-redux'
import { Pokemon } from '../models/pokemon'
import { Action, fightReducer, FightState, INITIAL_FIGHT_STATE } from './useUseReducerStore'
import { Store } from '../models/store'

function reducer(state: FightState = INITIAL_FIGHT_STATE, action: Action) {
	return fightReducer(state, action)
}

export function createReactReduxStore() {
	return createStore(reducer)
}

export const reactReduxStore = createReactReduxStore()

interface ReactReduxStoreProviderProperties extends PropsWithChildren {
	key?: React.Key | null
	store: ReduxStore<FightState, Action>
}

export function ReactReduxStoreProvider({ key, store, children }: ReactReduxStoreProviderProperties) {
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
