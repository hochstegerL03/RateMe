import { Router } from 'express';

const router = Router();

import { getCards, delCard } from '../model/ratings.js';

router.get('/', (req, res) => res.json(getCards()));
router.delete('/:id', ({ params }, res) => res.status(delCard(Number(params.id))).end());

export default router;
