import { Col, Menu, Row } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { PokemonFight } from '../../pokemon/components/PokemonFight/PokemonFight'
import { ReactReduxStoreProvider, useReactReduxStore } from '../../pokemon/hooks/useReactReduxStore'
import { ReduxToolkitStoreProvider, useReduxToolkitStore } from '../../pokemon/hooks/useReduxToolkitStore'
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
			<ReactReduxStoreProvider>
				<PokemonFight useStore={useReactReduxStore} />
			</ReactReduxStoreProvider>
		),
	},
	{
		path: '/redux-toolkit',
		label: 'Redux Toolkit',
		content: (
			<ReduxToolkitStoreProvider>
				<PokemonFight useStore={useReduxToolkitStore} />
			</ReduxToolkitStoreProvider>
		),
	},
	{
		path: '/easy-peasy',
		label: 'Easy Peasy',
		// https://easy-peasy.dev/
		content: <Placeholder text='Easy Peasy' />,
	},
	{
		path: '/zustand',
		label: 'Zustand',
		// https://github.com/pmndrs/zustand
		content: <Placeholder text='Zustand' />,
	},
	{
		path: '/hookstate',
		label: 'Hookstate',
		// https://hookstate.js.org/
		content: <Placeholder text='Hookstate' />,
	},
	{
		path: '/jotai',
		label: 'Jotai',
		// https://jotai.org/
		content: <Placeholder text='Jotai' />,
	},
	{
		path: '/recoil',
		label: 'Recoil',
		// https://recoiljs.org/
		content: <Placeholder text='Recoil' />,
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
