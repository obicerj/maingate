const bcrypt = require('bcrypt');

// Hash given password
async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// Verify given password against the hashed password
async function verifyPassword(password, hash) {
  const result = await bcrypt.compare(password, hash)
  return result
}


module.exports = {
  hashPassword,
  verifyPassword,
}
