import { message } from 'antd'
import _ from 'lodash'
import { useEffect } from 'react'
import { MoveInfoMessage } from '../atoms/MoveInfoMessage/MoveInfoMessage'
import { Move } from '../models/move'
import { Pokemon } from '../models/pokemon'

interface UsePlayVersusAiProperties {
	isActivated: boolean
	pokemon1?: Pokemon
	pokemon2?: Pokemon
	isPokemon1sTurn: boolean
	makeMove: (move: Move) => void
}

export function usePlayVersusAi({
	isActivated,
	pokemon1,
	pokemon2,
	isPokemon1sTurn,
	makeMove,
}: UsePlayVersusAiProperties) {
	useEffect(() => {
		if (!isActivated || fightIsOver(pokemon1, pokemon2) || isPokemon1sTurn || !pokemon2) {
			return
		}

		const move = getRandomMove(pokemon2)
		const timeout = setTimeout(() => {
			message
				.open({
					content: <MoveInfoMessage pokemon={pokemon2} move={move} />,
					duration: 1.5,
					style: {
						marginTop: '30vh',
					},
				})
				.then(() => makeMove(move))
		}, 1000)

		return () => clearTimeout(timeout)
	}, [isActivated, pokemon1, pokemon2, isPokemon1sTurn, makeMove])
}

function fightIsOver(pokemon1?: Pokemon, pokemon2?: Pokemon) {
	return pokemon1?.currentHp === 0 || pokemon2?.currentHp === 0
}

function getRandomMove(pokemon: Pokemon) {
	return pokemon.moves[_.random(0, 3)]
}
