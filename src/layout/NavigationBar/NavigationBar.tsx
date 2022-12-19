import { Col, Menu, Row } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { PokemonFight } from '../../pokemon/components/PokemonFight/PokemonFight'
import { EasyPeasyStoreProvider, useEasyPeasyStore } from '../../pokemon/hooks/useEasyPeasyStore'
import { useHookstateStore } from '../../pokemon/hooks/useHookstateStore'
import { ReactReduxStoreProvider, useReactReduxStore } from '../../pokemon/hooks/useReactReduxStore'
import { ReduxToolkitStoreProvider, useReduxToolkitStore } from '../../pokemon/hooks/useReduxToolkitStore'
import { useUseReducerStore } from '../../pokemon/hooks/useUseReducerStore'
import { useUseStateStore } from '../../pokemon/hooks/useUseStateStore'
import { useZustandStore } from '../../pokemon/hooks/useZustandStore'
import { Placeholder } from '../Placeholder/Placeholder'
import { RecoilRoot } from 'recoil'
import styles from './NavigationBar.module.scss'
import { useRecoilStore } from '../../pokemon/hooks/useRecoilStore'
import { useJotaiStore } from '../../pokemon/hooks/useJotaiStore'

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
		content: (
			<EasyPeasyStoreProvider>
				<PokemonFight useStore={useEasyPeasyStore} />
			</EasyPeasyStoreProvider>
		),
	},
	{
		path: '/zustand',
		label: 'Zustand',
		content: <PokemonFight useStore={useZustandStore} />,
	},
	{
		path: '/hookstate',
		label: 'Hookstate',
		content: <PokemonFight useStore={useHookstateStore} />,
		// content: <Placeholder text='fuck hookstate' />,
	},
	{
		path: '/recoil',
		label: 'Recoil',
		content: (
			<RecoilRoot>
				<PokemonFight useStore={useRecoilStore} />
			</RecoilRoot>
		),
	},
	{
		path: '/jotai',
		label: 'Jotai',
		content: <PokemonFight useStore={useJotaiStore} />,
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
