import db from "../models";
const ProductItem = db.ProductItem;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a ProductItem
  const productItem = {
    product_name: req.body.product_name,
    price: req.body.price,
    size: req.body.size,
    color: req.body.color,
    description: req.body.description,
    is_available: req.body.is_available,
    product_list_id: req.body.product_list_id,
    product_code: req.body.product_code,
  };

  // Save Tutorial in the database
  ProductItem.create(productItem)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ProductItem."
      });
    });
};

exports.findAll = (req, res) => {
  const product_name = req.query.product_name;
  var condition = product_name ? { product_name: { [Op.iLike]: `%${product_name}%` } } : null;

  Tutorial.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving productItem."
      });
    });
};