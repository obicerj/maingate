const UserRole = require('../models/UserRole');

async function seed() {
  try {
    // Define userRoles to seed
    const roles = [
      { userId: 1, roleId: 1 },
      { userId: 1, roleId: 2 },
      { userId: 2, roleId: 2 },
    ];

    // Bulk create the userRoles
    await UserRole.bulkCreate(roles);
  } catch (error) {
    console.error('Error seeding roles:', error);
  }
}

module.exports = { seed };