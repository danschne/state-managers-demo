import { act, render, screen } from '@testing-library/react'
import { createMemoryRouter, RouteObject } from 'react-router-dom'
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
// jest.doMock('react-router-dom', () => ({
// 	...jest.requireActual('react-router-dom'),
// 	createBrowserRouter: (routes: RouteObject[]) =>
// 		createMemoryRouter(routes, {
// 			initialEntries: ['/unknown/path'],
// 			initialIndex: 0,
// 		}),
// }))

describe('App', () => {
	it.only('should redirect to first menu entry when landing at "/"', async () => {
		await act(async () => render(<App />))

		expect(window.location.pathname).toBe(MENU_ENTRIES[0].path)
	})

	it('should show 404 for unknown paths', async () => {
		await act(async () => {
			render(
				// <MemoryRouter initialEntries={['/unknown/path']}>
				<App />
			)
		})

		expect(screen.getByText('404')).toBeInTheDocument()
	})
})
