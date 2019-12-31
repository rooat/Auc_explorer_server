// var PostgreSQL = require('node-postgresql');
// const options = {
//     user: 'postgres',
//     password: '123456',
// 	host: 'localhost',				//可选，默认localhost
// 	port: 5432,						//可选，默认5432
// 	max: 10,						//连接池连接数量，可选，默认10
// 	idleTimeoutMillis: 30000,		//连接最大空闲时间，可选，默认30000
// 	database: 'blockdb',				
// };
// const pg = new PostgreSQL(options);
// async function test(){
//     let ss = await pg.query("insert into users (id,name)values(2,'dd');");
//     console.log(ss.rows)
// }
// test()
var config = require("./config")

async function test(){
   let ss =  await config.utilWeb3.web3Methods("getTransactionReceipt",{"txhash":"0xe9ab35c96b878f83e47cfd5d232acffcf3a57059bb5a9c1bc49ea40ba7d8b1a0"})
   console.log("ss:",ss)
}
test()