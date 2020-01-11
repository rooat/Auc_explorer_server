
// var config = require("./config")
// var sol = require("./soljson-v0.5.4+commit.9549d8ff.js")
// var wrapper = require('solc/wrapper.js')
// // var solss = require("./ssdd.sol");
// let inputJson = {
//    language: 'Solidity',
//    settings: {
//      optimizer: {
//        enabled: true,
//        runs: 200
//      },
//      outputSelection: {
//            '*': {
//                '*': ["*"]
//            }
//        }
//    },
//    "sources" : {
//      'xxx.sol':{
//        content: `
//        pragma solidity ^0.5.4;


// library SafeMath {
//   function mul(uint256 a, uint256 b) internal pure returns (uint256) {
//     if (a == 0) {
//       return 0;
//     }

//     uint256 c = a * b;
//     require(c / a == b);

//     return c;
//   }

//   function div(uint256 a, uint256 b) internal pure returns (uint256) {
//     require(b > 0); // Solidity only automatically asserts when dividing by 0
//     uint256 c = a / b;

//     return c;
//   }

//   function sub(uint256 a, uint256 b) internal pure returns (uint256) {
//     require(b <= a);
//     uint256 c = a - b;

//     return c;
//   }

//   function add(uint256 a, uint256 b) internal pure returns (uint256) {
//     uint256 c = a + b;
//     require(c >= a);

//     return c;
//   }

//   function mod(uint256 a, uint256 b) internal pure returns (uint256) {
//     require(b != 0);
//     return a % b;
//   }
// }

//  interface IERC20 {
//   function totalSupply() external view returns (uint256);

//   function balanceOf(address who) external view returns (uint256);

//   function allowance(address owner, address spender)
//     external view returns (uint256);

//   function transfer(address to, uint256 value) external returns (bool);

//   function approve(address spender, uint256 value)
//     external returns (bool);

//   function transferFrom(address from, address to, uint256 value)
//     external returns (bool);

//   event Transfer(
//     address indexed from,
//     address indexed to,
//     uint256 value
//   );

//   event Approval(
//     address indexed owner,
//     address indexed spender,
//     uint256 value
//   );
// }
// contract ERC20 is IERC20 {
//   using SafeMath for uint256;

//   mapping (address => uint256) private _balances;

//   mapping (address => mapping (address => uint256)) private _allowed;

//   uint256 private _totalSupply;

//   function totalSupply() public view returns (uint256) {
//     return _totalSupply;
//   }
  
//   function balanceOf(address owner) public view returns (uint256) {
//     return _balances[owner];
//   }

//   function allowance(
//     address owner,
//     address spender
//    )
//     public
//     view
//     returns (uint256)
//   {
//     return _allowed[owner][spender];
//   }

//   function transfer(address to, uint256 value) public returns (bool) {
//     _transfer(msg.sender, to, value);
//     return true;
//   }

//   function approve(address spender, uint256 value) public returns (bool) {
//     require(spender != address(0));
//     require(_balances[msg.sender]>=value);
//     _allowed[msg.sender][spender] = value;
//     emit Approval(msg.sender, spender, value);
//     return true;
//   }

//   function transferFrom(
//     address from,
//     address to,
//     uint256 value
//   )
//     public
//     returns (bool)
//   {
//     require(value <= _allowed[from][msg.sender]);

//     _allowed[from][msg.sender] = _allowed[from][msg.sender].sub(value);
//     _transfer(from, to, value);
//     return true;
//   }

//   function increaseAllowance(
//     address spender,
//     uint256 addedValue
//   )
//     public
//     returns (bool)
//   {
//     require(spender != address(0));

//     _allowed[msg.sender][spender] = (
//       _allowed[msg.sender][spender].add(addedValue));
//     emit Approval(msg.sender, spender, _allowed[msg.sender][spender]);
//     return true;
//   }

//   function decreaseAllowance(
//     address spender,
//     uint256 subtractedValue
//   )
//     public
//     returns (bool)
//   {
//     require(spender != address(0));

//     _allowed[msg.sender][spender] = (
//       _allowed[msg.sender][spender].sub(subtractedValue));
//     emit Approval(msg.sender, spender, _allowed[msg.sender][spender]);
//     return true;
//   }

  
//   function _transfer(address from, address to, uint256 value) internal {
//     require(value <= _balances[from]);
//     require(to != address(0));

//     _balances[from] = _balances[from].sub(value);
//     _balances[to] = _balances[to].add(value);
//     emit Transfer(from, to, value);
//   }

 
//   function _mint(address account, uint256 value) internal {
//     require(account != address(0));
//     _totalSupply = _totalSupply.add(value);
//     _balances[account] = _balances[account].add(value);
//     emit Transfer(address(0), account, value);
//   }

//   function _burn(address account, uint256 value) internal {
//     require(account != address(0));
//     require(value <= _balances[account]);

//     _totalSupply = _totalSupply.sub(value);
//     _balances[account] = _balances[account].sub(value);
//     emit Transfer(account, address(0), value);
//   }
//   function _burnFrom(address account, uint256 value) internal {
//     require(value <= _allowed[account][msg.sender]);
//     _allowed[account][msg.sender] = _allowed[account][msg.sender].sub(
//       value);
//     _burn(account, value);
//   }
// }


// contract LSB is ERC20 {
//     string public name ;
//     string public symbol ;
//     uint public decimals ;
//     constructor(string memory _name , string memory _symbol ,uint _decimals ,uint amount ) public {
//         name = _name;
//         symbol = _symbol;
//         decimals = _decimals;
//         _mint(msg.sender, amount*(10**_decimals));
//     }
// }

// `     }
//    }
//  }

// function test(){
//    let newSolc = wrapper(sol);
//    // console.log("ddd-",inputJson)
//    let output = JSON.parse(newSolc.compile(JSON.stringify(inputJson)))
//    console.log(output)
//    let abi = output.contracts['xxx.sol']['LSB'].abi;
//    let object = output.contracts['xxx.sol']['LSB'].evm.bytecode.object;
//    // console.log(abi)
//         console.log("output-",)
// }
// test()
var axios = require('axios');

let sss = `pragma solidity ^0.5.4;


library SafeMath {
  function mul(uint256 a, uint256 b) internal pure returns (uint256) {
    if (a == 0) {
      return 0;
    }

    uint256 c = a * b;
    require(c / a == b);

    return c;
  }

  function div(uint256 a, uint256 b) internal pure returns (uint256) {
    require(b > 0); // Solidity only automatically asserts when dividing by 0
    uint256 c = a / b;

    return c;
  }

  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    require(b <= a);
    uint256 c = a - b;

    return c;
  }

  function add(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a + b;
    require(c >= a);

    return c;
  }

  function mod(uint256 a, uint256 b) internal pure returns (uint256) {
    require(b != 0);
    return a % b;
  }
}

 interface IERC20 {
  function totalSupply() external view returns (uint256);

  function balanceOf(address who) external view returns (uint256);

  function allowance(address owner, address spender)
    external view returns (uint256);

  function transfer(address to, uint256 value) external returns (bool);

  function approve(address spender, uint256 value)
    external returns (bool);

  function transferFrom(address from, address to, uint256 value)
    external returns (bool);

  event Transfer(
    address indexed from,
    address indexed to,
    uint256 value
  );

  event Approval(
    address indexed owner,
    address indexed spender,
    uint256 value
  );
}
contract ERC20 is IERC20 {
  using SafeMath for uint256;

  mapping (address => uint256) private _balances;

  mapping (address => mapping (address => uint256)) private _allowed;

  uint256 private _totalSupply;

  function totalSupply() public view returns (uint256) {
    return _totalSupply;
  }
  
  function balanceOf(address owner) public view returns (uint256) {
    return _balances[owner];
  }

  function allowance(
    address owner,
    address spender
   )
    public
    view
    returns (uint256)
  {
    return _allowed[owner][spender];
  }

  function transfer(address to, uint256 value) public returns (bool) {
    _transfer(msg.sender, to, value);
    return true;
  }

  function approve(address spender, uint256 value) public returns (bool) {
    require(spender != address(0));
    require(_balances[msg.sender]>=value);
    _allowed[msg.sender][spender] = value;
    emit Approval(msg.sender, spender, value);
    return true;
  }

  function transferFrom(
    address from,
    address to,
    uint256 value
  )
    public
    returns (bool)
  {
    require(value <= _allowed[from][msg.sender]);

    _allowed[from][msg.sender] = _allowed[from][msg.sender].sub(value);
    _transfer(from, to, value);
    return true;
  }

  function increaseAllowance(
    address spender,
    uint256 addedValue
  )
    public
    returns (bool)
  {
    require(spender != address(0));

    _allowed[msg.sender][spender] = (
      _allowed[msg.sender][spender].add(addedValue));
    emit Approval(msg.sender, spender, _allowed[msg.sender][spender]);
    return true;
  }

  function decreaseAllowance(
    address spender,
    uint256 subtractedValue
  )
    public
    returns (bool)
  {
    require(spender != address(0));

    _allowed[msg.sender][spender] = (
      _allowed[msg.sender][spender].sub(subtractedValue));
    emit Approval(msg.sender, spender, _allowed[msg.sender][spender]);
    return true;
  }

  
  function _transfer(address from, address to, uint256 value) internal {
    require(value <= _balances[from]);
    require(to != address(0));

    _balances[from] = _balances[from].sub(value);
    _balances[to] = _balances[to].add(value);
    emit Transfer(from, to, value);
  }

 
  function _mint(address account, uint256 value) internal {
    require(account != address(0));
    _totalSupply = _totalSupply.add(value);
    _balances[account] = _balances[account].add(value);
    emit Transfer(address(0), account, value);
  }

  function _burn(address account, uint256 value) internal {
    require(account != address(0));
    require(value <= _balances[account]);

    _totalSupply = _totalSupply.sub(value);
    _balances[account] = _balances[account].sub(value);
    emit Transfer(account, address(0), value);
  }
  function _burnFrom(address account, uint256 value) internal {
    require(value <= _allowed[account][msg.sender]);
    _allowed[account][msg.sender] = _allowed[account][msg.sender].sub(
      value);
    _burn(account, value);
  }
}


contract LSB is ERC20 {
    string public name ;
    string public symbol ;
    uint public decimals ;
    constructor(string memory _name , string memory _symbol ,uint _decimals ,uint amount ) public {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        _mint(msg.sender, amount*(10**_decimals));
    }
}
`
let ABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "to",
				"type": "address"
			},
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "from",
				"type": "address"
			},
			{
				"name": "to",
				"type": "address"
			},
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_symbol",
				"type": "string"
			},
			{
				"name": "_decimals",
				"type": "uint256"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "owner",
				"type": "address"
			},
			{
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
async function test(){
   let dd = await axios.post("http://47.56.226.139/api/contract/compileContract",{
      "address":"0x0E63Bdb5cAA7D616e4355F45672a24E1C5B61D4c",
      "code":sss,
      "name":"LSB",
      "abi":JSON.stringify(ABI),
      "optimization":1,
      "version":"0.5.4"
   })
   console.log("ddd",dd.data.resp)
}
test()