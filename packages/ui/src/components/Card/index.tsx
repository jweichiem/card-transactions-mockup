import type { Card as CardInterface } from '@jweichiem-mockup/shared-types';
import './style.scss';

export interface CardProps extends CardInterface {
	onClick?: () => void;
	isSelected: boolean;
}

export const Card: React.FC<CardProps> = ({
	description,
	cardType,
	id,
	onClick,
	isSelected,
}) => {
	return (
		<button
			type="button"
			className={`card card--${cardType} ${isSelected ? 'card--selected' : ''}`}
			onClick={onClick}
			aria-pressed={isSelected}
		>
			<div className="card__header">
				<h2 className="card__description">{description}</h2>
				<p className="card__id" title={id}>
					{id}
				</p>
			</div>
		</button>
	);
};
