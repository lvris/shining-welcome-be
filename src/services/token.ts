import jwt from "jsonwebtoken";

const key = process.env.TOKEN_KEY ?? 'shining';

export function generateToken(content: Object) {
  return jwt.sign(
    content,
    key,
    {
      algorithm: 'HS512',
      expiresIn: '100 days'
    }
  )
}