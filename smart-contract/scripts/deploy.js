const hre = require("hardhat");

async function main() {
  const FaucetContract = await hre.ethers.getContractFactory("Faucet");
  const faucet = await FaucetContract.deploy();
  await faucet.deployed();

  console.log("Faucet Contract deployed to:", faucet.address);

  const DexContract = await hre.ethers.getContractFactory("Dex");
  const dex = await DexContract.deploy();
  await dex.deployed();

  console.log("Dex Contract deployed to:", dex.address);

  // const token1 = ;
  // const token2 = ;

  // const LiquidityPoolContract = await hre.ethers.getContractFactory(
  //   "LiquidityPool"
  // );
  // const liquidityPool = await LiquidityPoolContract.deploy(token1,token2);
  // await liquidityPool.deployed();

  // console.log("liquidityPool Contract deployed to:", liquidityPool.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
