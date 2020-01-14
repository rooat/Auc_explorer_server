var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var Block = new Schema(
{
    "number": {type: Number, index: {unique: true}},
    "hash": {type:String,default:null},
    "parentHash": {type:String,default:null},
    "nonce": {type:String,default:null},
    "sha3Uncles": {type:String,default:null},
    "logsBloom": {type:String,default:null},
    "transactionsRoot": {type:String,default:null},
    "stateRoot": {type:String,default:null},
    "receiptsRoot": {type:String,default:null},
    "miner": {type:String,default:null},
    "difficulty": {type:String,default:null},
    "totalDifficulty": {type:String,default:null},
    "size":{type:Number,default:0},
    "extraData":{type:String,default:null},
    "gasLimit":{type:Number,default:0},
    "gasUsed":{type:Number,default:0},
    "timestamp": {type: Number, index: true},
    "uncles": [String],
    "txs": [String],//same with transactions
    "witness": {type: String, index: true},
    "referrer":{type:String,default:null}

});
var SolidityVersion = new Schema({
    "path":{type:String,default:null},
    "version":{type:String,default:null},
    "build":{type:String,default:null},
    "longVersion":{type:String,default:null},
    "keccak256":{type:String,default:null},
    "urls": [String]
})

//master node Info
var Witness = new Schema(
    {
        "blocksNum":{type:Number,default:0},//mine block count
        "lastCountTo":{type:Number,default:0},//block height
        "witness": {type: String, index: {unique: true}},
        "version": {type: String, index: true},
        "status":Boolean,
        "hash":String,
        "reward":Number,
        "miner":String,
        "timestamp":{type:Number,default:0},
        "referrer":String

    });

var TokenAdd = new Schema({
    "address":String,
    "tokenName":String,
    "createAt":{type:Date,default:Date.now}
})
var Contract = new Schema(
{
    "address": {type: String, index: {unique: true}},
    "blockNumber":{type:Number,default:0},
    "ERC":{type: Number, index: true},//0:normal contract 2:ERC20, 3:ERC223
    "creationTransaction": {type:String,default:null},
    "contractName": {type:String,default:null},
    "tokenName": {type:String,default:null},
    "symbol": {type:String,default:null},
    "owner": {type:String,default:null},
    "decimals":{type:Number,default:0},
    "totalSupply":{type:Number,default:0},
    "balance":{type:Number,default:0},
    "compilerVersion": {type:String,default:null},
    "optimization": Boolean,
    "runs":{type:Number,default:200},
    "description": {type:String,default:null},
    "logoUrl": {type:String,default:null},
    "timestamp":{type:Number,default:0},

    "sourceCode": {type:String,default:null},
    "abi": {type:String,default:null},
    "byteCode": {type:String,default:null}
}, {collection: "Contract"});

var Transaction = new Schema(
{
    "hash": {type: String, index: {unique: true}},
    "nonce":{type:Number,default:0},
    "blockHash":{type:String,default:null},
    "blockNumber": {type: Number, index: true},
    "transactionIndex":{type:Number,default:0},
    "status":Number,
    "from": {type: String, index: true},
    "to": {type: String, index: true},
    "value": {type:String,default:null},
    "gas":{type:Number,default:0},
    "contractAddress":String,
    "gasUsed":Number,
    "gasPrice": {type:String,default:null},
    "timestamp": {type: Number, index: true},
    "input": {type:String,default:null},
    "witness": {type:String,default:null}
});

var InerTransaction = new Schema(
    {
        "hash": {type: String},
        "from": {type: String, index: true},
        "to": {type: String, index: true},
        "value":{type:String,default:null},
        "timestamp":{type:Number,default:0},
        "blockNumber": {type: Number}
    });

var TokenTransfer = new Schema(
    {
        "transactionHash": {type: String, index: {unique: true}},
        "blockNumber":{type:Number,default:0},
        "methodName":{type:String,default:null},
        "tokenName":{type:String,default:null},
        "amount":{type:Number,default:0},
        "contractAdd":{type:String,default:null},
        "to":{type:String,default:null},
        "from":{type:String,default:null},
        "status":Number,
        "timestamp": Number
    });



var LogEvent = new Schema(
    {
        "address": {type: String, index: true},
        "txHash": {type: String, index: true},
        "blockNumber": {type: Number, index: true},
        "contractAdd":{type:String,default:null},//same with address
        "timestamp":{type:Number,default:0},
        "methodName":{type:String,default:null},
        "eventName":{type:String,default:null},
        "from":{type:String,default:null},
        "to":{type:String,default:null},
        "logIndex":{type:Number,default:0},
        "topics": Array,
        "data":{type:String,default:null},
        "gasUsed":Number,
        "gasPrice": Number
    });


//all address
var Address = new Schema(
    {
        "addr": {type: String, index: {unique: true}},
        "type": {type: Number, index: true},//0:normal 1:contract 2:masternode
        "balance": Number
    });
var WalletVersion = new Schema(
    {
        "versionCode":{type:String,default:null},
        "version":{type:String,default:null},
        "url":{type:String,default:null},
        "content":String,
        "createAt":{type:Date,default:Date.now}
    });
var AddrToToken = new Schema(
    {
        "address":{type:String,default:null},
        "tokenAddr":{type:String,default:null},
        "tokenName":{type:String,default:null}
    }
)
mongoose.model('AddrToToken',AddrToToken); 
mongoose.model('TokenAdd',TokenAdd);
mongoose.model('WalletVersion',WalletVersion)
mongoose.model('LogEvent', LogEvent);
mongoose.model('TokenTransfer', TokenTransfer);
mongoose.model('Address', Address);
mongoose.model('Block', Block);
mongoose.model('Contract', Contract);
mongoose.model('Transaction', Transaction);
mongoose.model('InerTransaction', InerTransaction);
mongoose.model('Witness', Witness);
mongoose.model('SolidityVersion',SolidityVersion);

module.exports.AddrToToken = mongoose.model('AddrToToken');
module.exports.TokenAdd = mongoose.model('TokenAdd');
module.exports.SolidityVersion = mongoose.model('SolidityVersion');
module.exports.Block = mongoose.model('Block');
module.exports.Contract = mongoose.model('Contract');
module.exports.Transaction = mongoose.model('Transaction');
module.exports.InerTransaction = mongoose.model('InerTransaction');
module.exports.TokenTransfer = mongoose.model('TokenTransfer');
module.exports.Witness = mongoose.model('Witness');
module.exports.LogEvent = mongoose.model('LogEvent');
module.exports.Address = mongoose.model('Address');
module.exports.WalletVersion = mongoose.model('WalletVersion');

// mongoose.connect( 'mongodb://localhost/blockDB' );
// mongoose.connect('mongodb://etzscan:etz123@localhost:39462/blockDB', {useMongoClient:true});
mongoose.connect('mongodb://localhost:27017/blockDB', {useMongoClient:true});
mongoose.set('debug', false);

