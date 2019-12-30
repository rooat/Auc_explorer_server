var config = require('../config')

exports.getBalance = async function(req,res){
    try {
        let address = req.body.address ; 
        if(config.util.invalidAddr(address)){
            let bal = await config.utilWeb3.web3Methods("getBalance",{"address":address})
            
            return res.send({"resp":bal});
        }
        return res.send({"resp":0})
    } catch (error) {
        console.log("getBalance:",getBalance)
    }
    return res.send({"resp":null})
}

exports.getPower = async function(req,res){
    try {
        let address = req.body.address;
        if(address && address.length == 42 && address.indexOf("0x")!=-1){
            let power = await config.web3.etz.getPower(address)
            power = config.web3.utils.fromWei(String(power), 'gwei');
            return res.send({"resp":power});
        }  
        return res.send({"resp":"params invalid"})
    } catch (error) {
        console.log("getPower error:",error)
    }
    return res.send({"resp":null})
}

exports.addressList = async function(req,res){
    
    try {
        let page = req.body.page;
        let ps = config.util.returnPs(page);
        let count = await config.db.Address.find({"type":2}).count();
        let addressList = await config.db.Address.find({"type":2}).sort({"balance":-1}).skip(ps).limit(10);
        return res.send({"resp":{"addrList":addressList,"count":count}});
    } catch (error) {
        console.log("getPower error:",error)
    }
    return res.send({"resp":null})
}