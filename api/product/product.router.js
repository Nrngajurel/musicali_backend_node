const { createProduct, getProducts, updateProduct, deleteProduct } = require("./product.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token.validation");

router.post("/", checkToken, createProduct);
router.get("/", checkToken, getProducts);
router.patch("/",checkToken,updateProduct);
router.delete("/",checkToken,deleteProduct);

module.exports = router;