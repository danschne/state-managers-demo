import { Progress } from 'antd'

interface HpBarProperties {
	hp: number
	currentHp: number
}

export function HpBar({ hp, currentHp }: HpBarProperties) {
	return <Progress strokeColor='#49aa19' percent={(currentHp / hp) * 100} showInfo={false} />
}
