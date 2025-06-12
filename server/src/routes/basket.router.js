const router = require("express").Router();

const path = require("path");

const BasketController = require("../controllers/Basket.controller");

router
  .get("/", BasketController.getAllByUser)
  .delete("/:id", BasketController.delete)
  .get("/:id", BasketController.getOne);

module.exports = router;
