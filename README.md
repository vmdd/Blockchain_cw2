# COMP70017-CW2

In coursework 2, you are given a decentralized application for a tic-tac-toe game. The code is not yet complete, and we ask you to please complete the missing parts, identified with `/*Please complete the code here.*/`. We packaged all into a docker container, such that you literally don't need to configure anything.

## Instructions
Once you completed the contract (`contracts/TicTacToe.sol`), you can run `docker build -t tic-tac-toe .` to build the tic-tac-toe docker image.

We provide several test cases to test the basic functions of your contract. You can run `docker run tic-tac-toe npm test` to check the test results. You are encourage to extend the tests. Our grading script will follow the similar way (i.e., to test your smart contract and grade based on the test results). Prerequisite: please [install docker](https://docs.docker.com/desktop/) on your system.

To set up and play your tic-tac-toe game, you can
1. start ganache test chain

`docker run -p 8545:8545 -d trufflesuite/ganache-cli:latest -g 0`

2. start web server

`docker run -p 8080:8080 -d tic-tac-toe`

3. open `http://localhost:8080/` in two separate web browsers with each a separate Metamask installed and enjoy the game. On Chrome you can create **two different users** and install Metamask in each. You'll need to configure Metamask to connect to your local chain as well (which is not graded but we leave up to you as part of the exercise for your own testing).
