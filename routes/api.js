'use strict'
var express = require('express');
var router = express.Router();
var address = require('../api/address')
var block = require('../api/block');
var witness = require("../api/witnesse")
var transaction = require("../api/transaction");
var version = require('../api/version')
var contract = require('../api/contract')
var log = require('../api/logevent')
var inner = require('../api/inertransaction')
var compiler = require('./compiler');


router.use(function (req, res, next) {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                next();
        });

//miner

router.post('/block/getBlockList',block.getBlockList);
router.post('/block/getBlockTxTps',block.getBlockTxTps);
router.post('/block/getBlockByNumber',block.getBlockByNumber);
router.post('/block/getBlockCharDataByWitness',block.getBlockCharDataByWitness);
router.post('/block/getBlockListByWitness',block.getBlockListByWitness);

router.post('/witness/getIds',witness.getIds);
router.post('/witness/getRefIds',witness.getRefIds);
router.post('/witness/getInfo',witness.getInfo);
router.post('/witness/nodes',witness.nodes);
router.post('/witness/todayRewards',witness.todayRewards);
router.post('/witness/witnessList',witness.witnessList);
router.post('/witness/weekRewardsById',witness.weekRewardsById)
router.post('/witness/masterMesg',witness.masterMesg);
router.post('/witness/getWitnesBlockNum',witness.getWitnesBlockNum)

router.post('/transaction/txlistByAddress',transaction.txlistByAddress);
router.post('/transaction/txList',transaction.txList);
router.post('/transaction/txByHash',transaction.txByHash);

router.post('/version/versionCheck',version.versionCheck);
router.post('/version/solcVersion',version.solcVersion);
router.post('/version/updateVersion',version.updateVersion);

router.post('/log/findLogOneByHash',log.findLogOneByHash);

router.post('/address/getBalance',address.getBalance);
router.post('/address/getPower',address.getPower);
router.post('/address/addressList',address.addressList);

router.post('/contract/tokenInfo',contract.tokenInfo);
router.post('/contract/tokenBalance',contract.tokenBalance)
router.post('/contract/tokenTransferByContract',contract.tokenTransferByContract)
router.post('/contract/tokenTransferByHash',contract.tokenTransferByHash);
router.post('/contract/tokenTransferByAddress',contract.tokenTransferByAddress);
router.post('/contract/tokenList',contract.tokenList);
router.post('/contract/contractList',contract.contractList);
router.post('/contract/compileContract',contract.compileContract);
router.post('/contract/tokenTxByAddressByContract',contract.tokenTxByAddressByContract);
router.post('/contract/tokenHistory',contract.tokenHistory);
router.post('/contract/addToken',contract.addToken);
router.post('/contract/tokenListByAddress',contract.tokenListByAddress);

router.post('/inner/innerTxOneByHash',inner.innerTxOneByHash);
router.post('/inner/innerTxListByAddress',inner.innerTxListByAddress);

module.exports = router;