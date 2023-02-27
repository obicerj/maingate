const { hashPassword, verifyPassword } = require('../utils/password');
const jwtUtils = require('../utils/jwt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Role = require('../models/role');

// REGISTER
async function signup(req, res) {
  try {
    const { fullName, email, password } = req.body;
    
    // Check if user already exists
    const alreadyExistsUser = await User.findOne({ where: { email } }).catch(
      (err) => {
        console.log('Error: ', err);
      }
    );

    if (alreadyExistsUser) {
      return res.status(409).json({ message: 'User with email already exists!' });
    }

    // Hash password input
    const hashedPassword = await hashPassword(password);

    const newUser = new User({ fullName, email, password: hashedPassword, roleId: 2 });

    // const assignedRoles = await Role.findAll({ where: { name: 'user' } });
    // await newUser.addRoles(assignedRoles);

    const savedUser = await newUser.save();
    
    const jwtToken = jwtUtils.generateToken(savedUser)
    
    if(!savedUser) {
      return res.status(400).json({ message: 'Failed to create new account' });
    }

    return res.status(201).send({ message: 'User account created. Thanks for registering', token: jwtToken })

  } catch(err) {

    return res.status(500).json({ message: `Something went wrong, ${err.message}` });

  }
}

// LOGIN
async function login(req, res) {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ where: { email } }).catch(
      (err) => {
        console.log('Error: ', err);
      }
    );
    
    const isPasswordValid = await verifyPassword(password, user.password);

    if (!user) {
      return res
        .status(400)
        .json({ message: 'Email or password does not match!' });
    }

    if (!isPasswordValid) throw new Error('Invalid password');

    const jwtToken = jwtUtils.generateToken(user);

    res.status(200).json({ message: 'Welcome Back!', token: jwtToken });
  
  } catch(err) {

    return res.status(401).json({ message: 'Invalid credentials' });

  }

}

function logout(req, res) {
  // Invalidate JWT token using expiration
  const jwtToken = req.headers.authorization.split(' ')[1];
  
  jwt.verify(jwtToken, process.env.JWT_SECRET, (err, decoded) => {
  
    if (err) {
  
      return res.status(401).json({ message: 'Invalid token' });
  
    }
  
    const { id } = decoded;
  
    const expiredToken = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1s' });
  
    res.status(200).json({ message: 'Logged out successfully', token: expiredToken });
  
  });
}

module.exports = {
  signup,
  login,
  logout
}