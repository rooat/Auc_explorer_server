var axios = require('axios')
var url = "http://47.56.226.139"
// async function getBlockTxTps(){
//     let data = await axios.post(url+'/api/block/getBlockTxTps',{});
//     console.log("data:",data.data.resp)
// } 
// getBlockTxTps();
// async function getBlockByNumber(){
//     let data = await axios.post(url+'/api/block/getBlockByNumber',{"number":3});
//     console.log("data:",data.data.resp)
// } 
// getBlockByNumber();
// async function getBlockList(){
//     let data = await axios.post(url+'/api/block/getBlockList',{"page":1});
//     console.log("data:",data.data.resp)
// } 
// getBlockList();
// async function getIds(){
//     let data = await axios.post(url+'/api/witness/getIds',{"address":"0x046BC7B020dA804A2CF59c7097667cF8bB138389"});
//     console.log("data:",data.data.resp)
// } 
// getIds();
// async function totalMasterNodes(){
//     let data = await axios.post(url+'/api/witness/totalMasterNodes',{});
//     console.log("data:",data.data.resp)
// } 
// totalMasterNodes();
// async function getInfo(){
//     let data = await axios.post(url+'/api/witness/getInfo',{"address":"0x046BC7B020dA804A2CF59c7097667cF8bB138389"});
//     console.log("data:",data.data.resp)
// } 
// getInfo();
// async function nodes(){
//     let data = await axios.post(url+'/api/witness/nodes',{"id":"0x1b6263afb8cfa2c1"});
//     console.log("data:",data.data.resp)
// } 
// nodes();
// async function todayRewards(){
//     let data = await axios.post(url+'/api/witness/todayRewards',{});
//     console.log("data:",data.data.resp)
// } 
// todayRewards();

// async function witnessList(){
//     let data = await axios.post(url+'/api/witness/witnessList',{"page":1});
//     console.log("data:",data.data.resp)
// } 
// witnessList();

// async function txlistByAddress(){
//     let data = await axios.post(url+'/api/transaction/txlistByAddress',{"address":"0xE2C2121ea4d59ef9a2C8Deca97B98A96f6978f26","page":1});
//     console.log("data:",data.data.resp)
// } 
// txlistByAddress();

// async function txList(){
//     let data = await axios.post(url+'/api/transaction/txList',{"page":1});
//     console.log("data:",data.data.resp)
// } 
// txList();

// async function txByHash(){
//     let data = await axios.post(url+'/api/transaction/txByHash',{"hash":"0xa4552054a6a246b9223f45d3376702e791bfa513476017dfe5d68330d650f389"});
//     console.log("data:",data.data.resp)
// } 
// txByHash();


// async function versionCheck(){
//     let data = await axios.post(url+'/api/version/versionCheck',{});
//     console.log("data:",data.data.resp)
// } 
// versionCheck();

// async function findLogOneByHash(){
//     let data = await axios.post(url+'/api/log/findLogOneByHash',{"hash":"0x83f7bb0a5875b37878bd7ed6ee98d606ef33ec51b6c4ed1a5db23a974bb02210"});
//     console.log("data:",data.data.resp)
// } 
// findLogOneByHash();

// async function getBalance(){
//     let data = await axios.post(url+'/api/address/getBalance',{"address":"0xcec96353c0cf76f7a784574e32fa8ad3ad1345dc"});
//     console.log("data:",data.data.resp)
// } 
// getBalance();

// async function getPower(){
//     let data = await axios.post(url+'/api/address/getPower',{"address":"0xcec96353c0cf76f7a784574e32fa8ad3ad1345dc"});
//     console.log("data:",data.data.resp)
// } 
// getPower();

// async function addressList(){
//     let data = await axios.post(url+'/api/address/addressList',{"page":1});
//     console.log("data:",data.data.resp)
// } 
// addressList();

// async function tokenInfo(){
//     let data = await axios.post(url+'/api/contract/tokenInfo',{"address":"0xb0ADbB49eF054eF3B8182186C3b97c97D4aF8AEA"});
//     console.log("data:",data.data.resp)
// } 
// tokenInfo();

// async function tokenBalance(){
//     let data = await axios.post(url+'/api/contract/tokenBalance',{"address":"0xcec96353c0cf76f7a784574e32fa8ad3ad1345dc","contractAdd":"0x969a143Fc1d87dBFb4b7F40c9F72f9BDf6029Ded"});
//     console.log("data:",data.data.resp)
// } 
// tokenBalance();
// async function tokenTransferByContract(){
//     let data = await axios.post(url+'/api/contract/tokenTransferByContract',{"address":"0x969a143Fc1d87dBFb4b7F40c9F72f9BDf6029Ded","page":1});
//     console.log("data:",data.data.resp)
// } 
// tokenTransferByContract();

// async function tokenTransferByHash(){
//     let data = await axios.post(url+'/api/contract/tokenTransferByHash',{"hash":"0x25b6324ff67fe455937bcb3fff5610c88085022ccfe0d8dcb4b54dfc6d4f6ef7"});
//     console.log("data:",data.data.resp)
// } 
// tokenTransferByHash();
// async function tokenTransferByAddress(){
//     let data = await axios.post(url+'/api/contract/tokenTransferByAddress',{"address":"0xCEc96353C0cf76F7a784574e32fA8aD3Ad1345Dc","page":1});
//     console.log("data:",data.data.resp)
// } 
// tokenTransferByAddress();
// async function tokenList(){
//     let data = await axios.post(url+'/api/contract/tokenList',{"page":1});
//     console.log("data:",data.data.resp)
// } 
// tokenList();

// async function txListContract(){
//     let data = await axios.post(url+'/api/contract/txListContract',{"address":"0x969a143Fc1d87dBFb4b7F40c9F72f9BDf6029Ded","page":1});
//     console.log("data:",data.data.resp)
// } 
// txListContract()

// async function compileContract(){
//     let data = await axios.post(url+'/api/contract/compileContract',{});
//     console.log("data:",data.data.resp)
// } 
// compileContract()

// async function innerTxOneByHash(){
//     let data = await axios.post(url+'/api/inner/innerTxOneByHash',{"hash":"0xf87527f59f56676f447d90e4fe31ba4b1c176b7b3134915bc62994662261f58d"});
//     console.log("data:",data.data.resp)
// } 
// innerTxOneByHash()

// async function innerTxListByAddress(){
//     let data = await axios.post(url+'/api/inner/innerTxListByAddress',{"address":"0xffbbf104d338316820ab6ce86cd24200ab7082cb","page":1});
//     console.log("data:",data.data.resp)
// } 
// innerTxListByAddress()
