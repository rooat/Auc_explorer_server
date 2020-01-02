var config = require('../config')

exports.getBlockByNumber = async function(req,res){
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

exports.getBlockList = async function(req,res){
    try {
        let page = req.body.page;
        let ps = config.util.returnPs(page,10);
        let count = await config.db.Block.find().count();
        let blockList = await config.db.Block.find().sort({"number":-1}).skip(ps).limit(10);
        return res.send({"resp":{"blockList":blockList,"count":count}});
    } catch (error) {
        console.log("getBlockList:",error);
    }
    return res.send({"resp":null})
}

exports.getBlockListById = async function(req,res){
    try {
        let id = req.body.id;
        let page = req.body.page;
        let ps = config.util.returnPs(page,10);
        if(id && id.indexOf("0x")!=-1){
            let count = await config.db.Block.find({"witness":id}).count();
            let blocks = await config.db.Block.find({"witness":id}).sort({"number":-1}).skip(ps).limit(10);
            return res.send({"resp":{"count":count,"list":blocks}})
        }
        return res.send({"resp":"param invalid"});
    } catch (error) {
        console.log("getBlockListById:",error);
    }
    return res.send({"resp":null})
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

exports.getBlockCharDataByWitness = async function(req,res){
    try {
        let witness = req.body.witness;
        if(witness){
            let aday = 60*60*24;
            let curDate = parseInt(new Date().getTime()/1000) ;
            let curD = curDate - aday*7;
            let list = await config.db.Block.find({"witness":witness,"timestamp":{$gte:curD}}).sort({"timestamp":-1}).limit(25000);
            if(list && list.length>0){
                let firstDay =[];
                let secDay = [];
                let thirDay = [];
                let forthDay =[];
                let fifDay =[];
                let sixDay =[];
                let sevenDay =[];
                for(var i =0;i<list.length;i++){
                    if(list[i].timestamp >= (curDate-aday)){
                        firstDay.push(list[i])
                    }else if(list[i].timestamp >= (curDate-aday * 2) &&  list[i].timestamp <= (curDate-aday)){
                        secDay.push(list[i])
                    }else if(list[i].timestamp >= (curDate-aday * 3) &&  list[i].timestamp <= (curDate-aday*2)){
                        thirDay.push(list[i]) 
                    }else if(list[i].timestamp >= (curDate-aday * 4) &&  list[i].timestamp <= (curDate-aday*3)){
                        forthDay.push(list[i])
                    }else if(list[i].timestamp >= (curDate-aday * 5) &&  list[i].timestamp <= (curDate-aday*4)){
                        fifDay.push(list[i])
                    }else if(list[i].timestamp >= (curDate-aday * 6) &&  list[i].timestamp <= (curDate-aday*5)){
                        sixDay.push(list[i])
                    }else if(list[i].timestamp >= (curDate-aday * 7) &&  list[i].timestamp <= (curDate-aday*6)){
                        sevenDay.push(list[i])
                    }
                }
                let result = {};
                result.fifDay = firstDay;
                result.secDay = secDay;
                result.thirDay = thirDay;
                result.forthDay = forthDay;
                result.fifDay = fifDay;
                result.sixDay = sixDay;
                result.sevenDay = sevenDay;
                return res.send({"resp":result})
            }
        }
        return res.send({"resp":"params invalid"});
    } catch (error) {
        console.log("getBlockByWitness:",error);   
    }
    return res.send({"resp":null})
}

exports.getBlockListByWitness = async function(req,res){
    try {
        let witness = req.body.witness;
        let page = req.body.page;
        let ps = config.util.returnPs(page,10);
        if(witness){
            let count = await config.db.Block.find({"witness":witness}).count();
            let List = await config.db.Block.find({"witness":witness}).sort({"number":-1}).skip(ps).limit(10);
            return res.send({"resp":{"count":count,"list":List}})
        }
        return res.send({"resp":"param invalid"});
    } catch (error) {
      console.log("getBlockListByWitness:",error)  
    }
    return res.send({"resp":null});
}