import { useCards, useTransactionsByCardId } from '@jweichiem-mockup/api-react';
import type { Transaction } from '@jweichiem-mockup/shared-types';
import { Card } from '@jweichiem-mockup/ui';
import { useMemo, useState } from 'react';
import { TransactionFilterInput } from '../../components/TransactionFilterInput';
import {
	TransactionList,
	TransactionListItem,
} from '../../components/TransactionList';
import './style.scss';

/** Helper to parse value from input element */
const parseMinAmount = (value: string): number | null => {
	const trimmed = value.trim();
	if (trimmed === '') return null;

	const n = Number(trimmed);
	return Number.isFinite(n) ? n : null;
};

const Overview = () => {
	const { data: cards } = useCards();
	const [amountFilter, setAmountFilter] = useState<string>('');
	const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

	const { data: transactionsByCardId } =
		useTransactionsByCardId(selectedCardId);

	const handleSelectCard = (cardId: string) => {
		setSelectedCardId((prev) => {
			const next = cardId;
			if (next !== prev && next !== null) setAmountFilter('');

			return next;
		});
	};

	const visibleTransactions = useMemo<Transaction[]>(() => {
		const min = parseMinAmount(amountFilter);
		if (min === null) return transactionsByCardId;
		return transactionsByCardId.filter((t) => t.amount >= min);
	}, [amountFilter, transactionsByCardId]);

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
			<div className="row">
				{visibleTransactions.length > 0 ? (
					<TransactionList>
						{visibleTransactions.map((visibleTransaction) => {
							const { description, amount, id } = visibleTransaction;
							return (
								<TransactionListItem
									key={id + selectedCardId}
									id={id}
									description={description}
									amount={amount}
									highlight={!!selectedCardId}
								></TransactionListItem>
							);
						})}
					</TransactionList>
				) : (
					<h4>
						Click a card to show transactions made through the selected card.
					</h4>
				)}
			</div>
		</div>
	);
};

export default Overview;
