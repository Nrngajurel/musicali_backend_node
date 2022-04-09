const { createUser, getUserById, getUsers, updateUser, deleteUser, login, setVerificationCode, checkVerification } = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token.validation");

router.post("/", createUser);
router.get("/", checkToken, getUsers);
router.get("/:id", checkToken, getUserById);
router.patch("/",checkToken,updateUser);
router.delete("/",checkToken,deleteUser);
router.post("/login",login);
router.post("/verify",setVerificationCode)
router.post("/verify/check",checkVerification)

module.exports = router;