import { PropsWithChildren, useCallback, useMemo } from 'react'
import { configureStore, createAction, createReducer } from '@reduxjs/toolkit'
import { useSelector, useDispatch, Provider } from 'react-redux'
import { Pokemon } from '../models/pokemon'
import { advanceFight, FightState, INITIAL_FIGHT_STATE } from './useUseReducerStore'
import { Store } from '../models/store'
import { Move } from '../models/move'

const setPokemon = createAction<{ pokemon1?: Pokemon; pokemon2?: Pokemon }>('setPokemon')
const advance = createAction<number>('advance')
const reset = createAction<{ pokemon1?: Pokemon; pokemon2?: Pokemon }>('reset')

const reducer = createReducer(INITIAL_FIGHT_STATE, (builder) => {
	builder
		.addCase(setPokemon, (state, action) => {
			// State can be modified in a mutable manner, because Immer is used under the hood.
			state.pokemon1 = action.payload.pokemon1
			state.pokemon2 = action.payload.pokemon2
		})
		.addCase(advance, (state, action) => advanceFight(state, action.payload))
		.addCase(reset, (_state, action) => ({
			...INITIAL_FIGHT_STATE,
			pokemon1: action.payload.pokemon1,
			pokemon2: action.payload.pokemon2,
		}))
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		.addDefaultCase(() => {})
})

export function ReduxToolkitStoreProvider({ children }: PropsWithChildren) {
	/*
	 * This is probably not a good practice since you generally only want to have one kind
	 * of store in your app and thus can make it a global instance, but for the sake of this
	 * demo it is convenient to confine the different state management options.
	 */
	const store = useMemo(() => configureStore({ reducer }), [])

	return <Provider store={store}>{children}</Provider>
}

export function useReduxToolkitStore(): Store {
	const state = useSelector((state: FightState) => state)
	const dispatch = useDispatch()

	return {
		...state,
		setPokemon: useCallback(
			(pokemon1?: Pokemon, pokemon2?: Pokemon) => dispatch(setPokemon({ pokemon1, pokemon2 })),
			[dispatch]
		),
		makeMove: useCallback((move: Move) => dispatch(advance(move.pp)), [dispatch]),
		resetFight: useCallback(
			(pokemon1?: Pokemon, pokemon2?: Pokemon) => dispatch(reset({ pokemon1, pokemon2 })),
			[dispatch]
		),
	}
}
