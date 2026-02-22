import type { Transaction as TransactionInterface } from '../../ApiClient';

interface TransactionListItemInterface extends TransactionInterface {
	currency?: string;
	highlight?: boolean;
}

export const TransactionListItem: React.FC<TransactionListItemInterface> = ({
	description,
	amount,
	// id,
	currency = '€',
	highlight,
}) => {
	return (
		<li
			className={`transaction-list-item ${highlight ? 'transaction-list-item--highlighted' : ''}`}
		>
			<div className="transaction-list-item__content">
				<h4 className="transaction-list-item__description">{description}</h4>
				{/* <p className="transaction-list-item__id">{id}</p> */}
			</div>

			<div className="transaction-list-item__amount">
				{amount}
				{currency}
			</div>
		</li>
	);
};
