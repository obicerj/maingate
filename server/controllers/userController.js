const User = require('../models/user');
const { generateToken } = require('../utils/jwt');

// GET ALL
exports.getAll = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ['password']
      }
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
      attributes: {
        exclude: ['password']
      }
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
  const id = req.params.id;

  try {
     const deleteUser = await User.destroy({
      where: {id: id}
     });

     if(!deleteUser) {
      return res.status(400).json({ message: 'Failed to delete user.' })
     }

     return res.status(200).json("User has been deleted successfully");

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

}