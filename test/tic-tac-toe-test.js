const { expect } = require("chai");

describe("TicTacToe", function() {
    let player1, player2;
    let ticTacToe;

    it("Should be deployed successfully", async function() {
      [player1, player2] = await ethers.getSigners();

      const TicTacToe = await ethers.getContractFactory("TicTacToe");
      ticTacToe = await TicTacToe.deploy(player2.address);
      await ticTacToe.deployed();

      expect(await ticTacToe.players(0)).to.equal(player1.address);
      expect(await ticTacToe.players(1)).to.equal(player2.address);
      expect(await ticTacToe.status()).to.equal(0);
      expect(await ticTacToe.turn()).to.equal(1);
    });

    it("Player1 should not move out of board", async function() {
      await expect(ticTacToe.connect(player1).move(9)).to.be.reverted;
    });

    it("Player1 should move successfully", async function() {
      await ticTacToe.connect(player1).move(0);
      expect((await ticTacToe.showBoard())[0]).to.equal(1);
      expect(await ticTacToe.status()).to.equal(0);
    });

    it("Player1 should not move twice", async function() {
      await expect(ticTacToe.connect(player1).move(1)).to.be.reverted;
      expect((await ticTacToe.showBoard())[1]).to.equal(0);
      expect(await ticTacToe.status()).to.equal(0);
    });

    it("Player2 should not place at the same position", async function() {
      await expect(ticTacToe.connect(player2).move(0)).to.be.reverted;
      expect((await ticTacToe.showBoard())[0]).to.equal(1);
      expect(await ticTacToe.status()).to.equal(0);
    });

    it("Player2 should move successfully", async function() {
      await ticTacToe.connect(player2).move(3);
      expect((await ticTacToe.showBoard())[3]).to.equal(2);
      expect(await ticTacToe.status()).to.equal(0);
    });

    it("Player1 should win", async function() {
      await ticTacToe.connect(player1).move(1);
      expect((await ticTacToe.showBoard())[1]).to.equal(1);
      expect(await ticTacToe.status()).to.equal(0);

      await ticTacToe.connect(player2).move(4);
      expect((await ticTacToe.showBoard())[4]).to.equal(2);
      expect(await ticTacToe.status()).to.equal(0);

      await ticTacToe.connect(player1).move(2);
      expect((await ticTacToe.showBoard())[2]).to.equal(1);
      expect(await ticTacToe.status()).to.equal(1);
    });

    it("No more move", async function() {
      await expect(ticTacToe.connect(player2).move(5)).to.be.reverted;
    });
  });


  describe("TicTacToe_2", function() {
    let player1, player2;
    let ticTacToe;

    it("Should be deployed successfully", async function() {
      [player1, player2] = await ethers.getSigners();

      const TicTacToe = await ethers.getContractFactory("TicTacToe");
      ticTacToe = await TicTacToe.deploy(player2.address);
      await ticTacToe.deployed();

      expect(await ticTacToe.players(0)).to.equal(player1.address);
      expect(await ticTacToe.players(1)).to.equal(player2.address);
      expect(await ticTacToe.status()).to.equal(0);
      expect(await ticTacToe.turn()).to.equal(1);
    });

    it("Player1 moves, turn changes to 2", async function() {
      expect(await ticTacToe.turn()).to.equal(1);
      await ticTacToe.connect(player1).move(0);
      expect(await ticTacToe.status()).to.equal(0);
      expect(await ticTacToe.turn()).to.equal(2);
    });

    it("Player2 moves, turn changes to 1", async function() {
      expect(await ticTacToe.turn()).to.equal(2);
      await ticTacToe.connect(player2).move(1);
      expect(await ticTacToe.status()).to.equal(0);
      expect(await ticTacToe.turn()).to.equal(1);
    });

    it("Draw", async function() {
      await ticTacToe.connect(player1).move(2);
      expect(await ticTacToe.status()).to.equal(0);
      await ticTacToe.connect(player2).move(4);
      expect(await ticTacToe.status()).to.equal(0);
      await ticTacToe.connect(player1).move(7);
      expect(await ticTacToe.status()).to.equal(0);
      await ticTacToe.connect(player2).move(3);
      expect(await ticTacToe.status()).to.equal(0);
      await ticTacToe.connect(player1).move(5);
      expect(await ticTacToe.status()).to.equal(0);
      await ticTacToe.connect(player2).move(8);
      expect(await ticTacToe.status()).to.equal(0);
      await ticTacToe.connect(player1).move(6);
      expect(await ticTacToe.status()).to.equal(3);
    });

    it("No more move", async function() {
      await expect(ticTacToe.connect(player1).move(5)).to.be.reverted;
      await expect(ticTacToe.connect(player2).move(5)).to.be.reverted;
    });

  });


describe("TicTacToe_3", function() {
    let player1, player2;
    let ticTacToe;

    it("Should be deployed successfully", async function() {
      [player1, player2] = await ethers.getSigners();

      const TicTacToe = await ethers.getContractFactory("TicTacToe");
      ticTacToe = await TicTacToe.deploy(player2.address);
      await ticTacToe.deployed();

      expect(await ticTacToe.players(0)).to.equal(player1.address);
      expect(await ticTacToe.players(1)).to.equal(player2.address);
      expect(await ticTacToe.status()).to.equal(0);
      expect(await ticTacToe.turn()).to.equal(1);
    });

    it("Player 1 win with board full", async function() {
      await ticTacToe.connect(player1).move(0);
      await ticTacToe.connect(player2).move(1);
      await ticTacToe.connect(player1).move(2);
      await ticTacToe.connect(player2).move(4);
      await ticTacToe.connect(player1).move(7);
      await ticTacToe.connect(player2).move(3);
      await ticTacToe.connect(player1).move(5);
      await ticTacToe.connect(player2).move(6);
      await ticTacToe.connect(player1).move(8);
      expect(await ticTacToe.status()).to.equal(1);
    });

    it("No more move", async function() {
      await expect(ticTacToe.connect(player1).move(5)).to.be.reverted;
      await expect(ticTacToe.connect(player2).move(5)).to.be.reverted;
    });

  });


  describe("TicTacToe_4", function() {
    let player1, player2;
    let ticTacToe;

    it("Should be deployed successfully", async function() {
      [player1, player2] = await ethers.getSigners();

      const TicTacToe = await ethers.getContractFactory("TicTacToe");
      ticTacToe = await TicTacToe.deploy(player2.address);
      await ticTacToe.deployed();

      expect(await ticTacToe.players(0)).to.equal(player1.address);
      expect(await ticTacToe.players(1)).to.equal(player2.address);
      expect(await ticTacToe.status()).to.equal(0);
      expect(await ticTacToe.turn()).to.equal(1);
    });

    it("Player 2 win vertical", async function() {
      await ticTacToe.connect(player1).move(0);
      await ticTacToe.connect(player2).move(1);
      await ticTacToe.connect(player1).move(2);
      await ticTacToe.connect(player2).move(4);
      await ticTacToe.connect(player1).move(3);
      await ticTacToe.connect(player2).move(7);
      expect(await ticTacToe.status()).to.equal(2);
    });

    it("No more move", async function() {
      await expect(ticTacToe.connect(player1).move(5)).to.be.reverted;
      await expect(ticTacToe.connect(player2).move(5)).to.be.reverted;
    });

  });
  