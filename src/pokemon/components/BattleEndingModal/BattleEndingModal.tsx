import { Button, Modal } from 'antd'

interface BattleEndingModalProperties {
	isVisible: boolean
	onClose: () => void
	onNewFight: () => void
	playerHasWon: boolean
}

export function BattleEndingModal({ isVisible, onClose, onNewFight, playerHasWon }: BattleEndingModalProperties) {
	function closeAndStartNewFight() {
		onClose()
		onNewFight()
	}

	return (
		<Modal
			title='Result'
			visible={isVisible}
			onCancel={onClose}
			footer={[
				<Button key='back' onClick={onClose}>
					OK
				</Button>,
				<Button key='submit' type='primary' onClick={closeAndStartNewFight}>
					Play new fight
				</Button>,
			]}
		>
			<p>{playerHasWon ? 'Congratulations, you won the fight!' : 'You lost the fight. Better luck next time!'}</p>
		</Modal>
	)
}
