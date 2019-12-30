
require( '../db.js' );
var configs = require("../config")
var web3 = configs.web3;
var mongoose = require( 'mongoose' );
var Block     = mongoose.model( 'Block' );
var Transaction     = mongoose.model( 'Transaction' );
var Contract     = mongoose.model( 'Contract' );
var TokenTransfer = mongoose.model( 'TokenTransfer' );
var LogEvent = mongoose.model( 'LogEvent' );
var Witness = mongoose.model( 'Witness' );
var Address = mongoose.model( 'Address' );
var InerTransaction = mongoose.model( 'InerTransaction' );

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

var laterGrabBlockDatas = [];

var grabBlocks =async function() {
    console.log("start grabber===== !")
    let lastBlockNum = 0 ;
    let delayBlock = 2;//t delay grabber block num
    let blockFind =await Block.findOne({}, "number").sort('-number');
    if(blockFind){
        lastBlockNum = blockFind.number -1;
        // lastBlockNum = 4524
    }
    // let newBlockNumber = await configs.utilWeb3.web3Methods();
    // lastBlockNum = newBlockNumber - 10;
    Block.collection.remove({'number':lastBlockNum+1});
    LogEvent.collection.remove({'blockNumber':lastBlockNum+1});
    Contract.collection.remove({'blockNumber':lastBlockNum+1});
    TokenTransfer.collection.remove({'blockNumber':lastBlockNum+1});
    InerTransaction.collection.remove({'blockNumber':lastBlockNum+1});

    setInterval( async ()=>{
        let newBlockNumber = await configs.utilWeb3.web3Methods();
        console.log("neBl:",newBlockNumber)
        if(lastBlockNum < newBlockNumber-delayBlock){
            lastBlockNum++;
            grabBlock( lastBlockNum);
        }
    },1000);
    
}

var grabBlock = async function(desiredBlockHashOrNumber) {
    console.log("blockNumber :---",desiredBlockHashOrNumber)
    let blockData = await configs.utilWeb3.web3Methods("getBlock",{"number":desiredBlockHashOrNumber});
    if(blockData){
        writeBlockToDB( blockData);
        writeTransactionsToDB(blockData);
    }
}


var writeBlockToDB =async function(blockData) {
    blockData.txs = [];
    for(var i=0; i<blockData.transactions.length; i++){
        blockData.txs.push(blockData.transactions[i].hash);
    }
    let block = await configs.db.Block.findOne({"hash":blockData.hash})
    if(!block){
        await configs.db.Block(blockData).save();
        let version;
        let extraData = hex2ascii(blockData.extraData);
        if (extraData && extraData.length > 5) {
            version = extraData.charCodeAt(3)+"."+extraData.charCodeAt(4)+"."+extraData.charCodeAt(5);
        }
        await configs.db.Witness.update({"witness":blockData.witness},
        {$set:{"lastCountTo":blockData.number, "version": version, "hash":blockData.hash, "miner":blockData.miner, "timestamp":blockData.timestamp, "status":true},
        $inc:{"blocksNum":1, "reward":0.3375}},
        {upsert: true});

    }
}

var upsertAddress=function(miner, addrs){
    if(miner){
        //add reward to master node
        Address.update({"addr":miner},
            {$set:{"type":2}, $inc:{"balance":0.3375}},
            {upsert: true},
            function (err, doc) {
                if(err)
                    console.log("err:", err);
            }
        )
    }
    if(addrs){
        for(let i=0; i<addrs.length; i+=2){
            Address.update({"addr":addrs[i]},
                // {$set:{"balance":balance}},
                {$inc:{"balance":Number(addrs[i+1])}},
                {upsert: false},
                function (err, doc) {
                    if(err){
                        console.log("Address.update err:", err);
                        return;
                    }else if(!doc || doc.n==0){
                        updateFromNode(addrs[i]);
                    }

                }
            )
        }
    }
}

var updateFromNode = async function(addr){
    var balance = await configs.utilWeb3.web3Methods("getBalance",{"address":addr}) 
    if(balance<10000000000000000000)//save address which balance is great than 10 ETZ
        return;
    Address.insertMany([{"addr":addr, "balance":Number(toFixedNum(balance))}], function (err, doc) {
        if(err){
            console.log("updateFromNode err:", err);
            return;
        }
    });
}

/**
    Break transactions out of blocks and write to DB
**/

var writeTransactionsToDB = async function(blockData) {
    // var bulkOps = [];
    var innerTxs = null;
    var noReceiptTXs = [];
    var addrs = [];
    if (blockData.transactions.length > 0) {
        for (d in blockData.transactions) {
            let txData = blockData.transactions[d];
            //receipt . maybe null at this moment
            let receiptData = await configs.utilWeb3.web3Methods("getTransactionReceipt",{"txhash":txData.hash});
            if(!receiptData){
                noReceiptTXs.push(txData);
                continue;
            }
            txData.timestamp = blockData.timestamp;
            txData.witness = blockData.witness;
            txData.gasPrice = String(txData.gasPrice);//etherUnits.toEther(txData.gasPrice, 'ether');
            txData.value = toFixedNum(txData.value) 
            txData.gasUsed = receiptData.gasUsed;
            txData.contractAddress = receiptData.contractAddress;
            if(receiptData.intxs){
                innerTxs = [];
                for(var k=0; k<receiptData.intxs.length; k++){
                    var innerFrom = receiptData.intxs[k].from;
                    var innerTo = receiptData.intxs[k].to;
                    var innerValue = toFixedNum(receiptData.intxs[k].value);
                    innerTxs.push({hash: txData.hash,"from":innerFrom, "to":innerTo, "value":innerValue,"blockNumber":blockData.number, "timestamp":blockData.timestamp});
                    addrs.push(innerFrom, "-"+innerValue);
                    addrs.push(innerTo, innerValue);
                }
            }
            if(receiptData.status!=null)
                txData.status = receiptData.status;

            if(txData.input && txData.input.length>2){// contract create, Event logs of internal transaction
                if(txData.to == null){//contract create
                    //console.log("contract create at tx:"+txData.hash);
                    var contractdb = {}
                    var isTokenContract = true;
                    var Token = new web3.eth.Contract(ERC20ABI,receiptData.contractAddress);
                    if(Token){//write Token to Contract in db
                        try{
                            let contractBal = await configs.utilWeb3.web3Methods("getBalance",{"address":receiptData.contractAddress})
                            let code = await configs.utilWeb3.web3Methods("getCode",{"address":receiptData.contractAddress})
                            contractdb.byteCode = code ;
                            contractdb.tokenName = Token.name();
                            contractdb.decimals = Token.decimals();
                            contractdb.symbol = Token.symbol();
                            contractdb.totalSupply = Token.totalSupply();
                            contractdb.balance = contractBal
                        }catch(err){
                            isTokenContract = false;
                        }
                        if(isTokenContract){//recheck
                            for(var i=0; i<SMART_ERCABI.length; i++){
                                var ERC20Ele = SMART_ERCABI[i];
                                if(!Token.hasOwnProperty(ERC20Ele.name)){
                                    isTokenContract = false;
                                    break;
                                }
                            }
                        }
                    }else{//not Token Contract, need verify contract for detail
                        isTokenContract = false;
                    }
                    Address.insertMany([{"addr":receiptData.contractAddress, "type":1, "balance":0}], function (inserAddrErr, insertDoc) {
                        if(inserAddrErr){
                            console.log("inserAddrErr:", inserAddrErr);
                        }
                    });
                    contractdb.owner = txData.from;
                    contractdb.blockNumber = blockData.number;
                    contractdb.creationTransaction = txData.hash;
                    if(isTokenContract){
                        contractdb.ERC = 2;
                    }else{// normal contract
                        // console.log("normal contract");
                        contractdb.ERC = 0;
                    }
                    //write to db
                    Contract.update(
                        {address: receiptData.contractAddress},
                        {$setOnInsert: contractdb},
                        {upsert: true},
                        function (err, data) {
                            if(err)
                                console.log(err);
                        }
                    );
                }else{//internal transaction  . write to doc of InternalTx
                    var transferData = {"transactionHash": "", "blockNumber": 0, "amount": 0, "contractAdd":"", "to": "", "from": "", "timestamp":0};
                    var methodCode = txData.input.substr(0,10);
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
                        TokenTransfer.update(
                            {transactionHash: transferData.transactionHash},
                            {$setOnInsert: transferData},
                            {upsert: true},
                            function (err, data) {
                                if(err)
                                    console.log(err);
                            }
                        );
                    }
                }
            }

            if(receiptData){
                logEvents = [];
                for(k in receiptData.logs){
                    var logItem = receiptData.logs[k];
                    var logEvent = {"address":"", "txHash": "", "blockNumber": 0, "contractAdd":"", "from":"", "to":"", "timestamp":0, "methodName": "", "eventName":"", "logIndex":0, "topics":null, "data": ""};
                    logEvent.address = logItem.address;
                    logEvent.logIndex = logItem.logIndex;
                    logEvent.topics = logItem.topics;
                    logEvent.data = logItem.data;
                    var methodCode = txData.input.substr(0,10);
                    if(ERC20_METHOD_DIC[methodCode])
                        logEvent.methodName = ERC20_METHOD_DIC[methodCode];
                    var eventCode = logItem.topics[0].substr(0,66);
                    if(METHOD_DIC[eventCode])
                        logEvent.eventName = METHOD_DIC[eventCode];
                    logEvent.txHash= txData.hash;
                    logEvent.blockNumber= blockData.number;
                    logEvent.contractAdd= txData.to;
                    logEvent.from= receiptData.from;
                    logEvent.to= receiptData.to;
                    logEvent.timestamp = blockData.timestamp;
                    logEvent.gasUsed = receiptData.gasUsed;
                    logEvent.gasPrice = txData.gasPrice;
                    logEvents.push(logEvent);
                }
                //write all type of internal transaction into db
                if(logEvents.length>0){
                    LogEvent.collection.insert(logEvents, function( err, logE ){
                        if ( typeof err !== 'undefined' && err ) {
                            if (err.code == 11000) {
                                //console.log('Skip: Duplicate key ' + err);
                            } else {
                            console.log('LogEvent Error: Aborted due to error: ' + err);
                        }
                        } 
                    });
                }
            }

            if(!(txData ==null && txData.to == "0x1111111111111111111111111111111111111111" && txData.value == 0)){
                if(Number(txData.value)>0){
                    if(txData.from)
                        addrs.push(txData.from, "-"+txData.value);
                    if(txData.to)
                        addrs.push(txData.to, txData.value);
                }
                // bulkOps.push(txData);
                let tx = await configs.db.Transaction.findOne({"hash":txData.hash});
                if(!tx){
                    await configs.db.Transaction(txData).save();
                }
            }
        }

        //collect address
        upsertAddress(blockData.miner, addrs);

        //write innerTxs to db
        if(innerTxs && innerTxs.length>0){
            InerTransaction.collection.insert(innerTxs, function( err, tx ){
                if ( typeof err !== 'undefined' && err ) {
                    if (err.code == 11000) {
                        //console.log('Skip: Duplicate key ' + err);
                    } else {
                        console.log('innerTxs Error: Aborted due to error: ' + err);
                    }
                } else{
                    //console.log('DB successfully written for innerTxs ' + innerTxs.toString() );
                }
            });
        }

        //write all type of transaction into db
        // if(bulkOps.length>0){
        //     Transaction.collection.insert(bulkOps, function( err, tx ){
        //         if ( typeof err !== 'undefined' && err ) {
        //             if (err.code == 11000) {
        //                 //console.log('Skip: Duplicate key ' + err);
        //             } else {
        //                 console.log('Transaction Error: Aborted due to error: ' + err);
        //             }
        //         } else{
        //             //console.log('DB successfully written for block ' + blockData.transactions.length.toString() );
        //         }
        //     });
        // }

    }

    //cache and grab later
    if(noReceiptTXs.length>0){
        blockData.transactions = noReceiptTXs;
        laterGrabBlockDatas.push(blockData);
    }
}


var blockIter = function(web3, firstBlock, lastBlock) {
    if (lastBlock < firstBlock)
        return;
    if (lastBlock - firstBlock === 1) {
        [lastBlock, firstBlock].forEach(function(blockNumber) {
            Block.find({number: blockNumber}, function (err, b) {
                if (!b.length)
                    grabBlock( firstBlock);
            });
        });
    } else if (lastBlock === firstBlock) {
        Block.find({number: firstBlock}, function (err, b) {
            if (!b.length)
                grabBlock( firstBlock);
        });
    } else {

        Block.count({number: {$gte: firstBlock, $lte: lastBlock}}, function(err, c) {
          var expectedBlocks = lastBlock - firstBlock + 1;
          if (c === 0) {
            grabBlock( {'start': firstBlock, 'end': lastBlock});
          } else if (expectedBlocks > c) {
            //console.log("Missing: " + JSON.stringify(expectedBlocks - c));
            var midBlock = firstBlock + parseInt((lastBlock - firstBlock)/2);
            blockIter(web3, firstBlock, midBlock);
            blockIter(web3, midBlock + 1, lastBlock);
          } else
            return;
        })
    }
}

//periodically grab TX which has no TXReceipt while block grabbing
setInterval(function(){
    if(laterGrabBlockDatas.length>0){
        console.log("[!]laterGrabBlockDatas.length:"+laterGrabBlockDatas.length);
        var _blockData = laterGrabBlockDatas.shift();
        if(!_blockData.hasOwnProperty("grabTime")){
            _blockData.grabTime=0;
        }else{
            _blockData.grabTime++;
        }
        if(_blockData.grabTime>5){//5 tries at most
            for(var i=0; i<_blockData.transactions.length; i++){
                console.log("no transactionReceipt: "+_blockData.transactions[i].hash);
            }
            return;
        }

        writeTransactionsToDB(_blockData);
    }
}, 3000);

var hex2ascii = function (hexIn) {
    var hex = hexIn.toString();
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

function toFixedNum(nums){
    return (nums/10**18).toFixed(4)
}

grabBlocks();
