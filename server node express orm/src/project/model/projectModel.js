// ProjectModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/sequalizeConfig'); // Assuming your Sequelize instance is defined in a separate file

const ProjectModel = sequelize.define('project', {
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
    type: {
      type: DataTypes.ENUM('folder', 'file'),
      //type: DataTypes.STRING,
      allowNull: false,
    },
    folderStructure: {
        type: DataTypes.JSON,
        allowNull: true,
        field: 'folder_structure'
    },
  },
  {
    tableName: 'project_folder',
    timestamps: false // Disable automatic timestamp tracking
  }
);

module.exports = ProjectModel;