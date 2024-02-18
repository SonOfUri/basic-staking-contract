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