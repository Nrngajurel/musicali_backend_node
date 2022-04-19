const { checkToken } = require("../../auth/token.validation");
const { addOrder, getAllOrder, getOrderById, getOrderByCustomerId, getOrderByProductId, deleteOrder } = require("./order.controller");

const router = require("express").Router();

router.post("/",checkToken,addOrder);
router.get("/",checkToken,getAllOrder);
router.get("/id",checkToken,getOrderById);
router.get("/customer",checkToken,getOrderByCustomerId);
router.get("/product",checkToken,getOrderByProductId);
router.delete("/",checkToken,deleteOrder);

module.exports = router;