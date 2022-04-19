const {
    create,
    getAllProduct,
    updateProduct,
    deleteProduct
} = require("./Product.service");

const { genSaltSync, hashSync } = require("bcrypt");

module.exports = {
    createProduct: (req,res)=>{
        const body = req.body;
        console.log(body);
        if (!req.file) {
            return res.status(200).json({
                success: 1,
                message: "no file uploaded"
            });
        } else {
            var imgsrc = '/images/' + req.file.filename
            body["imageK"] = imgsrc;
            create(body,(err,results)=>{
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "database connection error"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: results
                });
            });
        }
    },
    getProducts: (req,res)=>{
        console.log(req);
        getAllProduct((err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                message: results
            });
        });
    },
    updateProduct: (req,res)=>{
        // const body = req.body;
        // const salt = genSaltSync(10);
        // body.password = hashSync(body.password, salt);
        updateProduct(body,(err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                message: "Product updated successfully"
            });
        });
    },
    deleteProduct: (req,res)=>{
        const data = req.body;
        deleteProduct(data, (err,results)=>{
            console.log("error",err);
            console.log("results",results);
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Product deleted failed"
                });
            }
            return res.json({
                success: 1,
                message: "Product deleted successfully"
            });
        });
    }
}