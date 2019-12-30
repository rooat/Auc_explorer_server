var config = require("../config")

exports.totalMasterNodes = async function(req,res){
    let count = await config.db.Witness.find().count();
    return res.send({"resp":count})
}

exports.getIds = async function(req,res){
    let address = req.body.address;
    let page = req.body.page;
    try {
        let ps = config.util.returnPs(page,5);
        if(config.util.invalidAddr(address)){
            let result = await config.master.methods.getIds(address,ps).call();
            if(result){
                return res.send({"resp":result.data})
            }
            return res.send({"resp":null})
        }
        return res.send({"resp":"param invalid"})
    } catch (error) {
      return res.send({"resp":null})  
    }
}
exports.nodes = async function(req,res){
    try {
        let ids = req.body.id;
        if(ids ){
            if(ids.indexOf("0x")==-1){
                ids = "0x"+ids;
            }
            let result = await config.master.methods.nodes(ids).call();
            if(result){
                let reus ={};
                let idxx = ids.substr(2);
                
                let countBlock = await config.db.Block.find({"witness":idxx}).count();
                reus.totalReward = countBlock*4.8;
                reus.coinbase = result.coinbase;
                reus.status = result.status;
                let curBlockNumber = await config.utilWeb3.web3Methods();
                let blockEnd =0;
                if(result.blockEnd > curBlockNumber ){
                    let curBlock = await config.utilWeb3.web3Methods("getBlock",{"number":curBlockNumber})
                    let curTime = curBlock.timestamp;
                    blockEnd = curTime + (result.blockEnd - curBlockNumber)*3
                }else{
                    blockEnd = await returnBlockTime(result.blockEnd);
                }
                let blockRegister = await returnBlockTime(result.blockRegister);
                let blockLastPing = await returnBlockTime(result.blockLastPing); 
                let blockOnline = result.blockOnline;
                let blockOnlineAcc = result.blockOnlineAcc;
                reus.blockEnd = blockEnd;
                reus.blockRegister = blockRegister;
                reus.blockLastPing = blockLastPing;
                reus.blockOnline = blockOnline;
                reus.blockOnlineAcc = blockOnlineAcc;
                return res.send({"resp":reus})
            }
            return res.send({"resp":null})
        }
        return res.send({"resp":"param invalid"})
    } catch (error) {
        return res.send({"resp":null})
    }
    
}
async function returnBlockTime(number){
    let block = await config.utilWeb3.web3Methods("getBlock",{"number":number});
    if(block){
        return block.timestamp;
    }
    return 0;
}

exports.getInfo = async function(req,res){
  try {
    let address = req.body.address;
    if(config.util.invalidAddr(address)){
       
        let result = await config.master.methods.getInfo(address).call();
        if(result){
            let reus ={};
            reus.lockedBalance = result.lockedBalance;
            reus.releasedReward = result.releasedReward;
            reus.totalNodes = result.totalNodes;
            reus.onlineNodes = result.onlineNodes;
            reus.expiredNodes = result.expiredNodes;
            reus.myValidNodes = result.myValidNodes;
            reus.myExpiredNodes = result.myExpiredNodes;
            return res.send({"resp":reus})
        }
        return res.send({"resp":null})
    }
    return res.send({"resp":"param invalid"})
  } catch (error) {
    return res.send({"resp":null})  
  }
}

exports.todayRewards = async function(req,res){
    try {
        let nowDate = parseInt(new Date().getTime()/1000);
        let aDay = 86400;
        let lastBlock =await config.db.Block.find({"timestamp":{$lte:(nowDate-aDay)}}).sort({"timestamp":-1}).limit(1);
        let blockNum =0;
        if(lastBlock && lastBlock.length >0){
            blockNum = lastBlock[0].number;
        }
        let currBlock = await config.utilWeb3.web3Methods();
        let meanDayRewards = (currBlock - blockNum)*4.8;
        return res.send({"resp":meanDayRewards});
    } catch (error) {
       console.log("todataReward:",error) 
    }
    return res.send({"resp":null})
}

exports.weekRewardsById = async function(req,res){
    try {
        let id = req.body.id;
        if(id){
            if(id.indexOf("0x")!=-1){
                id = id.substr(2);
            }
            let nowDate = parseInt(new Date().getTime()/1000);
            let aWeek = 86400*7;
            let blockCount =await config.db.Block.find({"witness":id,"timestamp":{$gte:(nowDate-aWeek)}}).count();
            reward = blockCount * 4.8;
            return res.send({"resp":reward});
        }
       return res.send({"resp":"param invalid"}) 
    } catch (error) {
       console.log("weekRewardsById:",error) 
    }
    return res.send({"resp":null})
}


exports.witnessList=async function(req, res){  
    let page = req.body.page;
    let ps = config.util.returnPs(page,10);
    let count = await config.db.Witness.find().count();

    let WitnessFind = await config.db.Witness.find({}).sort({"lastCountTo":-1}).skip(ps).limit(10);
    let result = {}
    result.count = count;
    result.WitnessFind = WitnessFind;
    return res.send({"resp":result});
}