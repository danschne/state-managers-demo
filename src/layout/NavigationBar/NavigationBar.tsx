import { Col, Menu, Row } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { PokemonFight } from '../../pokemon/components/PokemonFight/PokemonFight'
import { reactReduxStore, ReactReduxStoreProvider, useReactReduxStore } from '../../pokemon/hooks/useReactReduxStore'
import { useUseReducerStore } from '../../pokemon/hooks/useUseReducerStore'
import { useUseStateStore } from '../../pokemon/hooks/useUseStateStore'
import { Placeholder } from '../Placeholder/Placeholder'
import styles from './NavigationBar.module.scss'

const LOGO = '🕺💃❤🎓'

interface MenuEntry {
	path: string
	label: string
	content: JSX.Element
}

export const MENU_ENTRIES: MenuEntry[] = [
	{
		path: '/use-state',
		label: 'useState',
		content: <PokemonFight key={'useState'} useStore={useUseStateStore} />,
	},
	{
		path: '/use-reducer',
		label: 'useReducer',
		content: <PokemonFight key={'useReducer'} useStore={useUseReducerStore} />,
	},
	{
		path: '/react-redux',
		label: 'React Redux',
		content: (
			<ReactReduxStoreProvider key={'React Redux'} store={reactReduxStore}>
				<PokemonFight useStore={useReactReduxStore} />
			</ReactReduxStoreProvider>
		),
	},
	{
		path: '/redux-toolkit',
		label: 'Redux Toolkit',
		// https://redux-toolkit.js.org/
		content: <Placeholder text='Redux Toolkit' />,
	},
	{
		path: '/easy-peasy',
		label: 'Easy Peasy',
		// https://easy-peasy.dev/
		content: <Placeholder text='Easy Peasy' />,
	},
]

const ITEMS = MENU_ENTRIES.map((entry) => {
	return {
		key: entry.path,
		label: entry.label,
	}
})

export function NavigationBar() {
	const { pathname } = useLocation()
	const navigateTo = useNavigate()

	return (
		<Row>
			<Col className={styles.logo}>{LOGO}</Col>
			<Col flex='auto'>
				<Menu
					items={ITEMS}
					mode='horizontal'
					theme='dark'
					selectedKeys={[pathname]}
					className={styles.menu}
					onSelect={({ key }) => navigateTo(key)}
				/>
			</Col>
		</Row>
	)
}
