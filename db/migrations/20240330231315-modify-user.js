'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add a unique constraint to the email column
    await queryInterface.addConstraint('users', {
      type: 'unique',
      fields: ['email'],
      name: 'unique_email_constraint'
    });
  },
  async down(queryInterface, Sequelize) {
    // Remove the unique constraint from the email column
    await queryInterface.removeConstraint('users', 'unique_email_constraint');
  }
};
