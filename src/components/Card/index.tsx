import type { Card as CardInterface } from '../../ApiClient/index';
import './style.scss';

export interface FilterCard extends CardInterface {
	onClick?: () => void;
}

export const Card: React.FC<FilterCard> = ({
	description,
	cardType,
	id,
	onClick,
}) => {
	return (
		<button
			type="button"
			className={`card card--${cardType}`}
			onClick={onClick}
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
