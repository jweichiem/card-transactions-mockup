export interface TransactionFilterInputProps {
	id: string;
	label: string;
	value: string;
	type?: 'text' | 'number';
	inputAttributes?: React.InputHTMLAttributes<HTMLInputElement>;
}
import './style.scss';

export const TransactionFilterInput: React.FC<TransactionFilterInputProps> = ({
	label,
	value,
	id,
	type = 'number',
	inputAttributes,
}) => {
	return (
		<div className="transaction-filter">
			<label htmlFor={id} className="transaction-filter__label">
				{label}
			</label>
			<div className="transaction-filter__field-wrapper">
				<input
					name={id}
					id={id}
					className="transaction-filter__input"
					type={type}
					value={value}
					inputMode="numeric"
					{...inputAttributes}
				/>
			</div>
		</div>
	);
};
