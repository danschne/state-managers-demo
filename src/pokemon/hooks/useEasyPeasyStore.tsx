import { PropsWithChildren, useCallback, useMemo } from 'react'
import { createStore, StoreProvider, action, Action, createTypedHooks } from 'easy-peasy'
import { Move } from '../models/move'
import { Pokemon } from '../models/pokemon'
import { Store } from '../models/store'
import { advanceFight, FightState, INITIAL_FIGHT_STATE } from './useUseReducerStore'

interface EasyPeasyStore {
	fight: FightState
	setPokemon: Action<EasyPeasyStore, { pokemon1?: Pokemon; pokemon2?: Pokemon }>
	advance: Action<EasyPeasyStore, number>
	reset: Action<EasyPeasyStore, { pokemon1?: Pokemon; pokemon2?: Pokemon }>
}

export function EasyPeasyStoreProvider({ children }: PropsWithChildren) {
	/*
	 * This is probably not a good practice since you generally only want to have one kind
	 * of store in your app and thus can make it a global instance, but for the sake of this
	 * demo it is convenient to confine the different state management options.
	 */
	const store = useMemo(
		() =>
			createStore<EasyPeasyStore>({
				fight: INITIAL_FIGHT_STATE,
				// Do not destructure state here, because this breaks the proxy from Immer.
				setPokemon: action((state, { pokemon1, pokemon2 }) => {
					// State can be modified in a mutable manner, because Immer is used under the hood.
					state.fight.pokemon1 = pokemon1
					state.fight.pokemon2 = pokemon2
				}),
				/*
				 * If side effects would be involved, use thunk(async ((actions, payload)) => { ... }))
				 * to e.g. make a call to a server and save the result using the already defined actions.
				 */
				advance: action((state, movePower) => {
					return { ...state, fight: advanceFight(state.fight, movePower) }
				}),
				reset: action((state, { pokemon1, pokemon2 }) => {
					return { ...state, fight: { ...INITIAL_FIGHT_STATE, pokemon1, pokemon2 } }
				}),
			}),
		[]
	)

	return <StoreProvider store={store}>{children}</StoreProvider>
}

const { useStoreState, useStoreActions } = createTypedHooks<EasyPeasyStore>()

export function useEasyPeasyStore(): Store {
	/*
	 * Do not return custom objects here - those break strict equality checking and therefore create unncessary
	 * useStoreState executions (it thinks the store is updating all the time, which must not be the case).
	 */
	const state = useStoreState((state) => state.fight)
	const { setPokemon, advance, reset } = useStoreActions((actions) => actions)

	return {
		...state,
		setPokemon: useCallback(
			(pokemon1?: Pokemon, pokemon2?: Pokemon) => setPokemon({ pokemon1, pokemon2 }),
			[setPokemon]
		),
		makeMove: useCallback((move: Move) => advance(move.pp), [advance]),
		resetFight: useCallback((pokemon1?: Pokemon, pokemon2?: Pokemon) => reset({ pokemon1, pokemon2 }), [reset]),
	}
}
