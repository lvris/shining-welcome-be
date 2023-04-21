import express from 'express';
import { IAuth } from '../common/interfaces/auth.interface';
import { generateToken } from '../services/token';
import { Request as JWTRequest } from "express-jwt";

const router = express.Router();

const password = process.env.PASSWORD ?? 'shining';
/**
 * 检查密码, 正确则加载管理员 Token
 */
router.post<{},{},IAuth>('/', async (req, res, next) => {
  const pass = req.body.password;
  if(pass == password) {
    const access = generateToken({admin: true});
    res.json({token: access});
  } else {
    res.status(401);
    next(new Error('Wrong Password'));
  }
})
/**
 * 解密 Token
 */
router.get('/', async (req, res) => {
  const token = (req as JWTRequest).auth;
  if(!token) {
    return res.status(404);
  }
  res.json(token);
})

export default router;