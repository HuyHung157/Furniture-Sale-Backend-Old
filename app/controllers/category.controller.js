const db = require("../models");
const Product = db.product;
const Category = db.category;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Category
  const category = {
    name: req.body.name,
    category_code: req.body.product_code,
    is_available: req.body.is_available ? req.body.is_available : false,
    description: req.body.description,
  };

  // Save Category in the database
  Category.create(category)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Category."
      });
    });
};

exports.findAll = () => {
  return Category.findAll({
    include: [
      {
        model: Product,
        as: "product",
        attributes: ["id", "title", "description"],
        through: {
          attributes: [],
        }
      },
    ],
  })
    .then((categories) => {
      return categories;
    })
    .catch((err) => {
      console.log(">> Error while retrieving Categories: ", err);
    });
};

exports.findById = (id) => {
  return Category.findByPk(id, {
    include: [
      {
        model: Product,
        as: "product",
        attributes: ["id", "title", "description"],
        through: {
          attributes: [],
        }
      },
    ],
  })
    .then((category) => {
      return category;
    })
    .catch((err) => {
      console.log(">> Error while finding Category: ", err);
    });
};

exports.addProduct = (categoryId, productId) => {
  return Category.findByPk(categoryId)
    .then((category) => {
      if (!category) {
        console.log("Category not found!");
        return null;
      }
      return Product.findByPk(productId).then((product) => {
        if (!product) {
          console.log("Product not found!");
          return null;
        }

        category.addProduct(product);
        console.log(`>> added Product id=${product.id} to Category id= ${category.id} `);
        return category;
      });
    })
    .catch((err) => {
      console.log(">> Error while adding Product to Category: ", err);
    });
};