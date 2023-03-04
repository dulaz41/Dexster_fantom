const hre = require("hardhat");

async function main() {
  const FaucetContract = await hre.ethers.getContractFactory("Faucet");
  const faucet = await FaucetContract.deploy();
  await faucet.deployed();

  console.log("Faucet Contract deployed to:", faucet.address);

  const DAI_Token = "0x82d984B5adfD7796D7fDFa4403726478dD341DE7";
  const FTM_Token = "0x3c355d9327819F1cbD7A4650C51b5449ac285266";

  const LiquidityPoolContract = await hre.ethers.getContractFactory(
    "LiquidityPool"
  );
  const liquidityPool = await LiquidityPoolContract.deploy(
    DAI_Token,
    FTM_Token
  );
  await liquidityPool.deployed();

  console.log("liquidityPool Contract deployed to:", liquidityPool.address);

  const DexContract = await hre.ethers.getContractFactory("Dex");
  const dex = await DexContract.deploy();
  await dex.deployed();

  console.log("Dex Contract deployed to:", dex.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
