var config = require('../config')

exports.getBlock = async function(req,res){
    let number = req.body.number;
    if(number >= 0){
        let block =  await config.db.Block.findOne({"number":number});
        if(!block){
            block = await config.utilWeb3.web3Methods("getBlock",{"number":number})
        }
        return res.send({"resp":block})
    }
    return res.send({"resp":"param invalid"})
}

exports.getBlockTxTps = async function(req,res){
    let currentBlock = await config.utilWeb3.web3Methods();
    let blockData = await config.db.Block.find().sort({"number":-1}).limit(50);
    if(blockData){
        let result = {};
        result.blockHeight = currentBlock;
        let totalTXs = 0;
        let costTime = blockData[0].timestamp-blockData[blockData.length-1].timestamp;
        let blockTime = costTime/(blockData.length-1);
        result.blockTime = Math.round(blockTime*1000)/1000;
        for(var i=0; i<blockData.length; i++){
            if(blockData[i].txs)
            totalTXs+=blockData[i].txs.length;
        }
        let TPS = totalTXs/costTime;
        result.TPS = Math.round(TPS*1000)/1000;
        let today = parseInt(new Date().getTime()/1000);
        let lastBlock = await config.db.Block.find({"timestamp":{$lte:(today-86400)}}).sort({"timestamp":-1}).limit(1);
        let blockNum =0;
        if(lastBlock && lastBlock.length >0){
            blockNum = lastBlock[0].number;
        }
        let currBlock = await config.utilWeb3.web3Methods();
        result.meanDayRewards = (currBlock - blockNum)*4.8;
        result.blocks = blockData;
        return res.send({"resp":result});
    }
}
