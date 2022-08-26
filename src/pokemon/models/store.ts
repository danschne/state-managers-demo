import { Pokemon } from './pokemon'

export interface Store {
	pokemon1?: Pokemon
	setPokemon1: (pokemon?: Pokemon) => void
	setCurrentHpOfPokemon1: (hp: number) => void
	pokemon2?: Pokemon
	setPokemon2: (pokemon?: Pokemon) => void
	setCurrentHpOfPokemon2: (hp: number) => void
	isPokemon1sTurn: boolean
	toggleIsPokemon1sTurn: () => void
	playerHasWon: boolean
	setPlayerHasWon: (playerHasWon: boolean) => void
	resetFightState: () => void
}
