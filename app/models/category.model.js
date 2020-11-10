module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define("category", {
    name: {
      type: Sequelize.STRING,
    },
    category_code: {
      type: Sequelize.STRING,
    },
    is_available: {
      type: Sequelize.BOOLEAN,
    },
    description: {
      type: Sequelize.STRING,
    },
  }, {
    freezeTableName: true
  }
  );

  return Category;
};