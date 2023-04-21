import express from 'express';

import guest from './guest';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 🌎🌍🌏',
  });
});

router.use('/guest', guest);

export default router;
