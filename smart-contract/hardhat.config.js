require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",

  networks: {
    testnet: {
      url: `https://endpoints.omniatech.io/v1/fantom/testnet/public`,
      chainId: 4002,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};
