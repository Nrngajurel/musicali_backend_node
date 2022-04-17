const pool = require("../../config/database");

module.exports = {
    addDelivery: (data, callBack)=>{
        pool.query(`insert into delivery (shipment_date, status, order_id, customer_id, product_id) values(?, ?, ?, ?, ?)`,
        [
            data.shipment,
            data.status,
            data.orderId,
            data.customerId,
            data.productId
        ],(error,results,fields)=>{
            if(error){
                console.log(error);
                return callBack(error);
            }
            return callBack(null,results);
        });
    },
    getDelivery:(data,callBack)=>{
        pool.query(`select id, shipment_date, status, order_id, customer_id, product_id from delivery`,
        [],(error,results,fields)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results);
        });
    },
    getDeliveryById:(data,callBack)=>{
        pool.query(`select shipment_date, status, order_id, customer_id, product_id from delivery where id = ?`,
        [
            data.id,
        ],(error,results,fields)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results);
        });
    },
    getDeliveryByOrderId:(data,callBack)=>{
        pool.query(`select id, shipment_date, status, customer_id, product_id from delivery where order_id = ?`,
        [
            data.orderId,
        ],(error,results,fields)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results);
        });
    },
    getDeliveryByCustomerId:(data,callBack)=>{
        pool.query(`select id, shipment_date, status, order_id, product_id from delivery where customer_id = ?`,
        [
            data.customerId,
        ],(error,results,fields)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results);
        });
    },
    getDeliveryByProductId:(data,callBack)=>{
        pool.query(`select id, shipment_date, status, order_id, customer_id from delivery where product_id = ?`,
        [
            data.productId,
        ],(error,results,fields)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results);
        });
    },
}
