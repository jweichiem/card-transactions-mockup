import type { Card as CardInterface } from '@jweichiem-mockup/shared-types';
import './style.scss';

export interface CardProps extends CardInterface {
  onClick?: () => void;
  selectedCardId: string | null;
}

export const Card: React.FC<CardProps> = ({
  description,
  cardType,
  id,
  onClick,
  selectedCardId,
}) => {
  return (
    <button
      type="button"
      className={`card card--${cardType} ${selectedCardId === id ? 'card--selected' : ''}`}
      onClick={onClick}
      aria-pressed={selectedCardId === id}
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
