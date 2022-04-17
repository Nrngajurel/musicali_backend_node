const { addDelivery, getDelivery, getDeliveryById, getDeliveryByOrderId, getDeliveryByCustomerId, getDeliveryByProductId } = require("./delivery.service");

module.exports = {
    addDelivery: (req,res)=>{
        const body = req.body;
        addDelivery(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "added delivery"
            });
        });
    },
    getAllDelivery: (req,res)=>{
        const body = req.body;
        getDelivery(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
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
    getDeliveryById: (req,res)=>{
        const body = req.body;
        getDeliveryById(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
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
    getDeliveryByOrderId: (req,res)=>{
        const body = req.body;
        getDeliveryByOrderId(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
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
    getDeliveryByCustomerId: (req,res)=>{
        const body = req.body;
        getDeliveryByCustomerId(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
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
    getDeliveryByProductId: (req,res)=>{
        const body = req.body;
        getDeliveryByProductId(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
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


}