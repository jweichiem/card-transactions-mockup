import './AccountOverview.scss';
import { useState } from 'react';
import { TransactionFilterInput } from '../components/TransactionFilterInput';
import { Card } from '../components/Card';
import { useCards } from '../hooks/useCards';

const AccountOverview = () => {
	const { data: cards } = useCards();

	const [amountFilter, setAmountFilter] = useState<string>('');
	const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

	const handleSelectCard = (cardId: string) => {
		setSelectedCardId((prev) => {
			const next = prev === cardId ? null : cardId;
			if (next !== prev && next !== null) setAmountFilter(''); // AC for resetting has been interpreted as, if users toggle to show all transactions filter should not be cleared.

			return next;
		});
	};

	return (
		<div className="main-layout">
			<h1>Account Overview</h1>
			<div className="row">
				{cards.map((card) => (
					<Card
						key={card.id}
						{...card}
						selectedCardId={selectedCardId}
						onClick={() => {
							handleSelectCard(card.id);
						}}
					/>
				))}
			</div>
			<div className="row">
				<TransactionFilterInput
					id="t-filter"
					label="Filter by amount more than"
					value={amountFilter}
					inputAttributes={{
						onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
							setAmountFilter(e.target.value);
						},
					}}
				/>
			</div>
		</div>
	);
};

export default AccountOverview;
