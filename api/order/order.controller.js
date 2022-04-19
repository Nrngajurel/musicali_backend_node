const { addOrder, getOrders, getOrderById, getOrderByCustomerId, getOrderByProductId, deleteOrderById } = require("./order.service");

module.exports = {
    addOrder: (req,res)=>{
        const body = req.body;
        
        addOrder(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "order added"
            });
        });
    },
    getAllOrder: (req,res)=>{
        const body = req.body;
        getOrders(body,(err,results)=>{
            if(err){
                console.log(err);
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
    getOrderById: (req,res)=>{
        const body = req.body;
        getOrderById(body,(err,results)=>{
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
    getOrderByCustomerId: (req,res)=>{
        const body = req.body;
        //read params from request
        console.log(req.params);
        getOrderByCustomerId(body,(err,results)=>{
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
    getOrderByProductId: (req,res)=>{
        const body = req.body;
        getOrderByProductId(body,(err,results)=>{
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
    deleteOrder: (req,res)=>{
        const body = req.body;
        deleteOrderById(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(500).json({
                success: 1,
                message: "Successfully deleted!!"
            });
        });
    }
}