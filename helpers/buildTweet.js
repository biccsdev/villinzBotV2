const { Connection, PublicKey } = require("@solana/web3.js");
const theblockchainapi = require('theblockchainapi');
const fetch = require('node-fetch');

const content = {
    MSG_1: 'Fresh out of the oven 🥶 @madvillevillinz #VILLINZ',
    MSG_2: 'New Mint Alert! 🚨 @madvillevillinz #VILLINZ',
    MSG_3: 'Someone just minted this gem 💎 @madvillevillinz #VILLINZ',
    MSG_4: 'Another one 🔑 @madvillevillinz #VILLINZ',
    MSG_5: 'One Mint closer to WORLD DOMINATION 🔥 @madvillevillinz #VILLINZ',
    MSG_6: 'This one is out of this world! 👀 @madvillevillinz #VILLINZ',
    MSG_7: '🥶🔥👀🚨🤯 @madvillevillinz #VILLINZ',
    MSG_8: '🫡 @madvillevillinz #VILLINZ',
    MSG_9: 'DAMN SON, WHERE DID YOU FIND THIS? 🙀 @madvillevillinz #VILLINZ',
    MSG_10: 'LFG, new mint! 🔥🔥 @madvillevillinz #VILLINZ',
}

const tweetContent = [content.MSG_1, content.MSG_2, content.MSG_3, content.MSG_4, content.MSG_5, content.MSG_6, content.MSG_7, content.MSG_8, content.MSG_9, content.MSG_10];

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const buildTweet = async function (dbSig) {
    const address = new PublicKey("8dTPxG3ap4vMzLCqB1ZGAc1uX3QUqNPJuBjFcNzBnSqx");
    let connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
    const signatures = await connection.getSignaturesForAddress(address, { limit: 1 });
    const sig = (await dbSig.get()).data()
    const newSignature = signatures[0].signature;
    if (sig.newSignature != newSignature) {
        await dbSig.set({ newSignature })
        try {
            let defaultClient = theblockchainapi.ApiClient.instance;
            let APIKeyID = defaultClient.authentications['APIKeyID'];
            let APISecretKey = defaultClient.authentications['APISecretKey'];

            APIKeyID.apiKey = 'YyOmDC0DHxW1ZF9';
            APISecretKey.apiKey = 'rFAglC63hy95cKF';

            const signaturesTx = await connection.getSignaturesForAddress(address, { limit: 1 });
            const sigTx = signaturesTx[0].signature;
            const transactions = await connection.getParsedTransaction(sigTx);
            const nftAddress = new PublicKey(transactions.meta.postTokenBalances[0].mint);

            let apiInstance = new theblockchainapi.SolanaNFTApi();

            const result = await apiInstance.solanaGetNFT('mainnet-beta', nftAddress).then((data) => {
                console.log('API called successfully.');
                return data;
            }, (error) => {
                console.error(error);
                return null;
            });

            const nft = await fetch(result.data.uri).then((response) => response.json()).then((data) => { return data });

            const metadata = {
                name: nft.name,
                img: nft.image,
                tx: result.explorer_url,
                content: "- A new VILLNZ just arrived - " + tweetContent[getRndInteger(0, 10)]
                    + ", VILLIN: " + nft.name + ", TX: " + result.explorer_url,
            };

            return metadata;

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = { buildTweet };