create table block(
    id int primary key,
    number int,
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
    size int,
    extraData  varchar(150),
    gasLimit int,
    gasUsed  int,
    timestamp  int,
    uncles  varchar(150),
    txs  text,
    witness  varchar(150),
    unique(number)
  );

create table solidityversion ( 
    id  int primary key,
    path varchar(150),
    version varchar(50),
    build varchar(100),
    longVersion text,
    keccak256  varchar(150),
    urls  text,
    unique(version)
)

create table witness (
    id  int primary key,
    blocksNum  int,
    lastCountTo  int,
    witness varchar(40),
    version varchar(40)
    status Boolean,
    hash varchar(150),
    reward  int,
    miner varchar(150),
    timestamp  int,
    unique(witness)
);

create table contract (
    id  int primary key,
    address  varchar(150),
    blockNumber   int,
    ERC  int,
    creationTransaction  varchar(150),
    contractName  varchar(150),
    tokenName  varchar(150),
    symbol  varchar(150),
    owner  varchar(150),
    decimals   int,
    totalSupply   int,
    balance   int,
    compilerVersion  varchar(150),
    optimization  Boolean,
    description  varchar(150),
    logoUrl  varchar(100),
    timestamp   int,
    sourceCode  text,
    abi  text,
    byteCode  text,
    unique(address)
);

create table transaction (
    id  int primary key,
    hash  varchar(150),
    nonce   int,
    blockHash  varchar(150),
    blockNumber   int ,
    transactionIndex   int
    status  int
    from  varchar(150),
    to  varchar(150),
    value  varchar(150),
    gas   int,
    contractAddress varchar(150),
    gasUsed  int,
    gasPrice  varchar(150),
    timestamp   int ,
    input  varchar(150),
    witness  varchar(50),
    unique(hash)
);

create table inertransaction(
    id  int primary key,
        hash  varchar(150),
        from  varchar(150),
        to  varchar(150),
        value  varchar(150),
        timestamp   int,
        blockNumber   int
);

create table tokentransfer(
    id  int primary key,
        transactionHash  varchar(150),
        blockNumber   int,
        methodName  varchar(150),
        amount   int,
        contractAdd  varchar(150),
        to  varchar(150),
        from  varchar(150),
        timestamp   int
);

create table logevent (
    id  int primary key,
        address  varchar(150),
        txHash  varchar(150),
        blockNumber   int,
        contractAdd  varchar(150),
        timestamp   int,
        methodName  varchar(150),
        eventName  varchar(150),
        from  varchar(150),
        to  varchar(150),
        logIndex   int,
        topics  Array,
        data  varchar(150),
        gasUsed  int,
        gasPrice  Number
);

create table address (
    id  int primary key,
        addr  varchar(150),
        type   int,
        balance   int
 );

create table walletversion (
    id  int primary key,
        versionCode  varchar(150),
        version  varchar(150),
        url  varchar(150),
        content varchar(150),
        createAt  int
 );



