const pool = require("../../config/database");

module.exports = {
    // create: (data, callBack)=>{
    //     pool.query(`insert into admin(admin_username, password)
    //                 values(?,?)`),
    //                 [
    //                     data.username,
    //                     data.password
    //                 ],
    //                 (error,results,fields)=>{
    //                     if(error){
    //                         return callBack(error);
    //                     }
    //                     return callBack(null,results);
    //                 } 
    // },
    updateAdmin: (data,callBack)=>{
        pool.query(
            `update admin set admin_username=?, password=? where id = ?`,
            [
            data.username,
            data.password
        ],
        (error,results,fields)=>{
            if(error) return callBack(error);
            return callBack(null, results[0])
        });
    },
    deleteAdmin: (data,callBack)=>{
        pool.query(`delete from admin where id=?`,
        [data.id],
        (error,results,fields)=>{
            if(error) return callBack(error);
            return callBack(null,results[0]);
        });
    },
    getAdminByUsername: (data,callBack)=>{
        pool.query(`select * from admin where admin_username=?`,
        [data],
        (error,results,fields)=>{
            if(error){
                callBack(error);
            }
            return callBack(null,results[0]);
        });
    }
};  