const {
    create,
    getAllUser,
    getUserById,
    updateUser,
    deleteUser,
    getUserByEmail
} = require("./user.service");

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken")

module.exports = {
    createUser: (req,res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
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
                data: results
            });
        });
    },
    getUserById: (req,res)=>{
        const id = req.params.id;
        getUserById(id,(err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                message: results
            });
        });
    },
    getUsers: (req,res)=>{
        getAllUser((err,results)=>{
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
    updateUser: (req,res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body,(err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                message: "updated successfully"
            });
        });
    },
    deleteUser: (req,res)=>{
        const data = req.body;
        deleteUser(data, (err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "User deleted successfully"
                });
            }
            return res.json({
                success: 1,
                message: "User deleted successfully"
            });
        });
    },
    login: (req,res)=>{
        const body = req.body;
        getUserByEmail(body, (err,results)=>{
            if(err){
                console.log(err);
            }
            if(!results){
                return res.json({
                    success: 0,
                    data: "Invalid password or email"
                });
            }
            const result = compareSync(body.password, results.password);
            if(result){
                results.password = undefined;
                const jsonToken = sign({ result: results }, process.env.JWT_KEY, {
                    expiresIn: "24h"
                });
                return res.json({
                    success: 1,
                    token: jsonToken
                });
            }else{
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
        });
    }
}