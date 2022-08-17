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
}
