const pool = require("../../config/database");

module.exports = {
    create: (data, callBack)=>{
        pool.query(`insert into customer (name, address, number, password, email) values (?, ?, ?, ?, ?)`,
                    [
                        data.name,
                        data.address,
                        data.number,
                        data.password,
                        data.email
                    ],
                    (error,results,fields)=>{
                        if(error){
                            return callBack(error);
                        }
                        return callBack(null,results);
                    } 
        )},
    getAllUser: callBack=>{
        pool.query(`select id, name, email, password, address, number, verified from customer`,
        [],
        (error,results,fields)=>{
            if(error) return callBack(error);
            return callBack(null, results);
        }
        )},
    getUserById: (id,callBack)=>{
        pool.query(`select name, address, number, email, verified from customer where id = ?`,
        [id],
        (error,results,fields)=>{
            if(error) return callBack(error);
            return callBack(null,results[0]);
        }
        )},
    updateUser: (data,callBack)=>{
        pool.query(
            `update customer set name=?, address=?, password=?, email=?, number=? 
            where id = ?`,
            [
            data.name,
            data.address,
            data.password,
            data.email,
            data.number,
            data.id
        ],
        (error,results,fields)=>{
            if(error) return callBack(error);
            return callBack(null, results[0])
        });
    },
    deleteUser: (data,callBack)=>{
        pool.query(`delete from customer where id=?`,
        [data.id],
        (error,results,fields)=>{
            if(error) return callBack(error);
            return callBack(null,results[0]);
        });
    },
    getUserByEmail: (data,callBack)=>{
        pool.query(`select * from customer where email=?`,
        [data.email],
        (error,results,fields)=>{
            if(error){
                callBack(error);
            }
            return callBack(null,results[0]);
        });
    },
    updateUserById: (data)=>{
        return pool.query(`update customer set verified = ? where id = ?`,
        [true,data.userId],(error,results)=>{
            if(error) {
                console.log(error);
                return false;
            }
            return true;
        });
    },
    setVerificationCode: (data,callBack)=>{
        pool.query(`insert into verification(verification_code,user_id) values(?,?)`,
        [data.code, data.userId],
        (error,results,fields)=>{
            if(error){
                return callBack(error);
            }
            console.log(results);
            return callBack(null,results);
        });
    },
    getVerificationCode: (data,callBack)=>{
        pool.query(`select * from verification where user_id=?`,
        [data.userId],
        (error,results,fields)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results[0]);
        });
    }
};  