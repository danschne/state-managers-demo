import { Button, Col, Row } from 'antd'
import { Move } from '../../models/move'
import styles from './MoveSelection.module.scss'

interface MoveSelectionProperties {
	moves: Move[]
	onMove: (move: Move) => void
	disabled?: boolean
}

export function MoveSelection({ moves, onMove, disabled }: MoveSelectionProperties) {
	return (
		<Row gutter={[16, 16]}>
			{moves.map((move) => {
				return (
					<Col key={move.id} span={12}>
						<Button type='primary' block className={styles.capitalize} onClick={() => onMove(move)} disabled={disabled}>
							{move.name} ({move.pp})
						</Button>
					</Col>
				)
			})}
		</Row>
	)
}
