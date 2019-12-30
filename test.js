var versions = require('./solcversion.json')

console.log(versions)
var sss = versions.releases;
for(var key in sss){  

    console.log(key); //json对象的key  
  
    console.log(sss[key]); //json对象的值  
  
  }