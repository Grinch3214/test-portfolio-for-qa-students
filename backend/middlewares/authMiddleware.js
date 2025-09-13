import jwt from 'jsonwebtoken';

function authMiddleware(req, res, next) {
  const token = req.headers['token'];

  console.log(token);

  if (!token) {
    return res.status(401).json({ message: 'Token is not found' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Wrong token' });
  }
}

export default authMiddleware;
