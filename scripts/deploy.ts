import { ethers } from "hardhat";

async function main() {

  const TokenFactory = await ethers.getContractFactory("Stake");
  const Token = await TokenFactory.deploy();


  const StakingContractFactory = await ethers.getContractFactory("StakingContract");
  const stakingContract = await StakingContractFactory.deploy(Token.target);
 

  console.log(

    `Token Contract was deployed to ${Token.target}

    Staking Contract was deployed to ${stakingContract.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
