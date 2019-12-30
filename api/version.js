var config = require('../config')
var versions = require('../solcversion.json');

exports.versionCheck = async function(req,res){
    let wallet = await config.db.WalletVersion.find().sort({"createAt":-1}).limit(1);
    let result = {
        "status":"1",
        "message":"OK",
        "result":wallet[0]}

    return res.send({"resp":result});
}

exports.solcVersion = async function(){
    try {
        let release = versions.releases;
        return res.send({"resp":release});
    } catch (error) {
      console.log("solcVerson:",error)  
    }
    return res.send({"resp":null})
}