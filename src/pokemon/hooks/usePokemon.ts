import { useState } from 'react'
import { Pokemon } from '../models/pokemon'

export function usePokemon(initialPokemon?: Pokemon) {
	return useState(initialPokemon)
}
