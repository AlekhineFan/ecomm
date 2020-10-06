const repository = require("./repository");

class ProductsRepository extends Repository {}

module.exports = new ProductsRepository("products.json");
