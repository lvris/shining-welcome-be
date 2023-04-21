import express from 'express';
import { guest } from '../../prisma';

const router = express.Router();

router.get('/', async (req, res) => {
  const all = await guest.findMany();
  res.json(all);
})

export default router;