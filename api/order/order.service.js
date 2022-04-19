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
        pool.query(`select id, order_date, customer_id, product_id from orders`,
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
        pool.query(`select * from orders where id = ?`,
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
        pool.query(`select id, order_date, product_id from orders where customer_id = ?`,
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
        pool.query(`select id, order_date, customer_id from orders where product_id = ?`,
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
        pool.query(`delete from orders where id = ?`,
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