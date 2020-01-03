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
                // let firstDay =0;
                // let secDay = 0;
                // let thirDay = 0;
                // let forthDay =0;
                // let fifDay =0;
                // let sixDay =0;
                // let sevenDay =0;
                let firstDay = list.filter((block)=>block.timestamp >= (curDate-aday));
                let secDay = list.filter((block)=>block.timestamp >= (curDate-aday*2) && block.timestamp <= (curDate-aday));
                let thirDay = list.filter((block)=>block.timestamp >= (curDate-aday*3) && block.timestamp <= (curDate-aday*2));
                let forthDay = list.filter((block)=>block.timestamp >= (curDate-aday*4) && block.timestamp <= (curDate-aday*3));
                let fifDay = list.filter((block)=>block.timestamp >= (curDate-aday*5) && block.timestamp <= (curDate-aday*4));
                let sixDay = list.filter((block)=>block.timestamp >= (curDate-aday*6) && block.timestamp <= (curDate-aday*5)); 
                let sevenDay = list.filter((block)=>block.timestamp >= (curDate-aday*7) && block.timestamp <= (curDate-aday*6));
                
                // for(var i =0;i<list.length;i++){
                //     if(list[i].timestamp >= (curDate-aday)){
                //         firstDay +=1
                //     }else if(list[i].timestamp >= (curDate-aday * 2) &&  list[i].timestamp <= (curDate-aday)){
                //         secDay +=1
                //     }else if(list[i].timestamp >= (curDate-aday * 3) &&  list[i].timestamp <= (curDate-aday*2)){
                //         thirDay +=1
                //     }else if(list[i].timestamp >= (curDate-aday * 4) &&  list[i].timestamp <= (curDate-aday*3)){
                //         forthDay +=1
                //     }else if(list[i].timestamp >= (curDate-aday * 5) &&  list[i].timestamp <= (curDate-aday*4)){
                //         fifDay +=1
                //     }else if(list[i].timestamp >= (curDate-aday * 6) &&  list[i].timestamp <= (curDate-aday*5)){
                //         sixDay +=1
                //     }else if(list[i].timestamp >= (curDate-aday * 7) &&  list[i].timestamp <= (curDate-aday*6)){
                //         sevenDay +=1
                //     }
                // }
                let result = [];
                result.push(firstDay.length);
                result.push(secDay.length);
                result.push(thirDay.length);
                result.push(forthDay.length);
                result.push(fifDay.length);
                result.push(sixDay.length);
                result.push(sevenDay.length);
                // result.push(firstDay);
                // result.push(secDay);
                // result.push(thirDay);
                // result.push(forthDay);
                // result.push(fifDay);
                // result.push(sixDay);
                // result.push(sevenDay);
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