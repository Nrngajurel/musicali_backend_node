const { createAdmin, updateAdmin, deleteAdmin, loginAdmin } = require("./Admin.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token.validation");

// router.post("/", createAdmin);
router.post("/login", loginAdmin);
router.patch("/",checkToken,updateAdmin);
router.delete("/",checkToken,deleteAdmin);

module.exports = router;