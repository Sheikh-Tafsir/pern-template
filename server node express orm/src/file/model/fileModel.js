// ProjectModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/sequalizeConfig'); // Assuming your Sequelize instance is defined in a separate file

const FileModel = sequelize.define('file', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'user_name'
      },
    path: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
  },
  {
    tableName: 'project_file',
    timestamps: false // Disable automatic timestamp tracking
  }
);

module.exports = FileModel;