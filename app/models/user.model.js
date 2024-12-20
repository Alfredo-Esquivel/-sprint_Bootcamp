//user.models.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,  // Correo único
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, Infinity],  // Mínimo 8 caracteres
      },
    },
  });

  User.associate = (models) => {
    User.belongsToMany(models.Bootcamp, {
      through: 'user_bootcamp',
      foreignKey: 'user_id',
    });
  };

  return User;
};

