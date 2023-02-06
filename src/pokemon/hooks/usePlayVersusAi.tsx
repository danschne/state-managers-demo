import { MessageType } from 'antd/es/message/interface'
import _ from 'lodash'
import { useEffect } from 'react'
import { Move } from '../models/move'
import { Pokemon } from '../models/pokemon'

interface UsePlayVersusAiProperties {
	isActivated: boolean
	pokemon1?: Pokemon
	pokemon2?: Pokemon
	isPokemon1sTurn: boolean
	showMoveMessage: (move: Move) => MessageType
	makeMove: (move: Move) => void
}

export function usePlayVersusAi({
	isActivated,
	pokemon1,
	pokemon2,
	isPokemon1sTurn,
	showMoveMessage,
	makeMove,
}: UsePlayVersusAiProperties) {
	useEffect(() => {
		if (!isActivated || fightIsOver(pokemon1, pokemon2) || isPokemon1sTurn || !pokemon2) {
			return
		}

		const move = getRandomMove(pokemon2)
		const timeout = setTimeout(() => showMoveMessage(move).then(() => makeMove(move)), 1000)

		return () => clearTimeout(timeout)
	}, [isActivated, pokemon1, pokemon2, isPokemon1sTurn, makeMove, showMoveMessage])
}

function fightIsOver(pokemon1?: Pokemon, pokemon2?: Pokemon) {
	return pokemon1?.currentHp === 0 || pokemon2?.currentHp === 0
}

function getRandomMove(pokemon: Pokemon) {
	return pokemon.moves[_.random(0, 3)]
}
