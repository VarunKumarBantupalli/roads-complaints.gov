const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protectRoute = (allowedRoles) => async(req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ msg: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'secretkey');
    req.user = await User.findById(decoded.id).select('-password');
    next();

    if (!allowedRoles.includes(decoded.role))
      return res.status(403).json({ msg: 'Access denied' });

    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};

module.exports = protectRoute;
