const Sequelize = require('sequelize');
const sequelize = require('../database/database').sequelize;
const Op = require('../database/database').Op;

const ProductItem = sequelize.define("product_item", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    product_name: {
        type: Sequelize.TEXT,
    },
    price: {
        type: Sequelize.INTEGER,
    },
    size: {
        type: Sequelize.TEXT,
    },
    color: {
        type: Sequelize.TEXT,
    },
    description: {
        type: Sequelize.TEXT,
    },
    is_available: {
        type: Sequelize.BOOLEAN,
    },
    product_list_id: {
        type: Sequelize.INTEGER,
    },
    product_code: {
        type: Sequelize.TEXT,
    }
}, {
    // if false model will don't add the timestamp attributes (updateAt, createAt)
    timestamps: false,
    freezeTableName: true
});
module.exports = ProductItem;