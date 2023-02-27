const User = require('../models/user');
const bcrypt = require('bcrypt');


  async function seed() {
    const hashedPassword = await bcrypt.hash('password', 10);
    try {
      // Check if there are already records in the User table
      const count = await User.count();
      if (count > 0) return;

      // Define the users to seed
      const users = [
        {
          fullName: 'admin',
          email: 'admin@gmail.com',
          password: hashedPassword,
          roleId: 1,
        },
        {
          fullName: 'user',
          email: 'user@gmail.com',
          password: hashedPassword,
          roleId: 2,
        },
      ];

    // Bulk create the users
    await User.bulkCreate(users);
    } catch (error) {
      console.error('Error seeding users:', error);
    }
  }

module.exports = { seed };