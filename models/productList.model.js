const Sequelize = require('sequelize');
const ProductItem = require('./productItem.model');
const sequelize = require('../database/database').sequelize;
const Op = require('../database/database').Op;

const ProductList = sequelize.define("product_list", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    product_list_name: {
        type: Sequelize.TEXT,
    },
    description: {
        type: Sequelize.TEXT
    },
    is_available: {
        type: Sequelize.BOOLEAN
    }
}, {
    // if false model will don't add the timestamp attributes (updateAt, createAt)
    timestamps: true,
    freezeTableName: true
});
ProductList.hasMany(ProductItem, { foreignKey: 'product_list_id', sourceKey: 'id' });
ProductItem.belongsTo(ProductList, { foreignKey: 'product_list_id', targetKEY: 'id' })

module.exports = ProductList;