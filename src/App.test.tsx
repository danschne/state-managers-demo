import { act, render, screen } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { App } from './App'
import { MENU_ENTRIES } from './layout/NavigationBar/NavigationBar'
import { Placeholder } from './layout/Placeholder/Placeholder'

jest.doMock('./layout/NavigationBar/NavigationBar', () => ({
	...jest.requireActual('./layout/NavigationBar/NavigationBar'),
	MENU_ENTRIES: [
		{
			path: '/path1',
			label: 'Label 1',
			content: <Placeholder text='Content 1' />,
		},
	],
}))

describe('App', () => {
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
