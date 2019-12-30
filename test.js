var versions = require('../solcversion.json')
const execSync = require('child_process').execSync;

function test(){
  let sss = versions.releases;
  for(var key in sss){  
      execSync(`wget https://ethereum.github.io/solc-bin/bin/`+sss[key]);
  }
}
test()