const sequelize = require('../config/db');
const userSeed = require('./userSeeder');
const roleSeed = require('./roleSeeder');
// const userRoleSeed = require('./userRoleSeeder');

// Seed the database
sequelize
  .sync({ force: true }) // This drops all tables and recreates them
  .then(() => {
    console.log('Database synced successfully!');
    return roleSeed.seed();
  })
  .then(() => {
    console.log('Roles seeded successfully!');
    return userSeed.seed();
  })
  // .then(() => {
  //   console.log('Users seeded successfully!');
  //   return userRoleSeed.seed();
  // })
  .then(() => {
    // console.log('userRoles seeded successfully!');
    console.log('Users seeded successfully!');
  })
  .catch((err) => {
    console.error('Unable to sync the database:', err);
  });