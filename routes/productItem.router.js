const express = require('express');
const router = express.Router();
const ProductList = require('../models/productList.model');
const ProductItem = require('../models/productItem.model');

// Insert
router.post('/', async (req, res) => {
    let { product_name, price, size, color, description, is_available, product_code } = req.body;
    console.log(req.body);
    try {
        let newProductItem = await ProductItem.create({
            product_name,
            price,
            size,
            color,
            description,
            is_available,
            product_code,
        }, {
            fields: ["product_name", "price", "size", "color", "description", "is_available", , "product_code"]
        });
        if (newProductItem) {
            res.json({
                result: 'OK',
                data: newProductItem,
                message: 'Create product item success !'
            })
        } else {
            res.json({
                result: 'Error',
                data: {},
                message: 'Create a product item failed !'
            })
        }
    } catch (error) {
        res.json({
            result: 'Error',
            data: {},
            message: `Create a product item failed. Error: ${error}`
        })
    }
});
module.exports = router;