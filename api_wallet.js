//根据地址获取id主节点id列表
async function getIds(){
    let data = await axios.post(url+'/api/witness/getIds',{"address":"0x046BC7B020dA804A2CF59c7097667cF8bB138389"});
    console.log("data:",data.data.resp)
} 
getIds();

//根据地址获取主节点详情
async function getInfo(){
    let data = await axios.post(url+'/api/witness/getInfo',{"address":"0x046BC7B020dA804A2CF59c7097667cF8bB138389"});
    console.log("data:",data.data.resp)
} 
getInfo();

//查询主节点信息
async function nodes(){
    let data = await axios.post(url+'/api/witness/nodes',{"id":"0x1b6263afb8cfa2c1"});
    console.log("data:",data.data.resp)
} 
nodes();

//根据地址查询交易列表
async function txlistByAddress(){
    let data = await axios.post(url+'/api/transaction/txlistByAddress',{"address":"0xE2C2121ea4d59ef9a2C8Deca97B98A96f6978f26","page":1});
    console.log("data:",data.data.resp)
} 
txlistByAddress();

//根据hash查询交易信息
async function txByHash(){
    let data = await axios.post(url+'/api/transaction/txByHash',{"hash":"0xa4552054a6a246b9223f45d3376702e791bfa513476017dfe5d68330d650f389"});
    console.log("data:",data.data.resp)
} 
txByHash();

//查询版本
async function versionCheck(){
    let data = await axios.post(url+'/api/version/versionCheck',{});
    console.log("data:",data.data.resp)
} 
versionCheck()

//查询余额
async function getBalance(){
    let data = await axios.post(url+'/api/address/getBalance',{"address":"0xcec96353c0cf76f7a784574e32fa8ad3ad1345dc"});
    console.log("data:",data.data.resp)
} 
getBalance()

//查询power     
async function getPower(){
    let data = await axios.post(url+'/api/address/getPower',{"address":"0xcec96353c0cf76f7a784574e32fa8ad3ad1345dc"});
    console.log("data:",data.data.resp)
} 
getPower()

//查询代币余额
async function tokenBalance(){
    let data = await axios.post(url+'/api/contract/tokenBalance',{"address":"0xcec96353c0cf76f7a784574e32fa8ad3ad1345dc","contractAdd":"0x969a143Fc1d87dBFb4b7F40c9F72f9BDf6029Ded"});
    console.log("data:",data.data.resp)
} 
tokenBalance()

//查询代币列表
async function tokenList(){
    let data = await axios.post(url+'/api/contract/tokenList',{"page":1});
    console.log("data:",data.data.resp)
} 
tokenList()

//通过合约地址查询代币交易记录
async function tokenTransferByContract(){
    let data = await axios.post(url+'/api/contract/tokenTransferByContract',{"address":"0x969a143Fc1d87dBFb4b7F40c9F72f9BDf6029Ded","page":1});
    console.log("data:",data.data.resp)
} 
tokenTransferByContract();

//通过用户地址查询代币交易记录
async function tokenTransferByAddress(){
    let data = await axios.post(url+'/api/contract/tokenTransferByAddress',{
        "address":"0xCEc96353C0cf76F7a784574e32fA8aD3Ad1345Dc",
        "startNum":22,
        "endNum":323,
        "page":1});
    console.log("data:",data.data.resp)
} 
tokenTransferByAddress();