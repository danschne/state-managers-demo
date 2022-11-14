import { useCallback } from 'react'
import { Move } from '../models/move'
import { Pokemon } from '../models/pokemon'
import { Store } from '../models/store'
import create from 'zustand'
import { advanceFight, FightState, INITIAL_FIGHT_STATE } from './useUseReducerStore'

interface ZustandStore {
	fight: FightState
	setPokemon: (pokemon1?: Pokemon, pokemon2?: Pokemon) => void
	advance: (movePower: number) => void
	reset: (pokemon1?: Pokemon, pokemon2?: Pokemon) => void
}

const useStore = create<ZustandStore>()((set) => ({
	fight: INITIAL_FIGHT_STATE,
	/*
	 *  set()'s second parameter 'replace' per default is set to 'false' and the state set by the function
	 * is merged automatically (it is not necessary to explicitely write 'state => ({...state, fight: {...}})')
	 */
	setPokemon: (pokemon1, pokemon2) => set(({ fight }) => ({ fight: { ...fight, pokemon1, pokemon2 } })),
	// You can also do async stuff - Zustand does not care.
	advance: (movePower) => set(({ fight }) => ({ fight: advanceFight(fight, movePower) })),
	reset: (pokemon1, pokemon2) => set(() => ({ fight: { ...INITIAL_FIGHT_STATE, pokemon1, pokemon2 } })),
}))

export function useZustandStore(): Store {
	const { fight, setPokemon, advance, reset } = useStore((state) => state)

	return {
		...fight,
		setPokemon: useCallback((pokemon1?: Pokemon, pokemon2?: Pokemon) => setPokemon(pokemon1, pokemon2), [setPokemon]),
		makeMove: useCallback((move: Move) => advance(move.pp), [advance]),
		resetFight: useCallback((pokemon1?: Pokemon, pokemon2?: Pokemon) => reset(pokemon1, pokemon2), [reset]),
	}
}
