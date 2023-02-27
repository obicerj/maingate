const Role = require('../models/role');
const sequelize = require('../utils/db');


  async function seed() {
    try {
      // Check if there are already records in the Role table
      const count = await Role.count();
      if (count > 0) return;

      // Define roles to seed
      const roles = [
        { name: 'admin' },
        { name: 'user' },
      ];
      // Bulk create the roles
      await Role.bulkCreate(roles);
    } catch (error) {
      console.error('Error seeding roles:', error);
    }
  }
 
module.exports = { seed };

// sequelize.sync().then(async () => {
//   for (const role of roles) {
//     await Role.findOrCreate({ where: { name: role.name }, defaults: role });
//   }
//   console.log('Roles seeded');
// });