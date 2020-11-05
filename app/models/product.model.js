module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    name: {
      type: Sequelize.STRING
    },
    product_code: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.FLOAT
    },
    price_before: {
      type: Sequelize.FLOAT
    },
    rate: {
      type: Sequelize.FLOAT
    },
    vote: {
      type: Sequelize.INTEGER
    },
    size: {
      type: Sequelize.STRING
    },
    color: {
      type: Sequelize.STRING
    },
    image_url: {
      type: Sequelize.STRING
    },
    is_available: {
      type: Sequelize.BOOLEAN
    },
    description: {
      type: Sequelize.STRING
    }
  });

  return Product;
};