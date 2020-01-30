const mysql = require('mysql')
var pool = mysql.createPool({
    host     : '10.211.55.4',
    user     : 'root',
    password : '123456',
    database : 'blog'
});
   
var query=function(sql,callback){
    pool.getConnection((err,conn) => {
     if(err){
      callback(err,null,null);
     }else{
      conn.query(sql,function(qerr,vals,fields){
       //释放连接
       conn.release();
       //事件驱动回调
       callback(qerr,vals,fields);
      });
     }
    });
   };
module.exports=query;
