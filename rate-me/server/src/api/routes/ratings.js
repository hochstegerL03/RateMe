import { Router } from 'express';

const router = Router();

import { getCards, delCard, postCard, putCard } from '../model/ratings.js';

router.get('/cards', (req, res) => res.json(getCards()));
router.post('/cards', ({ body }, res) => res.status(postCard(body)).end());
router.delete('/cards/:id', ({ params }, res) => res.status(delCard(Number(params.id))).end());
router.put('/cards/:id', ({ body }, res) => res.status(putCard(body)).end());
router.get('*', (req, res) => res.redirect('/'));

export default router;
