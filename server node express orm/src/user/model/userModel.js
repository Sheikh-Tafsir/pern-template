// UserModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/sequalizeConfig'); // Assuming your Sequelize instance is defined in a separate file

const UserModel = sequelize.define('people', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNo: {
      type: DataTypes.STRING,
      field: 'phone_no'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING
    },
    postalCode: {
      type: DataTypes.STRING,
      field: 'postal_code'
    },
    address: {
      type: DataTypes.STRING
    },
    addressLongitude: {
      type: DataTypes.FLOAT,
      field: 'address_longitude'
    },
    addressLatitude: {
      type: DataTypes.FLOAT,
      field: 'address_latitude'
    },
    rating: {
      type: DataTypes.FLOAT
    }
  },
  {
      timestamps: false // Disable automatic timestamp tracking
  }
);

module.exports = UserModel;
