import express from 'express';
const router = express.Router();
import ProductList from '../models/productList.model';
import ProductItem from '../models/productItem.model';
import bodyParser from 'body-parser';

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

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