import { Button, Modal } from 'antd'

interface FightResultModalProperties {
	isVisible: boolean
	onClose: () => void
	onNewFight: () => void
	playerHasWon: boolean
}

export function FightResultModal({ isVisible, onClose, onNewFight, playerHasWon }: FightResultModalProperties) {
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
					New fight
				</Button>,
			]}
		>
			<p>{playerHasWon ? 'Congratulations, you won the fight!' : 'You lost the fight. Better luck next time!'}</p>
		</Modal>
	)
}
