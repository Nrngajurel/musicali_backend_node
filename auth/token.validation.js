const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req,res,next)=>{
        let token = req.get("authorization");
        if(token){
            token = token.slice(7);
            verify(token, process.env.JwT_KEY, (err,decoded)=>{
                if(err){
                    res.json({
                        success:0,
                        message:"Invalid token"
                    });
                }else{
                    next();
                }
            });
        }else{
            res.json({
                success: 0,
                message: "Access denied!! unauthorized user"
            });
        }
    },
    verifyToken:(req,res)=>{
        let token = req.body.token;
        if(token){
            token = token.slice(7);
            verify(token, process.env.JwT_KEY, (err,decoded)=>{
                if(err){
                    return res.json({
                        success:0,
                        message:"Invalid token"
                    });
                }else{
                    return res.json({
                        success:1,
                        message:"Valid token"
                    });
                }
            });
        }else{
            return res.json({
                success: 0,
                message: "Access denied!! unauthorized user"
            });
        }
    }, 
}