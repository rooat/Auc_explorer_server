var db = require("./db")
var utilWeb3 = require('./utils/web3util')
var util = require('./utils/util');
var tokenABI = require('./contractTpl/tokenABI.json')
var web3 = utilWeb3.web3;
var master = utilWeb3.master();


module.exports ={
    web3,
    db,
    utilWeb3,
    master,
    util,
    tokenABI
}