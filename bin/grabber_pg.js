var PostgreSQL = require('node-postgresql');
const options = {
    user: 'postgres',
    password: '123456',
	host: 'localhost',				//可选，默认localhost
	port: 5432,						//可选，默认5432
	max: 10,						//连接池连接数量，可选，默认10
	idleTimeoutMillis: 30000,		//连接最大空闲时间，可选，默认30000
	database: 'blockdb',				
};
const pg = new PostgreSQL(options);
var config = require("../config")

const SMART_ERCABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"}/*,{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}*/];
const ERC20ABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenAddress","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}];
const ERC20_METHOD_DIC = {"0xa9059cbb":"transfer", "0xa978501e":"transferFrom"};
const METHOD_DIC = {
    "0x930a61a57a70a73c2a503615b87e2e54fe5b9cdeacda518270b852296ab1a377":"Transfer(address,address,uint)",
    "0xa9059cbb2ab09eb219583f4a59a5d0623ade346d962bcd4e46b11da047c9049b":"transfer(address,uint256)",
    "0xa978501e4506ecbd340f6e45a48ac5bd126b1c14f03f2210837c8e0b602d4d7b":"transferFrom(address,address,uint)",
    "0x086c40f692cc9c13988b9e49a7610f67375e8373bfe7653911770b351c2b1c54":"approve(address,uint)",
    "0xf2fde38b092330466c661fc723d5289b90272a3e580e3187d1d7ef788506c557":"transferOwnership(address)",
    "0x3bc50cfd0fe2c05fb67c0fe4be91fb10eb723ba30ea8f559d533fcd5fe29be7f":"Released(address,uint)",
    "0xb21fb52d5749b80f3182f8c6992236b5e5576681880914484d7f4c9b062e619e":"Released(address indexed, uint indexed)"
};


class GrabberClass {
    constructor(){
        this.laterGrabBlockDatas = [];
        this.lastBlockNum = 0;
        this.delayBlock = 2;
    }   
    async start(){

        console.log("start grabber===== !")
        let findSql = "select number from blocks order by number desc limit(1); ";
        let blockFind = await pg.query(findSql);

        if(blockFind && blockFind.rows.length>0){
            this.lastBlockNum = blockFind.rows[0].number -1;
        }
        let newBlockNumber = await config.utilWeb3.web3Methods();
        this.lastBlockNum = newBlockNumber - 10;
        let removee_block = "delete from blocks where number ="+this.lastBlockNum+1;
        let removee_LogEvent = "delete from logevent where block_number ="+this.lastBlockNum+1;
        let removee_Contract = "delete from contract where block_number ="+this.lastBlockNum+1;
        let removee_TokenTransfer = "delete from tokentransfer where block_number ="+this.lastBlockNum+1;
        let removee_InerTransaction = "delete from inertransaction where block_number ="+this.lastBlockNum+1;
        await pg.query(removee_block);
        await pg.query(removee_LogEvent);
        await pg.query(removee_Contract);
        await pg.query(removee_TokenTransfer);
        await pg.query(removee_InerTransaction);

        setInterval( async ()=>{
            let newBlockNumber = await config.utilWeb3.web3Methods();
            console.log("neBl:",newBlockNumber)
            if(this.lastBlockNum < newBlockNumber - this.delayBlock){
                this.lastBlockNum++;
                console.log("blockNumber :---",this.lastBlockNum)
                let blockData = await config.utilWeb3.web3Methods("getBlock",{"number":this.lastBlockNum});
                if(blockData){
                    this.writeBlockToDB( blockData);
                    this.writeTransactionsToDB(blockData);
                }
            }
        },1000);
        setInterval(()=>{
            if(this.laterGrabBlockDatas.length>0){
                let _blockData = this.laterGrabBlockDatas.shift();
                this.writeTransactionsToDB(_blockData);
            }
        }, 3000);
    }
    

    async writeBlockToDB(blockData) {
        blockData.txs = [];
        for(var i=0; i<blockData.transactions.length; i++){
            blockData.txs.push(blockData.transactions[i].hash);
        }
        try {
            let sql ="insert into blocks ( number ,hash , parent_hash ,nonce, sha3_uncles, logs_bloom , transactions_root,state_root, receipts_root, miner, difficulty, total_difficulty , size , extra_data,gas_limit, gas_used , timestamp, uncles,txs , witness) values (";
            let datas = "'"+blockData.number+"','"+String(blockData.hash) +"','"+ blockData.parentHash +"','"+blockData.nonce+"', '"+blockData.sha3Uncles+"','"+ blockData.logsBloom+"','"+blockData.transactionsRoot+"','"+blockData.stateRoot+"','"+ blockData.receiptsRoot+"','"+ blockData.miner.toLowerCase()+"','"+ blockData.difficulty+"','"+ blockData.totalDifficulty +"','"+ blockData.size +"','"+ blockData.extraData+"','"+blockData.gasLimit+"','"+ blockData.gasUsed +"','"+ blockData.timestamp+"','"+ JSON.stringify(blockData.uncles)+"','"+ JSON.stringify(blockData.txs) +"','"+ blockData.witness+" ');";
            await pg.query(sql+datas)
        } catch (error) {
            console.log("number existed !")
        }
        await this.updateWitness(blockData);
    }
    async updateWitness(blockData){
        let findSql = "select * from master where witness='"+blockData.witness+"'";
        let witness = await pg.query(findSql);
        if(witness.rows.length==0){
            let version;
            let extraData = await config.utilWeb3.web3Methods("hexToAscii",{"hex":blockData.extraData});
            if (extraData && extraData.length > 5) {
                version = extraData.charCodeAt(3)+"."+extraData.charCodeAt(2)+"."+extraData.charCodeAt(3);
            }
            
            let sqlsave = "insert into master (blocks_num ,last_count_to , witness, version ,status, hash,reward , miner , timestamp )values ('1','"+blockData.number+"','"+blockData.witness+"','"+version+"','true','"+blockData.hash+"',4.8,'"+blockData.miner.toLowerCase()+"','"+blockData.timestamp+"')";
            await pg.query(sqlsave);
        }else{
            let reward = witness.rows[0].reward;
            reward +=4.8;
            let blocksNum = witness.rows[0].blocks_num+1;
            let updateSql = "update master set reward = "+reward+" ,  blocks_num ='"+blocksNum+"'where witness='"+witness.rows[0].witness+"'";
            await pg.query(updateSql);
        }
    }
    async saveInerTransaction(hash,receiptData,number,timestamp){
        
        let saveSql = "insert into inertransaction (hash,from_add,to_add ,value , timestamp , blocknumber )values(";
        for(var k=0; k<receiptData.intxs.length; k++){
            let innerFrom = receiptData.intxs[k].from;
            let innerTo = receiptData.intxs[k].to;
            let innerValue = this.toFixedNum(receiptData.intxs[k].value);
            let datas = "'"+hash+"','"+innerFrom+"','"+innerTo+"','"+innerValue+"','"+timestamp+"','"+number+"');";
            await pg.query(saveSql+datas);
            await this.updateAddress(innerFrom.toLowerCase(),2);
            await this.updateAddress(innerTo.toLowerCase(),2);
        }
    }
    async createContract(txData,receiptData,number){
        let contractdb = {"tokenName":'',"decimals":0,"symbol":'',"totalSupply":0}
        let isTokenContract = true;
        
        let contractBal = await config.utilWeb3.web3Methods("getBalance",{"address":receiptData.contractAddress})
        contractdb.balance = parseInt(this.toFixedNum(contractBal));
        let code = await config.utilWeb3.web3Methods("getCode",{"address":receiptData.contractAddress})
        contractdb.byteCode = code ;
        let Token = new config.web3.eth.Contract(ERC20ABI,receiptData.contractAddress);
        if(Token ){//write Token to Contract in db
            try{
                let name = await Token.methods.name().call();
                let decimals = await Token.methods.decimals().call();
                let symbol = await Token.methods.symbol().call();
                let totalSupply = await Token.methods.totalSupply().call();
                contractdb.tokenName = name;
                contractdb.decimals = decimals;
                contractdb.symbol = symbol;
                contractdb.totalSupply = totalSupply/10**decimals;
                
            }catch(err){
                isTokenContract = false;
            }
            if(isTokenContract){//recheck
                for(var i=0; i<SMART_ERCABI.length; i++){
                    let ERC20Ele = SMART_ERCABI[i];
                    if(!Token.hasOwnProperty(ERC20Ele.name)){
                        isTokenContract = false;
                        break;
                    }
                }
            }
        }else{//not Token Contract, need verify contract for detail
            isTokenContract = false;
        }
        await this.updateAddress(receiptData.contractAddress.toLowerCase() ,1);
        contractdb.owner = txData.from;
        contractdb.blockNumber = number;
        contractdb.creationTransaction = txData.hash;
        if(isTokenContract){
            contractdb.ERC = 2;
        }else{// normal contract
            contractdb.ERC = 0;
        }
        //write to db
        try {
            // console.log("dddd---",contractdb);

            let contSql = "insert into contract( address,byte_code ,token_name, decimals,symbol, total_supply, balance,owner,block_number,creation_transaction) values ( " ;
            let datas = "'"+receiptData.contractAddress+"','"+contractdb.byteCode+"','"+contractdb.tokenName+"','"+contractdb.decimals+"','"+contractdb.symbol+"','"+contractdb.totalSupply+"','"+contractdb.balance+"','"+contractdb.owner.toLowerCase()+"','"+contractdb.blockNumber+"','"+contractdb.creationTransaction+"')";
            await pg.query(contSql+datas);
        } catch (error) {
            console.log("create contract existed");
        }
       
    }
    async writeTransactionsToDB(blockData)  {
        let noReceiptTXs = [];
        if (blockData.transactions.length > 0) {
            for (let d in blockData.transactions) {
                let txData = blockData.transactions[d];
                //receipt . maybe null at this moment
                let receiptData = await config.utilWeb3.web3Methods("getTransactionReceipt",{"txhash":txData.hash});
                if(!receiptData){
                    noReceiptTXs.push(txData);
                    continue;
                }
                txData.timestamp = blockData.timestamp;
                txData.witness = blockData.witness;
                txData.gasPrice = String(txData.gasPrice);
                txData.value = this.toFixedNum(txData.value) 
                txData.gasUsed = receiptData.gasUsed;
                txData.contractAddress = receiptData.contractAddress;
                if(receiptData.intxs){
                   await this.saveInerTransaction(txData.hash,receiptData,blockData.number,blockData.timestamp); 
                }
                if(receiptData.status!=null){
                    txData.status = receiptData.status;
                }
                    
                if(txData.input && txData.input.length>2){
                    if(txData.to == null){//createContract
                        await this.createContract(txData,receiptData,blockData.number);
                    }else{//internal transaction  . write to doc of InternalTx
                        let transferData = {"transactionHash": "", "blockNumber": 0, "amount": 0, "contractAdd":"", "to": "", "from": "", "timestamp":0};
                        let methodCode = txData.input.substr(0,10);
                        if(ERC20_METHOD_DIC[methodCode]=="transfer" || ERC20_METHOD_DIC[methodCode]=="transferFrom"){
                            if(ERC20_METHOD_DIC[methodCode]=="transfer"){//token transfer transaction
                                transferData.from= txData.from;
                                transferData.to= "0x"+txData.input.substring(34,74);
                                transferData.amount= Number("0x"+txData.input.substring(74));
                            }else{//transferFrom
                                transferData.from= "0x"+txData.input.substring(34,74);
                                transferData.to= "0x"+txData.input.substring(74,114);
                                transferData.amount= Number("0x"+txData.input.substring(114));
                            }
                            transferData.methodName = ERC20_METHOD_DIC[methodCode];
                            transferData.transactionHash= txData.hash;
                            transferData.blockNumber= blockData.number;
                            transferData.contractAdd= txData.to;

                            transferData.timestamp = blockData.timestamp;
                            //write transfer transaction into db
                            try {
                                let sqls = "insert into tokentransfer (transaction_hash, block_number,method_name, amount, contract_add , to_add,from_add, timestamp) values (";
                                let datasql = "'"+transferData.transactionHash+"','"+transferData.blockNumber+"','"+transferData.methodName+"','"+transferData.amount+"','"+transferData.contractAdd+"','"+transferData.to+"','"+transferData.from+"','"+transferData.timestamp+"')";
                                await pg.query(sqls+datasql);
                            } catch (error) {
                                console.log("token error is:",error)
                            }
                            
                        }
                        let conts = await pg.query("select * from contract where address ='"+receiptData.to.toLowerCase()+"'");
                        if(conts.rows.length>0){
                            txData.contractAddress = receiptData.to;
                        }
                    }
                }

                if(receiptData){
                    for(let k in receiptData.logs){
                        let logItem = receiptData.logs[k];
                        let logEvent = {"address":"", "txHash": "", "blockNumber": 0, "contractAdd":"", "from":"", "to":"", "timestamp":0, "methodName": "", "eventName":"", "logIndex":0, "topics":null, "data": ""};
                        logEvent.address = logItem.address;
                        logEvent.logIndex = logItem.logIndex;
                        logEvent.topics = logItem.topics;
                        logEvent.data = logItem.data;
                        var methodCode = txData.input.substr(0,10);
                        let eventCode;
                        if(ERC20_METHOD_DIC[methodCode]){
                            logEvent.methodName = ERC20_METHOD_DIC[methodCode];
                            eventCode= logItem.topics[0].substr(0,66);
                        }
                        if(METHOD_DIC[eventCode]){
                            logEvent.eventName = METHOD_DIC[eventCode];
                        }
                        logEvent.txHash= txData.hash;
                        logEvent.blockNumber= blockData.number;
                        logEvent.contractAdd= txData.to;
                        logEvent.from= receiptData.from;
                        logEvent.to= receiptData.to;
                        logEvent.timestamp = blockData.timestamp;
                        logEvent.gasUsed = receiptData.gasUsed;
                        logEvent.gasPrice = txData.gasPrice;
                        
                        try {
                            let sqlsx = "insert into logevent(address, tx_hash , block_number ,contract_add ,timestamp ,method_name , event_name ,from_add , to_add ,log_index , topics , data , gas_used , gas_price )values ("
                            let dataEvent = "'"+logEvent.address.toLowerCase()+"','"+logEvent.txHash+"','"+logEvent.blockNumber+"','"+logEvent.contractAdd+"','"+logEvent.timestamp+"','"+logEvent.methodName+"','"+logEvent.eventName+"','"+logEvent.from+"','"+logEvent.to+"','"+logEvent.logIndex+"','"+logEvent.topics+"','"+logEvent.data+"','"+logEvent.gasUsed+"','"+logEvent.gasPrice+"')";
                            await pg.query(sqlsx+dataEvent);
                        } catch (error) {
                           console.log("event log error:",error) 
                        }
                    }
                }

                if(!(txData ==null && txData.to == "0x1111111111111111111111111111111111111111" && txData.value == 0)){
                    await this.updateAddress(txData.from.toLowerCase(),2);
                    if(txData.to){
                        await this.updateAddress(txData.to.toLowerCase(),2);
                    }

                    try {
                        if(txData.status){
                            txData.status =1;
                        }else{
                            txData.status =0;
                        }
                        
                        let sqls = "insert into transaction (hash , nonce , block_hash , block_number, transaction_index ,status ,to_add ,from_add ,value , gas, contract_address, gas_used , gas_price ,timestamp , input , witness )values (";
                        let datas = "'"+txData.hash+"','"+txData.nonce+"','"+txData.blockHash+"','"+txData.blockNumber+"','"+txData.transactionIndex+"','"+txData.status+"','"+txData.to+"','"+txData.from+"','"+txData.value+"','"+txData.gas+"','"+txData.contractAddress+"','"+txData.gasUsed+"','"+txData.gasPrice+"','"+txData.timestamp+"','ssss','"+txData.witness+"');";
                        await pg.query(sqls+datas);
                    } catch (error) {
                       console.log("hash exited ")
                    }
                }
            }
            await this.updateAddress(blockData.miner.toLowerCase(),2);
        }

        //cache and grab later
        if(noReceiptTXs.length>0){
            blockData.transactions = noReceiptTXs;
            this.laterGrabBlockDatas.push(blockData);
        }
    }
    async updateAddress(address,type){
        
        let bal = await config.utilWeb3.web3Methods("getBalance",{"address":address})
        let findSql = "select * from address where addr = '"+address+"' and type ="+type;
        let addrs = await pg.query(findSql);
        if(addrs.rows.length>0){
            let updateS = "update address set balance ="+this.toFixedNum(bal)+" where addr ='"+address+"'";
            await pg.query(updateS);
        }else{
            let addS = "insert into address (addr, type, balance)values('"+address+"',"+type+","+this.toFixedNum(bal)+")";
            await pg.query(addS);
        }
    }
    hex2ascii(hexIn) {
        var hex = hexIn.toString();
        var str = '';
        for (var i = 0; i < hex.length; i += 2)
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        return str;
    }

    toFixedNum(nums){
        return (nums/10**18).toFixed(4)
    }
}
var graber = new GrabberClass();
graber.start();

