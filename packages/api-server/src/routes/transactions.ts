import { Router } from 'express';
import { getTransactionsData } from '../data/loaders.js';

export const transactionsRouter = Router();

transactionsRouter.get('/:cardId/transactions', (req: any, res: any) => {
  try {
    const data = getTransactionsData();
    const { cardId } = req.params;
    const transactions = data[cardId];

    if (!transactions) {
      res.status(404).json({ message: `No transactions for card ${cardId}` });
      return;
    }

    res.status(200).json(transactions);
  } catch (_error) {
    res.status(500).json({ message: 'Failed to load transactions' });
  }
});
