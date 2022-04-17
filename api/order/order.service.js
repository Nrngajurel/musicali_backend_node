const pool = require("../../config/database");

module.exports = {
    addOrder: (data,callBack)=>{
        pool.query(`insert into orders (order_date, customer_id, product_id) values(?, ?, ?)`,
        [
            data.orderDate,
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
    getOrders: (data,callBack)=>{
        pool.query(`select id, order_date, customer_id, product_id from order`,
        [
            data.id,
        ],(error,results,fields)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results);
        });
    },
    getOrderById: (data,callBack)=>{
        pool.query(`select order_date, customer_id, product_id from order where id = ?`,
        [
            data.id,
        ],(error,results,fields)=>{
            if(error){
                console.log(error);
                return callBack(error);
            }
            return callBack(null,results);
        });
    },
    getOrderByCustomerId: (data,callBack)=>{
        pool.query(`select id, order_date, product_id from order where customer_id = ?`,
        [
            data.id,
        ],(error,results,fields)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results);
        });
    },
    getOrderByProductId: (data,callBack)=>{
        pool.query(`select id, order_date, customer_id from order where product_id = ?`,
        [
            data.id,
        ],(error,results,fields)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results);
        });
    },
    deleteOrderById: (data,callBack)=>{
        pool.query(`delete from order where id = ?`,
        [
            data.id,
        ],(error,results,fields)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results);
        });
    }
}