import { ethers } from "hardhat";

async function main() {

  const stakingContract = await ethers.deployContract("StakingContract");

  await stakingContract.waitForDeployment();

  console.log(
    `Staking Contract was deployed to ${stakingContract.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
