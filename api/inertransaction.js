var config = require("../config")

exports.innerTxOneByHash = async function(req,res){
    try {
        let hash = req.body.hash;
        if(config.util.invalidHash(hash)){
            let tx = await config.db.InerTransaction.findOne({"hash":hash}); 
            return res.send({"resp":tx});
        }
        return res.send({"resp":"param invalid"})
    } catch (error) {
        console.log("innerTxByHash:",innerTxByHash)
    }
    return res.send({"resp":null})
}

exports.innerTxListByAddress = async function(req,res){
    try {
        let address = req.body.address;
        let page = req.body.page;
        let ps = config.util.returnPs(page,10);
        if(config.util.invalidAddr(address)){
            let tx = await config.db.InerTransaction.find({$or:[{"from":config.util.noLowUper(address)},{"to":config.util.noLowUper(address)}]}).sort({"blockNumber":-1}).skip(ps).limit(10); 
            let count = await config.db.InerTransaction.find({$or:[{"from":config.util.noLowUper(address)},{"to":config.util.noLowUper(address)}]}).count();
            return res.send({"resp":{"txList":tx,"count":count}});
        }
        return res.send({"resp":"param invalid"})
    } catch (error) {
        console.log("innerTxByHash:",innerTxByHash)
    }
    return res.send({"resp":null})
}