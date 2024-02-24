import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Contract cases", function () {
  
  async function deployContractsInstances() {

    const [owner, otherAccount] = await ethers.getSigners();

    const WCXTOKEN = await ethers.getContractFactory("Stake");
    const token = await WCXTOKEN.deploy();

    const Piggy = await ethers.getContractFactory("StakingContract");
    const piggy = await Piggy.deploy(token.target);

    return { token, piggy, owner, otherAccount };
  }

  describe("Contracts Deployments", function () {
    it("Should pass if WCXTOKEN contract has deployed succesffully", async function () {
      const { token } = await loadFixture(deployContractsInstances);

      expect(token).to.exist;
    });
    it("Should pass if Piggy contract has deployed succesffully", async function () {
      const { piggy } = await loadFixture(deployContractsInstances);

      expect(piggy).to.exist;
    });
  });

})

describe('StakingContract', () => {
  let stakingContract: any;
  let stakingToken: any;



  it('should emit Staked event', async () => {
    const [owner, otherAccount] = await ethers.getSigners();

    const WCXTOKEN = await ethers.getContractFactory("Stake");
    const token = await WCXTOKEN.deploy();

    const Piggy = await ethers.getContractFactory("StakingContract");
    const piggy = await Piggy.deploy(token.target);

    const amount = ethers.parseUnits('100', 18);

    const amount2 = ethers.parseUnits('10', 18);

    // Approve the staking contract to transfer tokens on behalf of the owner
    await token.connect(owner).approve(piggy.target, amount);

    // Check the owner's token balance and allowance
    const ownerBalance = await token.balanceOf(owner.address);
    const allowance = await token.allowance(owner.address, piggy.target);

    console.log("Owner balance:", ownerBalance.toString());
    console.log("Allowance for piggy:", allowance.toString());

    // Stake the approved amount
    await piggy.connect(owner).stake(amount2);

    await expect(piggy.stake(amount2))
        .to.emit(piggy, 'Staked').withArgs(owner.address, amount2);
});


it('should emit Unstaked event', async () => {
  const [owner, otherAccount] = await ethers.getSigners();

  const WCXTOKEN = await ethers.getContractFactory("Stake");
  const token = await WCXTOKEN.deploy();

  const Piggy = await ethers.getContractFactory("StakingContract");
  const piggy = await Piggy.deploy(token.target);

  const amount = ethers.parseUnits('100', 18);
  const amount2 = ethers.parseUnits('10', 18);
  const amount3 = ethers.parseUnits('1', 18);

  // Transfer a large amount of tokens from the owner to the staking contract
  const largeAmount = ethers.parseUnits('1000', 18);
  await token.connect(owner).transfer(piggy.target, largeAmount);

  // Approve the staking contract to transfer tokens on behalf of the owner
  await token.connect(owner).approve(piggy.target, amount);

  // Stake the approved amount
  await piggy.connect(owner).stake(amount2);

  // Check the owner's token balance before unstaking
  const ownerBalanceBefore = await token.balanceOf(owner.address);
  console.log("Owner balance before unstaking:", ownerBalanceBefore.toString());

  // Unstake the specified amount
  await expect(piggy.unstake()).to.emit(piggy, 'Unstaked');

  // Check the owner's token balance after unstaking
  const ownerBalanceAfter = await token.balanceOf(owner.address);
  console.log("Owner balance after unstaking:", ownerBalanceAfter.toString());
});



  it('should emit RewardPaid event', async () => {
    const [owner, otherAccount] = await ethers.getSigners();

    let rewardAmount: any;

    const WCXTOKEN = await ethers.getContractFactory("Stake");
    const token = await WCXTOKEN.deploy();
  
    const Piggy = await ethers.getContractFactory("StakingContract");
    const piggy = await Piggy.deploy(token.target);
  
    const amount = ethers.parseUnits('100', 18);
    const amount2 = ethers.parseUnits('10', 18);
    const amount3 = ethers.parseUnits('1', 18);
  
    // Transfer a large amount of tokens from the owner to the staking contract
    const largeAmount = ethers.parseUnits('1000', 18);
    await token.connect(owner).transfer(piggy.target, largeAmount);
  
    // Approve the staking contract to transfer tokens on behalf of the owner
    await token.connect(owner).approve(piggy.target, amount);
  
    // Stake the approved amount
    await piggy.connect(owner).stake(amount2);
  
    // Check the owner's token balance before unstaking
    const ownerBalanceBefore = await token.balanceOf(owner.address);
    console.log("Owner balance before unstaking:", ownerBalanceBefore.toString());
  

      await expect(piggy.unstake())
          .to.emit(piggy, 'RewardPaid');
  });
});