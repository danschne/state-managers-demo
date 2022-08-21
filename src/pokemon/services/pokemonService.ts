import axios from 'axios'
import { Move } from '../models/move'
import { getHp, Pokemon, ShallowPokemon } from '../models/pokemon'
// import _ from "lodash";

export async function getPokemon(name: string) {
	const { data: shallowPokemon } = await axios.get<ShallowPokemon>(`https://pokeapi.co/api/v2/pokemon/${name}`)

	const moves: Move[] = []
	for (const { move: shallowMove } of getFirstXValues(
		4,
		shallowPokemon.moves
		// _.shuffle(shallowPokemon.moves)
	)) {
		const { data: move } = await axios.get<Move>(shallowMove.url)
		moves.push(move)
	}

	return createPokemon(shallowPokemon, moves)
}

function getFirstXValues<T>(x: number, array: T[]) {
	const values: T[] = []

	for (let i = 0; i < x; i++) {
		values.push(array[i])
	}

	return values
}

function createPokemon(shallowPokemon: ShallowPokemon, moves: Move[]): Pokemon {
	return {
		id: shallowPokemon.id,
		name: shallowPokemon.name,
		sprites: shallowPokemon.sprites,
		stats: shallowPokemon.stats,
		moves,
		currentHp: getHp(shallowPokemon)?.base_stat,
	}
}
