require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
const { URL, PRIVATE_KEY } = process.env;
module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};
