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

router.get('/', async (req, res) => {
    const productName = req.query.product_name;
    var condition = productName ? { productName: { [Op.iLike]: `%${productName}%` } } : null;

    ProductItem.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
});

router.post('/:id', async (req, res) => {
    const id = req.params.id;

    ProductItem.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            });
        });
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    ProductItem.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
});

router.delete('/', async (req, res) => {
    ProductItem.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Tutorials were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tutorials."
            });
        });
});
module.exports = router;