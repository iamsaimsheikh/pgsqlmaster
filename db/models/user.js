'use strict';
const { Model, Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const project = require('./project');
const Task = require('./task')
const user = sequelize.define(
  'Users',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    user_type: {
      type: DataTypes.ENUM('0', '1', '2'),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'user_type cannot be null',
        },
        notEmpty: {
          msg: 'user_type cannot be empty',
        },
      },
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'first_name cannot be null',
        },
        notEmpty: {
          msg: 'first_name cannot be empty',
        },
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'last_name cannot be null',
        },
        notEmpty: {
          msg: 'last_name cannot be empty',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'email cannot be null',
        },
        notEmpty: {
          msg: 'email cannot be empty',
        },
        isEmail: {
          msg: 'Invalid email id',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'password cannot be null',
        },
        notEmpty: {
          msg: 'password cannot be empty',
        },
      },
    },
    confirm_password: {
      type: DataTypes.VIRTUAL,
      set(value) {
        if (this.password.length < 7) {
          new Error(
            'Password length must be grater than 7'
          );
        }
        if (value != this.password) {
          new Error(
            'Passwords must match'
          );
        }
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    modelName: 'Users',
  }
);

user.hasMany(project, { foreignKey: 'created_by' })
project.belongsTo(user, { foreignKey: 'created_by' })

user.hasMany(Task, { foreignKey: 'created_by' });
Task.belongsTo(user, { foreignKey: 'created_by' });


module.exports = user