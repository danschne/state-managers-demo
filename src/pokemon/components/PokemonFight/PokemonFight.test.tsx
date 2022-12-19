import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoilRoot } from 'recoil'
import { EasyPeasyStoreProvider, useEasyPeasyStore } from '../../hooks/useEasyPeasyStore'
import { useHookstateStore } from '../../hooks/useHookstateStore'
import { useJotaiStore } from '../../hooks/useJotaiStore'
import { ReactReduxStoreProvider, useReactReduxStore } from '../../hooks/useReactReduxStore'
import { useRecoilStore } from '../../hooks/useRecoilStore'
import { ReduxToolkitStoreProvider, useReduxToolkitStore } from '../../hooks/useReduxToolkitStore'
import { useUseReducerStore } from '../../hooks/useUseReducerStore'
import { useUseStateStore } from '../../hooks/useUseStateStore'
import { useZustandStore } from '../../hooks/useZustandStore'
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

	const stateManagementOptions = [
		{ name: 'useState', useStore: useUseStateStore },
		{ name: 'useReducer', useStore: useUseReducerStore },
		{
			name: 'React Redux',
			useStore: useReactReduxStore,
			StoreProvider: ReactReduxStoreProvider,
		},
		{
			name: 'Redux Toolkit',
			useStore: useReduxToolkitStore,
			StoreProvider: ReduxToolkitStoreProvider,
		},
		{
			name: 'Easy Peasy',
			useStore: useEasyPeasyStore,
			StoreProvider: EasyPeasyStoreProvider,
		},
		{ name: 'Zustand', useStore: useZustandStore },
		{ name: 'Hookstate', useStore: useHookstateStore },
		{ name: 'Recoil', useStore: useRecoilStore, StoreProvider: RecoilRoot },
		{ name: 'Jotai', useStore: useJotaiStore },
	]
	stateManagementOptions.forEach(({ name, useStore, StoreProvider }) => {
		describe(`with ${name}`, () => {
			const underTest = StoreProvider ? (
				<StoreProvider>
					<PokemonFight useStore={useStore} versusAi={false} />
				</StoreProvider>
			) : (
				<PokemonFight useStore={useStore} versusAi={false} />
			)

			it('should render the fight pikachu vs. squirtle', async () => {
				await act(async () => {
					render(underTest)
				})

				checkExpectedContentForPokemon(pikachu)
				checkExpectedContentForPokemon(squirtle)
			})

			it("should disable player 1's moves after attacking", async () => {
				const user = userEvent.setup()

				await act(async () => {
					render(underTest)
				})
				const tacklePikachu = screen.getAllByRole('button', { name: 'tackle' })[0]
				await user.click(tacklePikachu)

				expect(tacklePikachu).toBeDisabled()
			})

			it('should reset the fight when clicking on "New fight"', async () => {
				const user = userEvent.setup()

				await act(async () => {
					render(underTest)
				})
				const tacklePikachu = screen.getAllByRole('button', { name: 'tackle' })[0]
				await user.click(tacklePikachu)
				await user.click(screen.getByRole('button', { name: 'New fight' }))

				expect(tacklePikachu).toBeEnabled()
			})

			it('should show positive result screen when winning the fight', async () => {
				const user = userEvent.setup()

				await act(async () => {
					render(underTest)
				})
				await user.click(screen.getByRole('button', { name: 'thunder shock' }))

				expect(screen.getByText('Congratulations, you won the fight!')).toBeInTheDocument()
			})
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
