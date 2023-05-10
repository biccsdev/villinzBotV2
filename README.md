# VILLINZ Bot | Solana Blockchain Twitter Bot 

## Description

This repository contains the code for a twitter bot that tweets the most recent mint of a new NFT from a certain collection in the Solana Blockchain. It was built as a contribution to a community that is building a brand around Intellectual Property and music decentralization.

By Implementing this system, the target solana community was able to gain more exposure to the collection they were minting out, as the most recent NFT minted would be tweeted every time, and more people would be aware of the event going on. This system showed positive results by identifying that after the implementation of this twitter bot the collection of NFTs minted out faster ( sold out 1 month after release of this bot ) than before the implementation ( sale had been happening for 3 months before implementation and it was between 50-55% sold ).

I wanted to make a contribution to this project via developing a system for them in order to get my hands dirty with Solana Blockchain development and learn how to interact with the Twitter API, as this was one of my firsts projects built with these technologies.


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

If you want to run your own version of this bot for your Solana project follow these steps:
- Clone this repo ``` git clone ... ```
- Move to the repo path ``` cd repoName ```
- Install all the dependencies ``` npm install ```
- Run the project ```npm run start```
## Usage

Before running this project with ```npm run start``` you should:
- Generate your own [theblockchainapi](https://www.npmjs.com/package/theblockchainapi) API Keys and paste them on lines 37 and 38 of ``` /helpers/buildTweet.js ``` or implement an ```env``` file
- Implement your Twitter developer Keys in the ```/twitterClient.js``` file
- Update the ```/serviceAccount.json``` file with your own project's data from firebase
- Update the Public address for the address of the mint wallet at ```/helpers/buildTweet.js``` on line 25 

## Credits

This project is built with the following technologies:
- [@Solana/Web3.js](https://solana-labs.github.io/solana-web3.js/): to connect to the Solana blockchain
- [theblockchainapi](https://www.npmjs.com/package/theblockchainapi): to retrieve metadata from the most recent minted NFT
- [expressJs](https://expressjs.com/): to create the API to call the function
- [firebase-admin](https://www.npmjs.com/package/firebase-admin): to host the app as a cloud function and store images in a cloud DB
- [twitter-api-v2](https://developer.twitter.com/en/docs/twitter-api): to allow connection with Twitter 

## License

MIT License
