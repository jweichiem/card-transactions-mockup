import './AccountOverview.scss';
import { Card } from '../components/Card';
import { useCards } from '../hooks/useCards';

const AccountOverview = () => {
	const { data: cards } = useCards();

	return (
		<div className="main-layout">
			<h1>Account Overview</h1>
			<div className="row">
				{cards.map((card) => (
					<Card key={card.id} {...card} onClick={() => {}} />
				))}
			</div>
		</div>
	);
};

export default AccountOverview;
