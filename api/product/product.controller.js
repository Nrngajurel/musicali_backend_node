const {
    create,
    getAllProduct,
    updateProduct,
    deleteProduct
} = require("./Product.service");

const { genSaltSync, hashSync } = require("bcrypt");

module.exports = {
    createProduct: (req,res)=>{
        console.log("hello")
        const body = req.body;
        console.log(body);
        // const salt = genSaltSync(10);
        // body.password = hashSync(body.password, salt);
        if (!req.file) {
            return res.status(200).json({
                success: 1,
                message: "no file uploaded"
            });
        } else {
            var imgsrc = 'http://localhost:3000/images/' + req.file.filename
            // var insertData = "INSERT INTO users_file(file_src)VALUES(?)"
            // db.query(insertData, [imgsrc], (err, result) => {
            //     if (err) throw err
            //     console.log("file uploaded")
            // });
            body["imageK"] = imgsrc;
            // body["name"] = req.name;
            // body["price"] = 
            // boydy["description"] = 
            // console.log(body);
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
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
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
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Product deleted successfully"
                });
            }
            return res.json({
                success: 1,
                message: "Product deleted successfully"
            });
        });
    }
}