module.exports = app => {
  const product = require("../controllers/product.controller.js");
  const cors = require("cors");
  var routerProduct = require("express").Router();

  // Create a new Tutorial
  routerProduct.post("/", product.create);

  // Retrieve all Product
  routerProduct.get("/", product.findAll);

  // Retrieve a single Tutorial with id
  routerProduct.get("/:id", product.findOne);

  // Update a Tutorial with id
  routerProduct.put("/:id", product.update);

  // Delete a Tutorial with id
  routerProduct.delete("/:id", product.delete);

  // Create a new Tutorial
  routerProduct.delete("/", product.deleteAll);

  app.use('/api/product', cors(), routerProduct);
};