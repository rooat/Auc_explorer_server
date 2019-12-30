function noLowUper(addr){
    if(addr && addr!=undefined){
        return {$regex:String(addr),$options:"$i"}
    }
    return "" 
}

function invalidAddr(addr){
    if(addr && addr.length==42 && addr.indexOf("0x")!=-1){
        return true;
    }
    return false;
}

function invalidHash(hash){
    if(hash && hash.length == 66 && hash.indexOf("0x")!=-1){
        return true;
    }
    return false;
}

function returnPs(page ,pageSize){
    if(!page || page<=0 || isNaN(page)){
        page = 1;
    }
    return (page -1)*pageSize
}

module.exports ={
    noLowUper,
    invalidAddr,
    invalidHash,
    returnPs
}