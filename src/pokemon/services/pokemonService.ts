import axios from 'axios'
import { Move } from '../models/move'
import { getHp, Pokemon, ShallowPokemon } from '../models/pokemon'
import _ from 'lodash'

const HIGHEST_POKEMON_ID = 905

export async function get2RandomPokemon(): Promise<[Pokemon?, Pokemon?]> {
	const randomPokemon1 = await getRandomPokemon()
	const randomPokemon2 = await getRandomPokemon()

	return [randomPokemon1, randomPokemon2]
}

export async function getRandomPokemon() {
	const randomId = _.random(1, HIGHEST_POKEMON_ID)

	return getPokemon(randomId)
}

export async function getPokemon(idOrName: number | string) {
	try {
		const { data: shallowPokemon } = await axios.get<ShallowPokemon>(`https://pokeapi.co/api/v2/pokemon/${idOrName}`)

		const moves: Move[] = []
		for (const { move: shallowMove } of getFirstXValues(
			4,
			shallowPokemon.moves
			// _.shuffle(shallowPokemon.moves) // takes quite a bit of time and thus would also require a loading indicator if implemented
		)) {
			const { data: move } = await axios.get<Move>(shallowMove.url)
			moves.push(move)
		}

		return createPokemon(shallowPokemon, moves)
	} catch (exception) {
		console.log('error fetching pokemon', idOrName, exception)
		return undefined
	}
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
