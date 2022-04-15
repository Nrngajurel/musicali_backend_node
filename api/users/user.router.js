const { createUser, getUserById, getUsers, updateUser, deleteUser, login, setVerificationCode, checkVerification } = require("./user.controller");
const router = require("express").Router();
const { checkToken, verifyToken } = require("../../auth/token.validation");

router.post("/", createUser);
router.get("/", checkToken, getUsers);
router.get("/:id", checkToken, getUserById);
router.patch("/",checkToken,updateUser);
router.delete("/",checkToken,deleteUser);
router.post("/login",login);
router.post("/verify",checkVerification)
router.post("/token",verifyToken)

module.exports = router;