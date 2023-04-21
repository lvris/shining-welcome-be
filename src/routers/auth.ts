import express from 'express';
import { IAuth } from '../common/interfaces/auth.interface';
import { generateToken } from '../services/token';

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

export default router;