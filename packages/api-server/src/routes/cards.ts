import { Router } from 'express';
import { getCardsData } from '../data/loaders.js';

export const cardsRouter = Router();

cardsRouter.get('/', (_req: unknown, res: any) => {
  try {
    res.status(200).json(getCardsData());
  } catch (_error) {
    res.status(500).json({ message: 'Failed to load cards' });
  }
});
