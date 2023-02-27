const User = require('../models/user');
const Role = require('../models/role');

const checkRole = (authRoles) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id;
      const user = await User.findByPk(userId, {
        include: [Role]
      });
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      if (user.Role.name !== authRoles) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: `Server Error ${err.message}` });
    }
  };
};

module.exports = { checkRole };