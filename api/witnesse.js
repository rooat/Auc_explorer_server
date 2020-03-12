var config = require("../config")

exports.getWitnesBlockNum = async (req,res)=>{
    try {
        // let start = req.query.start;
        // let end = req.query.end;
        let today_time = config.util.getTodayTime()
        let aDay = 86400000
        let map = new Map();
        let set = new Set();
        for(var i=0;i<7;i++){
            let start = (today_time-aDay*(i+1))/1000;
            let end = (today_time-aDay*i)/1000;
            console.log("start:"+start,"end:"+end)
            // console.log("end:",end)
            let datas = await config.db.Block.aggregate([{ $match : { timestamp : { $gt : start, $lte : end } } }, {$group : {_id : "$witness", num_tutorial : {$sum : 1}}}] );
            console.log("datas:",datas.length)
            if(datas && datas.length > 0){
                for(var j=0;j<datas.length;j++){
                    if(map.get(datas[j]._id)){
                        let ars = map.get(datas[j]._id);
                        ars.push(datas[j].num_tutorial);
                    }else{
                        let arr = [datas[j].num_tutorial];
                        map.set(datas[j]._id,arr);
                    }
                    if(!set.has(datas[j]._id)){
                        set.add(datas[j]._id)
                    }
                }
            }
        }
        let list = [];
        // console.log("set:",set)
        set.forEach((id)=>{
            let arr = map.get(id)
            list.push({"id":id,"data":arr})
        })

        return res.send({"resp":list})
    } catch (error) {
        console.log("e:",error)
    }
    return res.send({"resp":null})
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

exports.getRefIds = async function(req,res){
    let address = req.body.address;
    let page = req.body.page;
    try {
        let ps = config.util.returnPs(page,5);
        if(config.util.invalidAddr(address)){
            let result = await config.master.methods.getRefIds(address,ps).call();
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
                reus.totalReward = countBlock ;
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
                reus.referrer = result.referrer;
                // console.log(result)
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
            reus.referrers1 = result.referrers1;
            reus.referrers2 = result.referrers2;
            reus.referrersTotal = result.referrersTotal;
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
        let meanDayRewards = (currBlock - blockNum);
        return res.send({"resp":meanDayRewards});
    } catch (error) {
       console.log("todataReward:",error) 
    }
    return res.send({"resp":null})
}

exports.masterMesg = async function(req,res){
    try {
        let nowDate = parseInt(new Date().getTime()/1000);
        let aDay = 86400;
        let lastBlock =await config.db.Block.find({"timestamp":{$lte:(nowDate-aDay)}}).sort({"timestamp":-1}).limit(1);
        let blockNum =0;
        if(lastBlock && lastBlock.length >0){
            blockNum = lastBlock[0].number;
        }
        let currBlock = await config.utilWeb3.web3Methods();
        let meanDayRewards = (currBlock - blockNum);
        let balance = await config.utilWeb3.web3Methods("getBalance",{"address":config.utilWeb3.masterNodeAdd})
        let masters = await config.master.methods.getInfo("0x06785Ca54A786328604FF4C5889d7A9D2C8A0c52").call();
        let result = {};
        if(masters){
            result.totalNodes = masters.totalNodes;
            result.onlineNodes = masters.onlineNodes;
        }
        let currentBlockNumber = await config.utilWeb3.web3Methods();
        result.currentBlockNumber  = currentBlockNumber;
        result.totalReward = currentBlockNumber ;
        result.period = 600;
        result.periodCount = 21;
        result.balance = balance;
        result.dayReward = meanDayRewards ;
        return res.send({"resp":result});
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
            return res.send({"resp":blockCount});
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

exports.witnessNoBlock=async function(req, res){  
    let WitnessFind = await config.db.Witness.find({"blocksNum":0});
    return res.send({"resp":{"count":WitnessFind.length,"data":WitnessFind}});
}