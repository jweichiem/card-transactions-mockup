import express from 'express';
import type { Request, Response } from 'express-serve-static-core';
import { getCardsData } from '../data/loaders.js';

export const cardsRouter = express.Router();

cardsRouter.get('/', (_req: Request, res: Response) => {
	try {
		res.status(200).json(getCardsData());
	} catch (_error) {
		res.status(500).json({ message: 'Failed to load cards' });
	}
});
