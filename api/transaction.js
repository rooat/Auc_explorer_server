var config = require("../config")
exports.txlistByAddress = async function(req,res){
    let address = req.body.address;
    let page = req.body.page;
    let ps = config.util.returnPs(page,10);
    let transactionFind = await config.db.Transaction.find({$or: [{"from": config.util.noLowUper(address)}, {"to": config.util.noLowUper(address)}]}).sort({"blockNumber":-1}).skip(ps).limit(10).lean(true);
    if(transactionFind && transactionFind.length > 0){
        let count  = await config.db.Transaction.find({$or:[{"to":config.util.noLowUper(address)},{"from":config.util.noLowUper(address)}]}).count();
        return res.send({"resp":{"txList":transactionFind,"count":count}})
    }
    return res.send({"resp":null})
}

exports.txByHash = async function(req,res){
  let hash = req.body.hash;
  if(config.util.invalidHash(hash)){
    let transaction = await config.db.Transaction.findOne({"hash":hash});
    if(!transaction){
      transaction = await config.utilWeb3.web3Methods("getTransaction",{"txhash":hash});
    }
    return res.send({"resp":transaction});
  }
  return res.send({"resp":"param invalid"});

}

exports.txList = async function(req,res){
  let page = req.body.page;
  let ps = config.util.returnPs(page,10);
  let count = await config.db.Transaction.find().count() 
  let txList = await config.db.Transaction.find().sort({"blockNumber":-1}).skip(ps).limit(10);
  return res.send({"resp":{"count":count,"txList":txList}})
}
