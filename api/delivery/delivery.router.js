const { addDelivery, getAllDelivery, getDeliveryById, getDeliveryByOrderId, getDeliveryByCustomerId, getDeliveryByProductId } = require("./delivery.controller");

const router = require("express").Router();

router.post("/",addDelivery);
router.get("/",getAllDelivery);
router.get("/id",getDeliveryById);
router.get("/orderId",getDeliveryByOrderId);
router.get("/customerId",getDeliveryByCustomerId);
router.get("/productId",getDeliveryByProductId);

module.exports = router;