import { act, render, screen } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { App } from './App'
import { MENU_ENTRIES } from './layout/NavigationBar/NavigationBar'
import { getPokemon } from './pokemon/services/pokemonService'
import { pikachu } from './pokemon/testData/examplePokemon'

jest.mock('./pokemon/services/pokemonService')

const mockedGetPokemon = getPokemon as jest.Mock

describe('App', () => {
	beforeEach(() => {
		mockedGetPokemon.mockResolvedValue(pikachu)
	})

	it('should render', async () => {
		await act(async () => {
			render(
				<BrowserRouter>
					<App />
				</BrowserRouter>
			)
		})
	})

	it('should redirect to first menu entry when landing at "/"', async () => {
		await act(async () => {
			render(
				<BrowserRouter>
					<App />
				</BrowserRouter>
			)
		})

		expect(window.location.pathname).toBe(MENU_ENTRIES[0].path)
	})

	it('should show 404 for unknown paths', async () => {
		await act(async () => {
			render(
				<MemoryRouter initialEntries={['/unknown/path']}>
					<App />
				</MemoryRouter>
			)
		})

		expect(screen.getByText('404')).toBeInTheDocument()
	})
})
