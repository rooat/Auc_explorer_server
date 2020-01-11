var config = require("../config")
class Tool{
    start(){
        this.updateWalletVersion();
    }
    async updateWalletVersion(){
        await config.db.WalletVersion({
            "versionCode":"7",
            "version":"1.0",
            "url":"https://auchain.oss-cn-shenzhen.aliyuncs.com/AUChain.apk",
            "content":"优化发现页面加载，解决使用中发现的问题. （ Optimizing when loading the startup pag）",
            "createAt":new Date()
        }).save();
    }
    
}
var tool = new Tool();
tool.start();