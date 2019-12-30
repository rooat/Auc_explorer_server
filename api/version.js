var config = require('../config')

exports.versionCheck = async function(req,res){
    let wallet = await config.db.WalletVersion.find().sort({"createAt":-1}).limit(1);
    let result = {
        "status":"1",
        "message":"OK",
        "result":wallet[0]}

    return res.send({"resp":result});
}