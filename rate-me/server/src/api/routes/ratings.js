import { Router } from 'express';

const router = Router();

import { getCards, delCard, postCard, putCard } from '../model/ratings.js';

router.get('/', (req, res) => res.json(getCards()));
router.post('/', ({ body }, res) => res.status(postCard(body)).end());
router.delete('/:id', ({ params }, res) => res.status(delCard(Number(params.id))).end());
router.put('/:id', ({ body }, res) => res.status(putCard(body)).end());

export default router;
