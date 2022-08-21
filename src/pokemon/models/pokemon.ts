import { Move } from './move'
import { Stat } from './stat'

export interface Pokemon {
	id: number
	name: string
	sprites: {
		front_default: string
	}
	stats: {
		base_stat: number
		stat: Stat
	}[]
	moves: Move[]
	currentHp?: number
}

export interface ShallowPokemon {
	id: number
	name: string
	sprites: {
		front_default: string
	}
	stats: {
		base_stat: number
		stat: Stat
	}[]
	moves: {
		move: {
			url: string
		}
	}[]
}

export function getHp(pokemon: Pokemon | ShallowPokemon) {
	return pokemon.stats.find((stat) => stat.stat.name === 'hp')
}
