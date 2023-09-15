
const hre = require("hardhat");

async function sleep(ms) {
  return new Promise((resolve) =>setTimeout(resolve, ms));
}

async function main() {
  // const [deployer] = await ethers.getSigners();
  // console.log("Deploying contract with account:", deployer.address);
  // console.log("Account Balance", (await deployer.getBalance()).toString());

  // const ZanjiToken = await hre.ethers.getContractFactory("ZanjiTron");
  // const token = await ZanjiToken.deploy(5000000);
  // await token.deployed();
  // console.log("Token Address:", token.address);

  const tokenContract = await hre.ethers.deployContract("ZANJI");
  await tokenContract.waitForDeployment();
  console.log("Token Deployed to:", tokenContract.target);

  // wait for some seconds (30) to let swiss tron deploy.
  await sleep(30 * 1000);

  // Verify contract
  await hre.run("verify:verify", {
    address: tokenContract.target,
    constructorArguments: [tokenContract.target],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
