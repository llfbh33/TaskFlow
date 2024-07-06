'use strict';

/** @type {import('sequelize-cli').Migration} */

// required to add seed data to the user table and to hash passwords
const { User } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const seedUsers = [
  {
    name: "Starter",
    username: "starter-aubrie",
    email: 'AubrieWoodbine@gmail.com',
    status: 'project-manager',
    isEmployed: false,
    hashedPassword: bcrypt.hashSync('password')
  },
  {
    name: "Demo-User",
    username: "demo-user",
    email: 'demo@gmail.com',
    status: 'collaborator',
    isEmployed: false,
    hashedPassword: bcrypt.hashSync('password1')
  },
  {
    name: "Demo-User2",
    username: "demo-user2",
    email: 'demo2@gmail.com',
    status: 'user',
    isEmployed: false,
    hashedPassword: bcrypt.hashSync('password2')
  },
]



module.exports = {
  async up (queryInterface, Sequelize) {

    options.tableName = 'Users';
    options.validate = true;

    await User.bulkCreate(seedUsers, options)
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Users';
    return queryInterface.bulkDelete(options, seedUsers, {});
  }
};
