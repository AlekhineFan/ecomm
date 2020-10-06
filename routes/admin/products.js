const express = require("express");
const productsRepository = require("../../repositories/products");
const router = express.Router();

router.get("/admin/products", (req, res) => {});

router.get("/admin/products/new", (req, res) => {});

module.exports = router;
