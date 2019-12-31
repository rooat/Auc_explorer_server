
var config = require('../config')
var versions = require('../solcversion.json');
var wrapper = require('solc/wrapper.js')

const ERC223ABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"_name","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"_totalSupply","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"_decimals","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MAX_UINT256","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"_symbol","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_data","type":"bytes"},{"name":"_custom_fallback","type":"string"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":true,"name":"data","type":"bytes"}],"name":"Transfer","type":"event"}];
const ERC20ABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenAddress","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}];
const SMART_ERCABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"}/*,{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}*/];

exports.tokenInfo = async function(req,res){
    let contractAdd = req.body.address;
    if(config.util.invalidAddr(contractAdd)){
       let dbToken =  await config.db.Contract.findOne({"address":config.util.noLowUper(contractAdd)});
       if(dbToken){
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
       return res.send({"resp":null})
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
      let count = await config.db.TokenTransfer.find({"transactionHash":hash}).count();
      let tokenTransfer = await config.db.TokenTransfer.find({"transactionHash":hash});
      return res.send({"resp":{"count":count,"txlist":tokenTransfer}})
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
    let startNum = req.body.startNum;
    let endNum = req.body.endNum;
    
    let page = req.body.page;
    let ps = config.util.returnPs(page,10);
    if(config.util.invalidAddr(address)){
      let findOpt = {$or:[{"from":config.util.noLowUper(address)},{"to":config.util.noLowUper(address)}]};
      if(startNum>=0 && endNum>0){
        findOpt = {
          $or:[{"from":config.util.noLowUper(address)},{"to":config.util.noLowUper(address)}],
          "amount":{$gte:startNum,$lt:endNum}
        }
      }
      let count = await config.db.TokenTransfer.find(findOpt).count(); 
      let tokenTrafer = await config.db.TokenTransfer.find(findOpt).sort({"blockNumber":-1}).skip(ps).limit(10);
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

exports.contractList = async function(req,res){
    try {
        let page = req.body.page;
        if(page || page<=0){
            page = 1;
        }
        let ps = (page -1) * 10;
        let tokenCount = await config.db.Address.find({"type":1}).count();
        let tokenres = await config.db.Address.find({"type":1}).skip(ps).limit(10);
        let result = {
            "contractCount":tokenCount,
            "contractList":tokenres
        }
        return res.send({"resp":result});
    } catch (error) {
        console.log("tokenList: eroor: ",error)
    }
    return res.send({"resp":null})
}

exports.tokenList = async function(req,res){
  try {
      let page = req.body.page;
      let ps = config.util.returnPs(page,10);
      let tokenCount = await config.db.Contract.find({"totalSupply":{$gt:0}}).count();
      let tokenres = await config.db.Contract.find({"totalSupply":{$gt:0}}).skip(ps).limit(10);
      // console.log("tken:",tokenCount)
      // console.log("to:",tokenres)
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

// exports.txListContract = async function(req, res){
//     let contractAdd = req.body.address;
//     let page = req.body.page;
//     let ps = config.util.returnPs(page,10);
//     if(config.util.invalidAddr(contractAdd)){
//         let tx = await config.db.Transaction.find({"to":config.util.noLowUper(contractAdd)}).sort({"blockNumber":-1}).skip(ps).limit(10);
//         let count = await config.db.Transaction.find({"to":config.util.noLowUper(contractAdd)}).count();
//         return res.send({"resp":{"txList":tx,"count":count}});
//     }
//     return res.send({"resp":"param invalid"})
// }

exports.compileContract = async function(req, res){
    let address = req.body.address;
    let version = req.body.version;
    let name = req.body.name;
    let input = req.body.code;
    let optimization = (req.body.optimization ==1) ? true:false;
    let abi = req.body.abi;
  
    try {
      if(config.util.invalidAddr(address) && version && name && input && optimization && abi ){
        let contrx = await config.db.Contract.findOne({"address":config.util.noLowUper(address)});
        if(!contrx){
          return res.send({"resp":"address invalid contract"});
        }
        if(contrx && contrx.sourceCode){
          return res.send({"resp":{"status":true,"contract":contrx}});
        }
        let versionList = versions.releases;
        let wantVersion ; 
        for(var key in versionList){  
            let versionss = versionList[key];
            if(versionss.indexOf(version)!=-1){
              wantVersion = versionss;
            }
        }
        if(!wantVersion){
          return res.send({"resp":"version invalid"})
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
            let erc = checkERC(abi);
            await config.db.Contract.update(
              {address: address},
              {$set:{"ERC":erc,'compilerVersion':version, 'optimization':optimization, 'contractName':name, 'sourceCode':input,"abi":abi}},
              {multi: false, upsert: false});
            let contract = {};
            contract.isVerified = true;
            contract = await config.db.Contract.findOne({"address":config.util.noLowUper(address)});
            
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

var checkERC = function(abi){
  let abiObj = abi;
  if(typeof(abi)=="string"){
    abiObj = JSON.parse(abi);
  }

  let isERC20 = false;
  let isERC223 = false;
  let exist = false;
  let different = false;
  let transerNum = 0;
  for(var i=0; i<ERC223ABI.length; i++){
    let element = ERC223ABI[i];
    if(element.name=="transfer"){
      transerNum++;
    }
    exist = false;
    for(var j=0; j<abiObj.length; j++){
      abiObjEle = abiObj[j];
      if(abiObjEle.name == element.name){
        exist = true;
        break;
      }
    }
    if(!exist){
      different = true;
      break;
    }
  }
  if(!different && transerNum>1){
    isERC223 = true;
  }

  if(!isERC223){
    different = false;
    for(var i=0; i<SMART_ERCABI.length; i++){
      ERC20Ele = SMART_ERCABI[i];
      exist = false;
      for(var j=0; j<abiObj.length; j++){
        let abiObjEle =abiObj[j];
        if(ERC20Ele.name==abiObjEle.name){
          exist = true;
          break;
        }
      }
      if(!exist){
        different = true;
        break;
      }
    }
    if(!different){
      isERC20 = true;
    }
  }

  if(isERC223){
    return 3;
  }else if(isERC20){
    return 2;
  }
  return 0;
}