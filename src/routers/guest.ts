import express from 'express';
import prisma from '../services/prisma';
import { IPage } from '../common/interfaces/common.interface';
import { IGuest, IGuestUpdate } from '../common/interfaces/guest.interface';
import { generateToken } from '../services/token';
import { Request as JWTRequest } from "express-jwt";

const router = express.Router();

/**
 * 添加游客
 */
router.post<{},{},IGuest>('/', async (req, res) => {
  const info = req.body;
  const guest = await prisma.guest.create({
    data: info
  });

  const token = generateToken({ id: guest.id });
  res.json({token, guest});
})

router.get<{},{},number>('/total', async (req, res) => {
  if(!(req as JWTRequest).auth?.admin) {
    return res.status(401);
  }
  const total = await prisma.guest.count();
  res.json(total);
})

/**
 * 获取游客列表
 */
router.get<{},{},{},IPage>('/', async (req, res) => {
  if(!(req as JWTRequest).auth?.admin) {
    return res.status(401);
  }
  const page = req.query.page || 1;
  const pageSize = req.query.size || 10;
  const all = await prisma.guest.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize
  });
  res.json(all);
})
/**
 * 按照 ID 查询游客信息
 */
router.get('/:id', async (req, res) => {
  if(!(req as JWTRequest).auth?.admin) {
    return res.status(401);
  }
  const guestID = +req.params.id;
  const guest = await prisma.guest.findUnique({
    where: {
      id: guestID,
    }
  })
  res.json(guest);
})

/**
 * 修改游客信息, 通常是为了修改 State
 */
router.put<{id:string},{},IGuestUpdate>('/:id', async (req, res) => {
  if(!(req as JWTRequest).auth?.admin) {
    return res.status(401);
  }
  const guest = await prisma.guest.update({
    where: {
      id: +req.params.id
    },
    data: req.body
  })
  res.json(guest);
})

/**
 * 删除游客信息
 */
router.delete('/:id', async (req, res) => {
  if(!(req as JWTRequest).auth?.admin) {
    return res.status(401);
  }
  const guestID = +req.params.id;
  const guest = await prisma.guest.delete({
    where: {
      id: guestID,
    }
  })
  res.json(guest);
})

export default router;