var config = require('../config')
var versions = require('../solcversion.json');

exports.updateVersion = async function(req,res){
    try {
        let version = req.body.version;
        let versionCode = req.body.versionCode;
        let url = req.body.url;
        let content = req.body.content;
        let username = req.body.username;
        let password = req.body.password;
        if(version && versionCode && url && content && username && password){
            if(username == "auchainorg" && password =="dga@@#%%343434kjdg%"){
                let wallet = await config.db.WalletVersion.findOne({"version":version});
                // console.log(wallet)
                if(wallet){
                    let ss = await config.db.WalletVersion.update({"_id":wallet._id},{
                        $set:{
                            "versionCode":versionCode,
                            "url":url,
                            "content":content
                        }
                    })
                    // console.log(ss)
                    return res.send({"resp":"Update Success"})
                }else{
                    await config.db.WalletVersion({
                        "version":version,
                        "versionCode":versionCode,
                        "url":url,
                        "content":content
                    }).save();
                    return res.send({"resp":"Add Success"});
                }
            }
            return res.send({"resp":"username or password invalid"})
        }
        return res.send({"resp":"params invalid "})

        
    } catch (error) {
      console.log("update wallet:",error)  
    }
    return res.send({"resp":null})
    
}

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