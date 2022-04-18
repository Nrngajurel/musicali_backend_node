const {
    updateAdmin,
    deleteAdmin,
    getAdminByUsername
} = require("./admin.service");

const { sign } = require("jsonwebtoken")

module.exports = {
    // createAdmin: (req,res)=>{
    //     const body = req.body;
    //     const salt = genSaltSync(10);
    //     body.password = hashSync(body.password, salt);
    //     create(body,(err,results)=>{
    //         if(err){
    //             console.log(err);
    //             return res.status(500).json({
    //                 success: 0,
    //                 message: "database connection error"
    //             });
    //         }
    //         return res.status(200).json({
    //             success: 1,
    //             message: results
    //         });
    //     });
    // },
    updateAdmin: (req,res)=>{
        const body = req.body;
        updateAdmin(body,(err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                message: "Admin updated successfully"
            });
        });
    },
    deleteAdmin: (req,res)=>{
        const data = req.body;
        deleteAdmin(data, (err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Admin deleted successfully"
                });
            }
            return res.json({
                success: 1,
                message: "Admin deleted successfully"
            });
        });
    },
    loginAdmin: (req,res)=>{
        const body = req.body;
        getAdminByUsername(body.username, (err,results)=>{
            console.log(results);
            if(err){
                console.log(err);
            }
            if(!results){
                return res.json({
                    success: 0,
                    data: "Invalid password or username"
                });
            }
            const result = body.password == results.password;
            if(result){
                results.password = undefined;
                const jsonToken = sign({ result: results }, process.env.JWT_KEY, {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    token: jsonToken
                });
            }else{
                return res.json({
                    success: 0,
                    data: "Invalid username or password"
                });
            }
        });
    },
}