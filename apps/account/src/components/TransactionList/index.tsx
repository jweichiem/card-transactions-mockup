export { TransactionListItem } from './TransactionListItem';
import './style.scss';

export type TransactionListProps = {
	children?: React.ReactNode;
};

export const TransactionList: React.FC<TransactionListProps> = ({
	children,
}) => {
	return <ul className="transaction-list">{children}</ul>;
};
