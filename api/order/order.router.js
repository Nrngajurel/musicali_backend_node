const { addOrder, getAllOrder, getOrderById, getOrderByCustomerId, getOrderByProductId, deleteOrder } = require("./order.controller");

const router = require("express").Router();

router.post("/",addOrder);
router.get("/",getAllOrder);
router.get("/id",getOrderById);
router.get("/customerId",getOrderByCustomerId);
router.get("/productId",getOrderByProductId);
router.delete("/",deleteOrder);

module.exports = router;