
var config = require("./config")

async function test(){
   let ssa =  await config.utilWeb3.web3Methods("hexToAscii",{"hex":"0xd883030000846765746888676f312e31312e35856c696e757800000000000000e14574a136ebc420a497d20a084b304d83a626e093dd6f16bfb7ae53f3563f233b1c8a44905747b5333373f22137acb605024ba82f7e685906181bd56e87ed4401"})
//   let version = ss.charCodeAt(3)+"."+ss.charCodeAt(4)+"."+ss.charCodeAt(5);
   console.log("ss:",ssa)
   // let ssa = hex2ascii("0xd883030000846765746888676f312e31312e35856c696e757800000000000000e14574a136ebc420a497d20a084b304d83a626e093dd6f16bfb7ae53f3563f233b1c8a44905747b5333373f22137acb605024ba82f7e685906181bd56e87ed4401")
   let versions = ssa.charCodeAt(3)+"."+ssa.charCodeAt(2)+"."+ssa.charCodeAt(3);
  

   console.log("ssa:",versions)
}
test()


function hex2ascii(hexIn) {
   var hex = hexIn.toString();
   var str = '';
   for (var i = 0; i < hex.length; i += 2)
       str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
   return str;
}