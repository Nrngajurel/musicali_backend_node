const { createProduct, getProducts, updateProduct, deleteProduct } = require("./product.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token.validation");
const multer = require('multer');
const path = require('path');
const { request } = require("http");


var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, path.join(__dirname+'../../public/images/'))     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + new Date().toISOString().replace(/:/g, '-') + path.extname(file.originalname))
    }
});

var upload = multer({
    storage: storage
});

router.post("/", upload.single('avatar'), createProduct);
router.get("/", checkToken, getProducts);
router.patch("/",checkToken, updateProduct);
router.delete("/",checkToken, deleteProduct);

module.exports = router;