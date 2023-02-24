const express = require('express');

const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   const userWithEmail = await User.findOne({ where: { email } }).catch(
//     (err) => {
//       console.log('Error: ', err);
//     }
//   );

//   if (!userWithEmail) {
//     return res
//       .status(400)
//       .json({ message: 'Email or password does not match!' });
//   }

//   if (userWithEmail.password !== password) {
//     return res
//       .status(400)
//       .json({ message: 'Email or password does not match!' });
//   }

//   const jwtToken = jwt.sign(
//     { id: userWithEmail.id, email: userWithEmail.email },
//     process.env.JWT_KEY
//   );

//   res.json({ message: 'Welcome Back!', token: jwtToken });
// });

module.exports = router;
