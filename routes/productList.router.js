const express = require('express');
const router = express.Router();
const ProductList = require('../models/productList.model');
const ProductItem = require('../models/productItem.model');

// Insert
router.post('/', async (req, res) => {
    let { product_list_name, description, is_available } = req.body;
    try {
        let newProductList = await ProductList.create({
            product_list_name,
            description,
            is_available
        }, {
            fields: ["product_list_name", "description", "is_available"]
        });
        if (newProductList) {
            res.json({
                result: 'OK',
                data: newProductList,
                message: 'Create product list success !'
            })
        } else {
            res.json({
                result: 'Error',
                data: {},
                message: 'Create a product list failed !'
            })
        }
    } catch (error) {
        res.json({
            result: 'Error',
            data: {},
            message: `Create a product list failed. Error: ${error}`
        })
    }
});
module.exports = router;