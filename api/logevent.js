var config = require("../config")

exports.findLogOneByHash = async function(req, res){
    let hash = req.body.hash;
    let page = req.body.page;
    let ps = config.util.returnPs(page,30);
    if(config.util.invalidHash(hash)){
        let logs = await config.db.LogEvent.find({"txHash":hash}).sort({"timestamp":-1}).skip(ps).limit(30);
        return res.send({"resp":logs});
    }
    return res.send({"resp":"param invalid"});
}
