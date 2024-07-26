import jwt from 'jsonwebtoken'

export function authMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'Не авторизован' })
    }

    const decoded = jwt.verify(token, 'secret123')
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Не авторизован' })
  }
}
