import { Pokemon } from '../models/pokemon'
import { tackle, thunderShock, waterGun } from './testMoves'
import { hp } from './testStats'

export const pikachu: Pokemon = {
	id: 1,
	name: 'pikachu',
	sprites: {
		front_default: '/sprites/pikachu/front_default',
	},
	stats: [
		{
			base_stat: 25,
			stat: hp,
		},
	],
	moves: [tackle, thunderShock],
	currentHp: 13,
}

export const squirtle: Pokemon = {
	id: 2,
	name: 'squirtle',
	sprites: {
		front_default: '/sprites/squirtle/front_default',
	},
	stats: [
		{
			base_stat: 32,
			stat: hp,
		},
	],
	moves: [tackle, waterGun],
	currentHp: 15,
}
