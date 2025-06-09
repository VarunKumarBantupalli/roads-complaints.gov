const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protectRoute = (allowedRoles) => async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token provided or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, 'secretkey'); // Consider using process.env.JWT_SECRET
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ msg: 'User not found' });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ msg: 'Access denied: insufficient role' });
    }

    req.user = user; // Attach user to request
    next(); // ✅ Only call next() once everything is verified
  } catch (err) {
    console.error('JWT auth error:', err);
    res.status(401).json({ msg: 'Invalid token' });
  }
};

module.exports = protectRoute;
