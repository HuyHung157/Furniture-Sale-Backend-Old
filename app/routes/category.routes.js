module.exports = app => {
  const category = require("../controllers/category.controller");
  const cors = require("cors");
  var routerCategory = require("express").Router();

  // Create a new category
  routerCategory.post("/", category.create);

  // Retrieve all category
  routerCategory.get("/", category.findAll);

  // Retrieve a single category with id
  routerCategory.get("/:id", category.findById);

  app.use('/api/category', cors(), routerCategory);
};