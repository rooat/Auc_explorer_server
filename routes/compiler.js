var solc = require('solc');
var config = require('../config')
var mongoose = require( 'mongoose' );
var Contract = mongoose.model( 'Contract' );
const ERC223ABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"_name","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"_totalSupply","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"_decimals","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MAX_UINT256","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"_symbol","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_data","type":"bytes"},{"name":"_custom_fallback","type":"string"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":true,"name":"data","type":"bytes"}],"name":"Transfer","type":"event"}];
const ERC20ABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenAddress","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}];
const SMART_ERCABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"}/*,{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}*/];
var soliCompCache = {};//solidity compiler cache。generating for compiler cost too much time, so we swap space for time

var inputJson = {
  language: 'Solidity',
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    },
    outputSelection: {
          '*': {
              '*': ['abi', 'evm.bytecode']
          }
      }
  }
}

var compileSolc = async function(req, res) {
  var address = req.body.address;
  var version = req.body.version;
  var name = req.body.name;
  var input = req.body.code;
  var optimization = (req.body.optimization) ? true : false;
  var optimise = (optimization) ? 1 : 0;

  var bytecode = await config.utilWeb3.web3Methods("getCode",{"address":address})
  if (bytecode.substring(0,2)=="0x")
    bytecode = bytecode.substring(2);

  var data = {
    "address": address,
    "ERC": 0,
    "compilerVersion": version,
    "optimization": optimization,
    "contractName": name,
    "sourceCode": input,
    "abi":""
  }
  if(bytecode==""){
    data.valid = false;
    data.err = "eth.getCode('"+address+"') get empty";
    data["verifiedContracts"] = [];
    res.write(JSON.stringify(data));
    res.end();
    return;
  }

  inputJson.settings.optimizer.enabled = optimization;
  inputJson.sources = {'xxx.sol':{
    content: input
  }}
  inputJsonStr = JSON.stringify(inputJson);

  var targetSolc = soliCompCache[version];
  // if(!targetSolc){ 缓存不定时失效
    if(true){
    try {
      if (version == "latest") {
        targetSolc = solc;
        var output = targetSolc.compile(inputJsonStr);
        testValidCode(output, data, bytecode, res);
      } else {
        solc.loadRemoteVersion(version, function(err, solcV) {
          console.log("on loadRemoteVersion:"+version);
          if (err) {
            console.error(err);
            data.valid = false;
            data.err = err.toString();
            data["verifiedContracts"] = [];
            res.write(JSON.stringify(data));
            res.end();
            return;
          }
          else {
            targetSolc = solcV;
            soliCompCache[version] = targetSolc;//compiler cache
            var output = targetSolc.compile(inputJsonStr);
            output = JSON.parse(output);
            testValidCode(output, data, bytecode, res);
          }
        });
      }
      return;
    } catch (e) {
      console.error(e.stack);
      data.valid = false;
      data["verifiedContracts"] = [];
      response.write(JSON.stringify(data));
      response.end();
      return;
    }
  }else{
    var output = targetSolc.compile(inputJsonStr);
    testValidCode(output, data, bytecode, res);
  }
}

var checkERC = function(abi){
  var abiObj;
  if(typeof(abi)=="string")
    abiObj = JSON.parse(abi);
  else
    abiObj = abi;
  var isERC20 = false;
  var isERC223 = false;
  var exist = false;
  var different = false;
  var transerNum = 0;
  for(var i=0; i<ERC223ABI.length; i++){
    var element = ERC223ABI[i];
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
        abiObjEle =abiObj[j];
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

  if(isERC223)
    return 3;
  else if(isERC20)
    return 2;

  return 0;
}

var testValidCode = function(output, data, bytecode, response) {
  var verifiedContracts = [];
  var targetContractName = data.contractName;
  var allContractObj = output.contracts['xxx.sol'];

  if(!allContractObj){
    data.valid = false;
    data["verifiedContracts"] = verifiedContracts;
    response.write(JSON.stringify(data));
    response.end();
    return;
  }

  var targetContract = allContractObj[targetContractName]
  var concatByteCode = targetContract.evm.bytecode.object;
  for (var contractName in allContractObj) {
    verifiedContracts.push({"name": contractName,
                            "abi": JSON.stringify(allContractObj[contractName].abi),
                            "bytecode": allContractObj[contractName].evm.bytecode.object});
  }

  var testCode = bytecode.substring(10,);
  var endIndex = testCode.length;
  if(testCode.indexOf("7a7a72305820")>-1)
    endIndex = testCode.indexOf("7a7a72305820");
  else if(testCode.length>68){
    endIndex = 68
  }
  if(endIndex==-1)
    endIndex = testCode.length;
  testCode = testCode.substring(0,endIndex);

  if (!targetContract){
    data.valid = false;
    data["verifiedContracts"] = verifiedContracts;
    response.write(JSON.stringify(data));
    response.end();
    return;
  }else if(concatByteCode.indexOf(testCode) > -1){
    data.valid = true;
    data.abi = JSON.stringify(targetContract.abi);
    data.byteCode = bytecode;
    data["verifiedContracts"] = verifiedContracts;
    response.write(JSON.stringify(data));
    response.end();
    //write to db
    var  ERCType = checkERC(data.abi);
    data.ERC = ERCType;

    Contract.update(
      {address: data.address},
      {$set:{'ERC':data.ERC, 'compilerVersion':data.compilerVersion, 'optimization':data.optimization, 'contractName':data.contractName, 'sourceCode':data.sourceCode, 'abi':data.abi}},
      {multi: false, upsert: false},
      function (err, data) {
        if(err)
          console.log(err);
      }
    );

  }else{
    data.valid = false;
    data["verifiedContracts"] = verifiedContracts;
    response.write(JSON.stringify(data));
    response.end();
    return;
  }
}
