const pool = require("../../config/database");

module.exports = {
    create: (data, callBack)=>{
        pool.query(`insert into product(name, description, price, image)
                    values(?,?,?,?)`,
                    [
                        data.name,
                        data.desc,
                        data.price,
                        data.imageK
                    ],
                    (error,results,fields)=>{
                        if(error){
                            return callBack(error);
                        }
                        return callBack(null,results);
                    } 
        )},
    getAllProduct: callBack=>{
        pool.query(`select id, name, description, price from product`,
        [],
        (error,results,fields)=>{
            if(error) return callBack(error);
            return callBack(null, results);
        }
        )},
    updateProduct: (data,callBack)=>{
        pool.query(
            `update product set name=?, description=?, price=? where id = ?`,
            [
            data.name,
            data.description,
            data.price,
            data.id
        ],
        (error,results,fields)=>{
            if(error) return callBack(error);
            return callBack(null, results[0]);
        });
    },
    deleteProduct: (data,callBack)=>{
        pool.query(`delete from product where id=?`,
        [data.id],
        (error,results,fields)=>{
            if(error) return callBack(error);
            return callBack(null,results[0]);
        });
    }
};  