const { hashPassword } = require('../utils/password');
const jwtUtils = require('../utils/jwt');
const User = require('../models/user');
const Role = require('../models/role');

// CREATE 
exports.create = async (req, res) => {
  try {
    const { fullName, email, password, roleId } = req.body;
    const role = await Role.findByPk(roleId);

    if (!role) {
      return res.status(404).json({ message: 'Invalid user role.' });
    }

    const hashedPassword = await hashPassword(password);
    
    const alreadyExistsUser = await User.findOne({ where: { email } }).catch(
      (err) => {
        console.log('Error: ', err);
      }
    );

    if (alreadyExistsUser) {
      return res.status(409).json({ message: 'User with email already exists!' });
    }

    const newUser = new User({ fullName, email, password: hashedPassword, roleId });

    const savedUser = await newUser.save();
    const jwtToken = jwtUtils.generateToken(savedUser)
    if(savedUser) {
      res.status(201).send({jwtToken})
    }
  } catch (err) {
    return res.status(500).json({ message: `Something went wrong, ${err.message}` });
  }
}

// GET ALL
exports.getAll = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {exclude: ['password']},
      // include: [{ model: Role, through: { attributes: [] } }],
    });

    if(!users) {
      return res.status(400).json({ message: 'No users data.' });
    }

    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
}

// GET BY ID
exports.getOne = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password']},
      // include: [{ model: Role, through: { attributes: [] } }],
    });
    
    if(!user) {
      return res.status(400).json({ message: 'User not found.' });
    }

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// UPDATE BY ID
exports.updateOne = async (req, res) => {
  const id = req.params.id;
  const { fullName } = req.body;
 
  try {
    const updatedUser = await User.update({ fullName }, {
      where: { id }
    });

    if(!updatedUser) {
      return res.status(404).json({ message: 'Failed to update user.'})
    }

    res.status(200).json({ message: 'Updated user successfully.' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

}

// DELETE BY ID
exports.deleteOne = async (req, res) => {
  try {
    const id = req.params.id;
    
    const user = await User.findOne({ where: {id} });

    if (!user) {
      return res.status(400).json({ message: 'User not found.' })
    }

    const deleteUser = await user.destroy();
    
    if(!deleteUser) {
      return res.status(400).json({ message: 'Failed to delete user.' })
    }
    
    return res.status(200).json({ message: 'User has been deleted successfully' });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

}