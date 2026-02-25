import cors from 'cors';
import express from 'express';
import { cardsRouter } from './routes/cards.js';
import { transactionsRouter } from './routes/transactions.js';

export const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req: unknown, res: any) => {
    res.status(200).json({ status: 'ok' });
  });

  app.use('/cards', cardsRouter);
  app.use('/cards', transactionsRouter);

  app.use((_req: unknown, res: any) => {
    res.status(404).json({ message: 'Not found' });
  });

  return app;
};
