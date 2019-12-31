create table block(
    id int(11) primary key,
    number int(11),
    hash  varchar(150),
    parentHash  varchar(150),
    nonce  varchar(150),
    sha3Uncles  varchar(150),
    logsBloom  varchar(150),
    transactionsRoot  varchar(150),
    stateRoot  varchar(150),
    receiptsRoot  varchar(150),
    miner  varchar(150),
    difficulty  varchar(150),
    totalDifficulty  varchar(150),
    size  int(11),
    extraData  varchar(150),
    gasLimit  int(11),
    gasUsed  int(11),
    timestamp  int(11),
    uncles  varchar(150),
    txs  text,
    witness  varchar(150),
    unique(number));

create table solidityversion ( 
    id int(11) primary key,
    path varchar(150),
    version varchar(50),
    build varchar(100),
    longVersion text,
    keccak256  varchar(150),
    urls  text,
    unique(version)
)

create table witness (
    blocksNum int(11),
    lastCountTo int(11),
    witness varchar(40),
    version varchar(40)
    status Boolean,
    hash varchar(150),
    reward int(11),
    miner varchar(150),
    timestamp int(11)
);

create table contract (
    address  varchar(150),
    blockNumber  int(11),
    ERC int(11),
    creationTransaction  varchar(150),
    contractName  varchar(150),
    tokenName  varchar(150),
    symbol  varchar(150),
    owner  varchar(150),
    decimals  int(11)
    totalSupply  int(11)
    balance  int(11)
    compilerVersion  varchar(150),
    optimization  Boolean,
    description  varchar(150),
    logoUrl  varchar(100),
    timestamp  int(11)
    sourceCode  text,
    abi  text,
    byteCode  text
);

create table transaction (
    hash  varchar(150),
    nonce  int(11),
    blockHash  varchar(150),
    blockNumber  int(11) ,
    transactionIndex  int(11)
    status int(11)
    from  varchar(150),
    to  varchar(150),
    value  varchar(150),
    gas  int(11),
    contractAddress varchar(150),
    gasUsed int(11),
    gasPrice  varchar(150),
    timestamp  int(11) ,
    input  varchar(150),
    witness  varchar(50)
);

create table inertransaction(
        hash  varchar(150),
        from  varchar(150),
        to  varchar(150),
        value  varchar(150),
        timestamp  int(11),
        blockNumber  int(11)
    );

create table tokenTransfer(
        transactionHash  varchar(150),
        blockNumber  int(11)
        methodName  varchar(150),
        amount  int(11)
        contractAdd  varchar(150),
        to  varchar(150),
        from  varchar(150),
        timestamp  int(11)
    );

create table logevent (
        address  varchar(150),
        txHash  varchar(150),
        blockNumber  int(11) ,
        contractAdd  varchar(150),//same with address
        timestamp  int(11)
        methodName  varchar(150),
        eventName  varchar(150),
        from  varchar(150),
        to  varchar(150),
        logIndex  int(11)
        topics  Array,
        data  varchar(150),
        gasUsed int(11)
        gasPrice  Number
    );


//all address
var Address = new Schema(
    {
        addr  varchar(150), index  {unique  true}},
        type  int(11) index  true},//0 normal 1 contract 2 masternode
        balance  Number
    });
var WalletVersion = new Schema(
    {
        versionCode  varchar(150),
        version  varchar(150),
        url  varchar(150),
        content varchar(150),
        createAt Date
    });



