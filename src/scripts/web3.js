import { useSelector } from "react-redux";
// 0x077083b6139de63c2a358A681D4F57F486042956
const Web3 = require("web3");
const ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      { internalType: "uint64", name: "id_", type: "uint64" },
      { internalType: "string[]", name: "emails_", type: "string[]" },
    ],
    name: "addEmailsToPrivatePoll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint64", name: "id_", type: "uint64" },
      { internalType: "uint8", name: "qNumber_", type: "uint8" },
      { internalType: "uint8[]", name: "answers", type: "uint8[]" },
      { internalType: "string", name: "textAnswer", type: "string" },
    ],
    name: "answerQuestion",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint64", name: "id_", type: "uint64" },
      { internalType: "uint8[]", name: "answers_", type: "uint8[]" },
      { internalType: "string[]", name: "textAnswers_", type: "string[]" },
      { internalType: "uint8[]", name: "optionsPerQuestion_", type: "uint8[]" },
    ],
    name: "answerQuestions",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "name_", type: "string" },
      { internalType: "string", name: "lastName_", type: "string" },
      { internalType: "string", name: "birthDate_", type: "string" },
      { internalType: "string", name: "phoneNumber_", type: "string" },
      { internalType: "string", name: "email", type: "string" },
      { internalType: "enum PollNFT.Gender", name: "gender_", type: "uint8" },
    ],
    name: "buyNFT",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "string", name: "name_", type: "string" },
      { internalType: "string", name: "lastName_", type: "string" },
      { internalType: "string", name: "birthDate_", type: "string" },
      { internalType: "string", name: "phoneNumber_", type: "string" },
      { internalType: "string", name: "email", type: "string" },
      { internalType: "enum PollNFT.Gender", name: "gender_", type: "uint8" },
    ],
    name: "changeData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint64", name: "id_", type: "uint64" },
      { internalType: "uint16", name: "usersLimit_", type: "uint16" },
      { internalType: "uint256", name: "endTime_", type: "uint256" },
    ],
    name: "changeLimits",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "price", type: "uint256" }],
    name: "changeNFTprice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint64", name: "id_", type: "uint64" },
      { internalType: "uint8", name: "qNumber_", type: "uint8" },
    ],
    name: "changeQuestionsAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "title_", type: "string" },
      { internalType: "uint256", name: "endTime_", type: "uint256" },
      { internalType: "uint16", name: "usersLimit_", type: "uint16" },
      { internalType: "bool", name: "privatePoll_", type: "bool" },
      { internalType: "uint8", name: "questionsAmount_", type: "uint8" },
    ],
    name: "createPoll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint64", name: "id_", type: "uint64" },
      { internalType: "uint8", name: "qNumber_", type: "uint8" },
      { internalType: "string", name: "question_", type: "string" },
      { internalType: "string[]", name: "options_", type: "string[]" },
      { internalType: "enum Poll.QType", name: "qType_", type: "uint8" },
    ],
    name: "fillQuestion",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint64", name: "id_", type: "uint64" },
      { internalType: "string[]", name: "questions_", type: "string[]" },
      { internalType: "string[]", name: "options_", type: "string[]" },
      { internalType: "uint8[]", name: "optionsPerQuestion", type: "uint8[]" },
      { internalType: "enum Poll.QType[]", name: "qTypes_", type: "uint8[]" },
    ],
    name: "fillQuestions",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "getArrayOfNfts",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId_", type: "uint256" }],
    name: "getCompletedPolls",
    outputs: [{ internalType: "uint64[]", name: "", type: "uint64[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint64", name: "tokenId_", type: "uint64" }],
    name: "getCreatedPolls",
    outputs: [{ internalType: "uint64[]", name: "pollsId", type: "uint64[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId_", type: "uint256" }],
    name: "getCreatedPolls",
    outputs: [{ internalType: "uint64[]", name: "", type: "uint64[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint64", name: "id_", type: "uint64" },
      { internalType: "string", name: "email_", type: "string" },
    ],
    name: "getEmailAccessToPoll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint64", name: "id_", type: "uint64" }],
    name: "getMembersId",
    outputs: [
      { internalType: "uint256[]", name: "membersId", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint64", name: "id_", type: "uint64" },
      { internalType: "uint8", name: "qNumber_", type: "uint8" },
    ],
    name: "getPollStatistic",
    outputs: [
      { internalType: "uint32[]", name: "", type: "uint32[]" },
      { internalType: "string[]", name: "", type: "string[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint64", name: "id_", type: "uint64" },
      { internalType: "uint8", name: "qNumber_", type: "uint8" },
    ],
    name: "getQuestion",
    outputs: [
      { internalType: "string", name: "question", type: "string" },
      { internalType: "string[]", name: "options", type: "string[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "tokenId_", type: "uint256" },
      { internalType: "uint64", name: "id_", type: "uint64" },
      { internalType: "uint8", name: "qNumber_", type: "uint8" },
    ],
    name: "getUserAnswers",
    outputs: [
      { internalType: "uint32[]", name: "", type: "uint32[]" },
      { internalType: "string", name: "", type: "string" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint64", name: "", type: "uint64" }],
    name: "polls",
    outputs: [
      { internalType: "string", name: "title", type: "string" },
      { internalType: "uint8", name: "questionsAmount", type: "uint8" },
      { internalType: "uint16", name: "usersLimit", type: "uint16" },
      { internalType: "bool", name: "privatePoll", type: "bool" },
      { internalType: "address", name: "creator", type: "address" },
      { internalType: "bool", name: "active", type: "bool" },
      { internalType: "uint256", name: "endTime", type: "uint256" },
      { internalType: "uint64", name: "id", type: "uint64" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint64", name: "id_", type: "uint64" },
      { internalType: "string", name: "email", type: "string" },
    ],
    name: "removeEmailFromPrivatePoll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint64", name: "id_", type: "uint64" }],
    name: "togglePollActivate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint64", name: "id_", type: "uint64" }],
    name: "togglePollPrivacy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "userInfo",
    outputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "lastName", type: "string" },
      { internalType: "enum PollNFT.Gender", name: "gender", type: "uint8" },
      { internalType: "string", name: "birthDate", type: "string" },
      { internalType: "string", name: "phoneNumber", type: "string" },
      { internalType: "bytes32", name: "email", type: "bytes32" },
      { internalType: "uint32", name: "experience", type: "uint32" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export function walletConnection() {
  return new Promise((resolve, reject) => {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== "undefined") {
      // Create a new Web3 instance
      const web3 = new Web3(window.ethereum);

      // Request access to the user's MetaMask accounts
      window.ethereum
        .enable()
        .then(() => {
          // Accounts now exposed
          // You can now use web3.eth.getAccounts() to retrieve the accounts

          web3.eth.getAccounts().then((accounts) => {
            // Check if the user is connected
            if (accounts.length > 0) {
              // Retrieve the first account (account[0])
              const account = accounts[0];
              localStorage.setItem("account", account);
              resolve(account);
            } else {
              reject(new Error("Please connect to MetaMask"));
            }
          });
        })
        .catch((error) => {
          let err;
          reject((error = error.code));
          return err;
        });

      // Listen for account disconnection
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length === 0) {
          console.log("Disconnected from MetaMask");
          // Perform actions on disconnection
        }
      });
    } else {
      reject(new Error("Please install MetaMask"));
    }
  });
}

export async function createNFT(
  _name,
  _lastName,
  _bDay,
  _tel,
  _email,
  _gender
) {
  try {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      ABI,
      "0xa5d65b56BC9735A89E0Eb3a6386c2E1472379a46"
    );
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    await contract.methods
      .buyNFT(_name, _lastName, _bDay, _tel, _email, _gender)
      .send({ from: account, gas: 350000 });
  } catch (error) {
    console.error("Error creating NFT:", error);
  }
}

export async function createPoll(
  _title,
  _endTime,
  _usersLimit,
  _privatePoll,
  _questionsAmount
) {
  try {
    let status;
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      ABI,
      "0xa5d65b56BC9735A89E0Eb3a6386c2E1472379a46"
    );

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    const gasLimit = await contract.methods
      .createPoll(_title, _endTime, _usersLimit, _privatePoll, _questionsAmount)
      .estimateGas({ from: account });
    const transaction = await contract.methods
      .createPoll(_title, _endTime, _usersLimit, _privatePoll, _questionsAmount)
      .send({ from: account, gas: gasLimit });
  } catch (error) {
    console.error("Error creating NFT:", error);
  }
}

export async function getTokenId(_account) {
  try {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      ABI,
      "0xa5d65b56BC9735A89E0Eb3a6386c2E1472379a46"
    );
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    let tokenId = await contract.methods.getArrayOfNfts(account).call();
    return Number(tokenId);
  } catch (error) {
    console.error("Error creating NFT:", error);
  }
}

export async function getCreatedPolls(_tokenID) {
  try {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      ABI,
      "0xa5d65b56BC9735A89E0Eb3a6386c2E1472379a46"
    );
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    let createdPollsArray = await contract.methods
      .getCreatedPolls(_tokenID)
      .call();

    return createdPollsArray;
  } catch (error) {
    console.error("Error creating NFT:", error);
  }
}

export async function getUserInfo() {
  let tokenId = Number(await getTokenId());

  try {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      ABI,
      "0xa5d65b56BC9735A89E0Eb3a6386c2E1472379a46"
    );
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    let userInfo = await contract.methods.userInfo(tokenId).call();

    return userInfo;
  } catch (error) {
    console.error("Error creating NFT:", error);
  }
}

export async function getPolls() {
  if (window.ethereum) {
    try {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(
        ABI,
        "0xa5d65b56BC9735A89E0Eb3a6386c2E1472379a46"
      );
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      // Define and implement getTokenId function
      let tokenId = await getTokenId(account);
      let pollsId = await contract.methods.getCreatedPolls(tokenId).call();
      let polls = [];
      for (let i = 0; i < pollsId.length; i++) {
        polls[i] = await contract.methods.polls(pollsId[i]).call();
      }

      return polls;
    } catch (error) {
      console.error("Error retrieving polls:", error);
      throw error;
    }
  } else {
    console.error("MetaMask not found");
    return []; // or throw an error, depending on your requirement
  }
}

export async function getPollsQuestion(_pollsId) {
  try {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      ABI,
      "0xa5d65b56BC9735A89E0Eb3a6386c2E1472379a46"
    );
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];

    let polls = await contract.methods.polls(16).call();
    for (let i = 0; i < polls.questionsAmount; i++) {
      var questionsData = await contract.methods.getQuestion(16, i).call();
    }

    return questionsData;
  } catch (error) {
    console.error("Error creating NFT:", error);
  }
}

export async function changeUserData(
  _name,
  _lastName,
  _gender,
  _email,
  _bDay,
  _phoneNumber
) {
  let txStatus;
  try {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      ABI,
      "0xa5d65b56BC9735A89E0Eb3a6386c2E1472379a46"
    );

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    let tokenId = await getTokenId();

    await contract.methods
      .changeData(
        tokenId,
        _name,
        _lastName,
        _gender,
        _email,
        _bDay,
        _phoneNumber
      )
      .send({ from: account, gas: 350000 })
      .on("receipt", (receipt) => {
        // Transaction successfully mined
        txStatus = receipt.status;
      })
      .on("error", (error) => {
        console.error("Error:", error);
      });
    return txStatus;
  } catch (error) {
    console.error("Error creating NFT:", error);
  }
}

export async function fillQuestion(
  _tokenID,
  _qnumber,
  _question,
  _options,
  _qType
) {
  try {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      ABI,
      "0xa5d65b56BC9735A89E0Eb3a6386c2E1472379a46"
    );
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    let tokenId = await getTokenId(account);

    await contract.methods
      .fillQuestion(16, _qnumber, _question, _options, _qType)
      .send({ from: account, gas: 350000 });
  } catch (error) {
    console.error("Error creating NFT:", error);
  }
}

export async function fillQuestions(
  _tokenID,
  _questions,
  _options,
  _optionsPerQuestions,
  _qType
) {
  try {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      ABI,
      "0xa5d65b56BC9735A89E0Eb3a6386c2E1472379a46"
    );
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    const gasLimit = await contract.methods
      .fillQuestions(
        _tokenID,
        _questions,
        _options,
        _optionsPerQuestions,
        _qType
      )
      .estimateGas({ from: account });

    await contract.methods
      .fillQuestions(
        _tokenID,
        _questions,
        _options,
        _optionsPerQuestions,
        _qType
      )
      .send({ from: account, gas: gasLimit });
  } catch (error) {
    console.error("Error creating fillquestion:", error);
  }
}

export async function answerQuestions(
  _id,
  _answer,
  _textAnswer,
  _optionsPerQuestion
) {
  try {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      ABI,
      "0xa5d65b56BC9735A89E0Eb3a6386c2E1472379a46"
    );
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    let tokenId = await getTokenId(account);
    const gasLimit = await contract.methods
      .answerQuestions(_id, _answer, _textAnswer, _optionsPerQuestion)
      .estimateGas({ from: account });
    await contract.methods
      .answerQuestions(_id, _answer, _textAnswer, _optionsPerQuestion)
      .send({ from: account, gas: gasLimit });
  } catch (error) {
    console.error("Error creating NFT:", error);
  }
}

export async function getUsersSurvey() {
  try {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      ABI,
      "0xa5d65b56BC9735A89E0Eb3a6386c2E1472379a46"
    );
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    let tokenId = await getTokenId(account);
    let createdPolls = await contract.methods.getCreatedPolls(tokenId).call();
    // let polls = await contract.methods.polls().call();

    let pollsData = [];
    for (let i = 0; i < createdPolls.length; i++) {
      pollsData[i] = createdPolls[i];
    }
    let pollsInfo = [];
    for (let i = 0; i < pollsData.length; i++) {
      pollsInfo[i] = await contract.methods.polls(pollsData[i]).call();
    }
    return pollsInfo;
  } catch (error) {
    console.error("Error creating NFT:", error);
  }
}

export async function addEmailsToPrivatePoll(_id, _email) {
  try {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      ABI,
      "0xa5d65b56BC9735A89E0Eb3a6386c2E1472379a46"
    );
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];

    await contract.methods
      .addEmailsToPrivatePoll(_id, _email)
      .send({ from: account, gas: 350000 });
  } catch (error) {
    console.error("Error creating NFT:", error);
  }
}

export async function getQuestion(_pollId, _qNumber) {
  try {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      ABI,
      "0xa5d65b56BC9735A89E0Eb3a6386c2E1472379a46"
    );
    let questData = [];
    for (let i = 0; i < _qNumber; i++) {
      questData[i] = await contract.methods.getQuestion(_pollId, i).call();
    }
    return questData;
  } catch (error) {
    console.error("Error creating NFT:", error);
  }
}

export async function getAllQuestionqs() {
  let tokenId = await getTokenId(localStorage.getItem("account"));
  // let createdPollsArray = [];
  let createdPollsArray = await getCreatedPolls(tokenId);

  let pollsData = [];
  let counter = 0;

  for (let i = 0; i < createdPollsArray.length; i++) {
    let array = [];
    for (let j = 0; j < 4; j++) {
      array[counter] = await getQuestion(+createdPollsArray[i], j);
      counter++;
    }
    pollsData[i] = array;
  }
}

export async function getUsersAnswers(_tokenId, _id, _qnumber) {
  let tokenId = Number(await getTokenId());

  try {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      ABI,
      "0xa5d65b56BC9735A89E0Eb3a6386c2E1472379a46"
    );
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    let userAnswer = [];
    for (let i = 0; i < _qnumber; i++) {
      userAnswer[i] = await contract.methods
        .getUserAnswers(_tokenId, _id, i)
        .call();
    }
    return userAnswer;
  } catch (error) {
    console.error("Error creating NFT:", error);
  }
}
