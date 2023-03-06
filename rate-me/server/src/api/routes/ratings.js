import { Router } from 'express';

const router = Router();

import { getCards, delCard, postCard } from '../model/ratings.js';

router.get('/', (req, res) => res.json(getCards()));
router.post('/', ({ body }, res) => res.status(postCard(body)).end());
router.delete('/:id', ({ params }, res) => res.status(delCard(Number(params.id))).end());

export default router;
