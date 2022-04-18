const {
    create,
    getAllUser,
    getUserById,
    updateUser,
    deleteUser,
    getUserByEmail,
    setVerificationCode,
    getVerificationCode,
    updateUserById
} = require("./user.service");

//encrypting the password in the database
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
//for jwt token validation
const { sign } = require("jsonwebtoken");
//email handler
const nodemailer = require("nodemailer");
//unique string for generating the code that is going to be sent to the email for verification
const { v4:uuidv4 } = require("uuid");

//nodemailer stuff
// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth:{
//         user: process.env.AUTH_EMAIL,
//         pass: process.env.AUTH_PASS
//     }
// });

// //testing success
// transporter.verify((error, success)=>{
//     if(error){
//         console.log(error);
//     }else{
//         console.log("Ready for messages");
//         console.log(success);
//     }

// });


module.exports = {
    createUser: (req,res)=>{
        
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        getUserByEmail(body,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(200).json({
                    success: 0,
                    message: "database connection error" 
                });
            }

            if(results.length>0){
                return res.status(200).json({
                    success: 2,
                    message: "email already used!!"
                });
            }else{
                create(body,(err,results)=>{
                    if(err){
                        console.log(err);
                        return res.status(500).json({
                            success: 0,
                            message: "database connection error"
                        });
                    }
                    //handle account verification
                    const verificationCode = uuidv4();
                    const { to,subject,message }={
                        to: body.email,
                        subject: "Music Rental User Verification",
                        message: "Your verification code is "+verificationCode
                    }
        
                    const mailOptions={
                        from: process.env.AUTH_EMAIL,
                        to: to,
                        subject: subject,
                        text: message
                    };
                    getUserByEmail(body,(err,result)=>{
                        if(err){
                            return res.status(200).json({
                                success: 0,
                                message: "An error has occured"
                            });
                        }
                        if(!result){
                            return res.status(200).json({
                                success: 0,
                                message: "Invalid Data"
                            });
                        }
                        const datas = {
                            code:verificationCode,
                            userId: result[0].id
                        };
                        setVerificationCode(datas,(error,resultss)=>{
                            if(error) return error;
                            transporter.sendMail(mailOptions)
                               .then(()=>{
                                     
                                    return res.status(200).json({
                                        success: 1,
                                        message: "Sign up successful. A verification code as been sent to your email for validation",
                                        data: datas
                                    });
                                })
                               .catch((error)=>{
                                    return res.status(200).json({
                                        success: 0,
                                        message: "An error has occured"
                                    });
                                });
                        });
                    });
                });
            }

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
        console.log(req.body);
        const body = req.body;
        getUserByEmail(body, (err,results)=>{
            if(err){
                console.log(err);
            }
            if(!results[0]){
                return res.json({
                    success: 0,
                    data: "Invalid password or email"
                });
            }
            const result = compareSync(body.password, results[0].password);
            if(result){
                results[0].password = undefined;
                const jsonToken = sign({ result: results[0] }, process.env.JWT_KEY, {
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
    },
    setVerificationCode: (req,res)=>{
        setVerificationCode(req.body,(error,result)=>{
            if(error) {
                console.log(error);
                return res.status(200).json({
                    status: 0,
                    message: "There was some problem"
                }); 
            }
            return res.status(200).json({
                status: 1,
                message: "success"
            });
        });
    },
    checkVerification: (req,res)=>{
        const data = req.body;
        getVerificationCode(data,(error,result)=>{
            if(error){
                return res.status(200).json({
                    status: 0,
                    message: "Error not verified!!"
                });
            }
            if(data.code==result.verification_code){
                let val = updateUserById(data);
                if(val){
                    return res.status(200).json({
                        status: 1,
                        message: "User Verified"
                    }); 
                } 
                return res.status(200).json({
                    status: 0, 
                    message: "Error not verified!!"
                });
            }
            return res.status(200).json({
                status: 0,
                message: "Wrong verification code"
            });
        });
    }
}