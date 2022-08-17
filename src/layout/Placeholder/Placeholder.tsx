import { Typography } from 'antd'
import styles from './Placeholder.module.scss'

const { Title } = Typography

interface PlaceholderProperties {
	text: string
}

export function Placeholder({ text }: PlaceholderProperties) {
	return (
		<div className={styles.container}>
			<Title className={styles.text}>{text}</Title>
		</div>
	)
}
