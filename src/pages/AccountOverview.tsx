import { useMemo, useState } from 'react';
import type { TransactionWithCardId } from '../ApiClient';
import { Card } from '../components/Card';
import { TransactionFilterInput } from '../components/TransactionFilterInput';
import { useAllTransactions } from '../hooks/useAllTransactions';
import { useCards } from '../hooks/useCards';
import './AccountOverview.scss';
import {
	TransactionList,
	TransactionListItem,
} from '../components/TransactionList';

/** Helper to parse value from input element */
const parseMinAmount = (value: string): number | null => {
	const trimmed = value.trim();
	if (trimmed === '') return null;

	const n = Number(trimmed);
	return Number.isFinite(n) ? n : null;
};

const AccountOverview = () => {
	const { data: cards } = useCards();

	const [amountFilter, setAmountFilter] = useState<string>('');

	const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
	const { data: allTransactions } = useAllTransactions();

	const filteredTransactions = useMemo<TransactionWithCardId[]>(() => {
		if (selectedCardId === null) return allTransactions;
		return allTransactions;
	}, [allTransactions, selectedCardId]);

	const visibleTransactions = useMemo<TransactionWithCardId[]>(() => {
		const min = parseMinAmount(amountFilter);
		if (min === null) return filteredTransactions;
		return filteredTransactions.filter((t) => t.amount >= min);
	}, [amountFilter, filteredTransactions]);

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
						onClick={() => {
							handleSelectCard(card.id);
						}}
						selectedCardId={selectedCardId}
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
							const { description, amount, id, cardId } = visibleTransaction;
							return (
								<TransactionListItem
									key={id + cardId}
									id={id}
									description={description}
									amount={amount}
									highlight={selectedCardId === cardId}
								></TransactionListItem>
							);
						})}
					</TransactionList>
				) : (
					<h4>No transactions matching current filter found.</h4>
				)}
			</div>
		</div>
	);
};

export default AccountOverview;
