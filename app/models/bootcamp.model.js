// bootcamp.model.js
module.exports = (sequelize, DataTypes) => {
  const Bootcamp = sequelize.define('Bootcamp', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cue: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  
  Bootcamp.associate = (models) => {
    Bootcamp.belongsToMany(models.User, {
      through: 'user_bootcamp',
      foreignKey: 'bootcamp_id',
    });
  };

  return Bootcamp;
};

