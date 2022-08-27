import { Pokemon } from './pokemon'

export interface Store {
	pokemon1?: Pokemon
	pokemon2?: Pokemon
	setPokemon: (pokemon1?: Pokemon, pokemon2?: Pokemon) => void
	isPokemon1sTurn: boolean
	pokemon1HasWon: boolean
	advanceFight: (movePower: number) => void
	resetFight: (pokemon1?: Pokemon, pokemon2?: Pokemon) => void
}
