import { act, render, screen } from '@testing-library/react'
import { useUseStateStore } from '../../hooks/useUseStateStore'
import { Pokemon } from '../../models/pokemon'
import { get2RandomPokemon } from '../../services/pokemonService'
import { pikachu, squirtle } from '../../testData/testPokemon'
import { PokemonFight } from './PokemonFight'

jest.mock('../../services/pokemonService')

const mockedGet2RandomPokemon = get2RandomPokemon as jest.Mock

describe('PokemonFight', () => {
	beforeEach(() => {
		mockedGet2RandomPokemon.mockResolvedValue([pikachu, squirtle])
	})

	const stateManagementOptions = [{ name: 'useState', useStore: useUseStateStore }]

	stateManagementOptions.forEach(({ name, useStore }) => {
		describe(`with ${name}`, () => {
			it('should render the fight pikachu vs. squirtle', async () => {
				await act(async () => {
					render(<PokemonFight useStore={useStore} />)
				})

				checkExpectedContentForPokemon(pikachu)
				checkExpectedContentForPokemon(squirtle)
			})

			// TODO: make a move that doesn't kill -> moves should be disabled

			// TODO: make a move that doesn't kill -> reset -> moves should still be enabled

			// TODO: make a move that kills -> result modal should be shown
		})
	})
})

function checkExpectedContentForPokemon(pokemon: Pokemon) {
	expect(screen.getByAltText(pokemon.name, { exact: false })).toBeInTheDocument()
	expect(screen.getByText(pokemon.name)).toBeInTheDocument()
	expect(screen.getByTestId(`hp-bar-${pokemon.name}`)).toBeInTheDocument()
	pokemon.moves.forEach((move) => {
		const moveButtons = screen.getAllByRole('button', { name: move.name })
		expect(moveButtons.length).toBeGreaterThanOrEqual(1)
	})
}
