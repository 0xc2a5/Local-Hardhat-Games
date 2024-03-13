// add the game address here and update the contract name if necessary
const games = {
  game1: {
    gameAddr: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
    contractName: "Game1"
  },
  game2: {
    gameAddr: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
    contractName: "Game2"
  },
  game3: {
    gameAddr: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
    contractName: "Game3"
  },
  game4: {
    gameAddr: "0x0165878A594ca255338adfa4d48449f69242Eb8F",
    contractName: "Game4"
  },
  game5: {
    gameAddr: "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853",
    contractName: "Game5"
  }
};

async function getContract(game) {
  const { gameAddr, contractName } = game;
  return hre.ethers.getContractAt(contractName, gameAddr);
}

async function win(game, ...args) {
  const tx = await game.win(...args);
  const receipt = await tx.wait();
  console.log(receipt);
}

async function game1() {
  const game = await getContract(games.game1);
  await win(game);
}

async function game2() {
  const game = await getContract(games.game2);

  const tx1 = await game.setX(20);
  const tx2 = await game.setY(30);
  await tx1.wait();
  await tx2.wait();

  await win(game);
}

async function game3() {
  const game = await getContract(games.game3);
  await win(game, 255 - 210);
}

async function game4() {
  const game = await getContract(games.game4);
  await win(game, 256 - 210 + 10, { gasLimit: 100000 });
}

async function game5() {
  const game = await getContract(games.game5);
  const amount = 10001;

  const tx1 = await game.giveMeAllowance(amount);
  await tx1.wait();

  const tx2 = await game.mint(amount);
  await tx2.wait();

  await win(game);
}

async function main() {
  return Promise.all([game1(), game2(), game3(), game4(), game5()]);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
