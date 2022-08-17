import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { NavigationBar, MENU_ENTRIES } from './NavigationBar'

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockNavigate,
}))

describe('NavigationBar', () => {
	it('should change path when a different menu item is selected', async () => {
		const user = userEvent.setup()

		await act(async () => {
			render(
				<MemoryRouter initialEntries={[MENU_ENTRIES[0].path]}>
					<NavigationBar />
				</MemoryRouter>
			)
		})
		await user.click(screen.getByText(MENU_ENTRIES[1].label))

		expect(mockNavigate).toHaveBeenCalledTimes(1)
		expect(mockNavigate).toHaveBeenCalledWith(MENU_ENTRIES[1].path)
	})
})
