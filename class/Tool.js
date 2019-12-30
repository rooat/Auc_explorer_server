var config = require("../config")
class Tool{
    start(){
        this.updateWalletVersion();
    }
    async updateWalletVersion(){
        await config.db.WalletVersion({
            "versionCode":"42",
            "version":"1.3.0",
            "url":"http://etz.oss-cn-hongkong.aliyuncs.com/easyetz-1_3_0_b42.apk",
            "content":"优化发现页面加载，解决使用中发现的问题. （ Optimizing when loading the startup pag）",
            "createAt":new Date()
        }).save();
    }
    
}
var tool = new Tool();
tool.start();