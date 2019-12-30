
var config = require('../config')
var versions = require('../solcversion.json');
var wrapper = require('solc/wrapper.js')

exports.tokenInfo = async function(req,res){
    let contractAdd = req.body.address;
    if(config.util.invalidAddr(contractAdd)){
       let dbToken =  await config.db.Contract.findOne({"address":config.util.noLowUper(contractAdd)});
       let tokenData = {
            "balance": dbToken.balance,
            "totalSupply": dbToken.totalSupply/10**dbToken.decimals,//dbToken.totalSupply.toEther(actualBalance, 'wei');
            "tokenHolders": 2,//tt fix, wait to dev
            "name": dbToken.tokenName,
            "ERC":dbToken.ERC,
            "symbol": dbToken.symbol,
            "bytecode": dbToken.byteCode,
            "transaction": dbToken.creationTransaction,
            "creator": dbToken.owner,
            "decimals": dbToken.decimals,
            "isVerified":dbToken.sourceCode!=null,
            "address":contractAdd
         };
         return res.send({"resp":tokenData});
    }
    return res.send({"resp":"params invalid"})
}
exports.tokenBalance = async function(req, res){
    let address = req.body.address;
    let contractAdd = req.body.contractAdd;
    if(config.util.invalidAddr(address) && config.util.invalidAddr(contractAdd)){
        let Token = new config.web3.eth.Contract(config.tokenABI,contractAdd);
        if(Token){
            let bal = await Token.methods.balanceOf(address).call();
            return res.send({"resp":bal});
        }
        return res.send({"resp":"token invalid"})
    }
    return res.send({"resp":"params invalid"})
}

exports.tokenTransferByHash = async function(req,res){
  try {
    let hash = req.body.hash;
    if(config.util.invalidHash(hash)){
      let tokenTransfer = await config.db.TokenTransfer.findOne({"transactionHash":hash});
      return res.send({"resp":tokenTransfer})
    }
    return res.send({"resp":"params invalid"});
  } catch (error) {
    console.log("tokenTransferByHash:",error)
  }
  return res.send({"resp":null}) 
}

exports.tokenTransferByAddress = async function(req,res){
  try {
    let address = req.body.address;
    let page = req.body.page;
    let ps = config.util.returnPs(page,10);
    if(config.util.invalidAddr(address)){
      let count = await config.db.TokenTransfer.find({$or:[{"from":config.util.noLowUper(address)},{"to":config.util.noLowUper(address)}]}).count(); 
      let tokenTrafer = await config.db.TokenTransfer.find({$or:[{"from":config.util.noLowUper(address)},{"to":config.util.noLowUper(address)}]}).sort({"blockNumber":-1}).skip(ps).limit(10);
      return res.send({"resp":{"transList":tokenTrafer,"count":count}});
    }
    return res.send({"resp":"params invalid"})
  } catch (error) {
    console.log("error:",error);
  }
  return res.send({"resp":null})
}

exports.tokenTransferByContract = async function(req,res){
    let contractAdd = req.body.address;
    let page = req.body.page;
    let ps = config.util.returnPs(page,10);
    if(config.util.invalidAddr(contractAdd)){
        let count = await config.db.TokenTransfer.find({"contractAdd":contractAdd}).count();
        let txList = await config.db.TokenTransfer.find({"contractAdd":contractAdd}).sort({"blockNumber":-1}).skip(ps).limit(10);
        return res.send({"resp":{"txList":txList,"count":count}})
    }
    return res.send({"resp":"params invalid"});
}

exports.tokenList = async function(req,res){
    try {
        let page = req.body.page;
        if(page || page<=0){
            page = 1;
        }
        let ps = (page -1) * 10;
        let tokenCount = await config.db.Address.find({"type":1}).count();
        let tokenres = await config.db.Address.find({"type":1}).skip(ps).limit(10);
        let result = {
            "tokenCount":tokenCount,
            "tokenList":tokenres
        }
        return res.send({"resp":result});
    } catch (error) {
        console.log("tokenList: eroor: ",error)
    }
    return res.send({"resp":null})
}

exports.txListContract = async function(req, res){
    let contractAdd = req.body.address;
    let page = req.body.page;
    let ps = config.util.returnPs(page,10);
    if(config.util.invalidAddr(contractAdd)){
        let tx = await config.db.Transaction.find({"to":config.util.noLowUper(contractAdd)}).sort({"blockNumber":-1}).skip(ps).limit(10);
        let count = await config.db.Transaction.find({"to":config.util.noLowUper(contractAdd)}).count();
        return res.send({"resp":{"txList":tx,"count":count}});
    }
    return res.send({"resp":"param invalid"})
}

exports.compileContract = async function(req, res){
    let address = req.body.address;
    let version = req.body.version;
    let name = req.body.name;
    let input = req.body.code;
    let optimization = (req.body.optimization ==1) ? true:false;
    
  console.log("address:",address)
  console.log("version:",version)
  console.log("name:",name)
  console.log("input:",input)
  console.log("optimization:",optimization)
    try {
      if(config.util.invalidAddr(address) && version && name && input && optimization ){
        let versionList = versions.releases;
        let wantVersion ; 
        for(var key in versionList){  
            let versionss = versionList[key];
            if(versionss.indexOf(version)==-1){
              return res.send({"resp":"version invalid"})
            }else{
              wantVersion = versions;
            }
        }
        console.log("wanteVersion:",wantVersion);
        let vers = require('../solcbin/'+wantVersion);
        let newSolc = wrapper(vers);
      
        let inputJson = {
          language: 'Solidity',
          settings: {
            optimizer: {
              enabled: optimization,
              runs: 200
            },
            outputSelection: {
              '*': {
                '*': ['*']
              }
            }
          },
        "sources" : {
            'xxx.sol':{
              content: input
            }
          }
        }
        let output = JSON.parse(newSolc.compile(JSON.stringify(inputJson)))
        let compileByteCode = output.contracts['xxx.sol'][name].evm.bytecode.object;
        let bytecode = await config.utilWeb3.web3Methods("getCode",{"address":address})
        bytecode = bytecode.substr(2)
        var testCode = bytecode.substring(10);
        var endIndex = testCode.length;
        if(testCode.indexOf("7a7a72305820")>-1)
            endIndex = testCode.indexOf("7a7a72305820");
        else if(testCode.length>68){
            endIndex = 68
        }
        if(endIndex==-1)
            endIndex = testCode.length;
        testCode = testCode.substring(0,endIndex);

        if(compileByteCode.indexOf(testCode)!=-1){
            console.log("true")
            await config.db.Contract.update(
              {address: address},
              {$set:{'compilerVersion':version, 'optimization':optimization, 'contractName':name, 'sourceCode':input}},
              {multi: false, upsert: false});
            let contract = await config.db.Contract.findOne({"address":config.util.noLowUper(address)});
            return res.send({"resp":{"status":true,"contract":contract}})
        }else{
            console.log("false")
            return res.send({"resp":{"status":false,"contract":null}})
        }
      }
      return res.send({"resp":"params invalid"})
    } catch (error) {
      console.log("compileContract:",error);
    }

    return res.send({"resp":null})
}