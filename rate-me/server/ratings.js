const express = require('express');
const asyncHandler = require('express-async-handler');
require('dotenv').config();

const { getCards } = require('../model/ratings');

const router = express.Router();

router.get(
  '/cards',
  asyncHandler(async (req, res) => {
    res.json(getCards());
  }),
);

module.exports = router;
