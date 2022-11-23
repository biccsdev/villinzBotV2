require("dotenv").config({ path: __dirname + "/.env" });
const { twitterClient } = require("./twitterClient.js")
const { download } = require("./helpers/download");
const CronJob = require("cron").CronJob;
const express = require('express');
const { buildTweet } = require("./helpers/buildTweet.js");
const app = express()
const port = process.env.PORT || 4000;
const admin = require("firebase-admin");
var serviceAccount = require("./serviceAccount.json");
const fs = require("fs");


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const dbSig = admin.firestore().doc('tokens/mint');

const tweet = async () => {
    try {
        const metadata = await buildTweet(dbSig);
        if (metadata) {
            const uri = metadata.img;
            const filename = metadata.name;

            download(uri, filename, async function () {
                try {
                    const mediaId = await twitterClient.v1.uploadMedia(`./${filename}`);
                    await twitterClient.v2.tweet({
                        text: metadata.content,
                        media: {
                            media_ids: [mediaId]
                        }
                    });
                } catch (e) {
                    console.log(e)
                }
            });

            // fs.unlink(`./image.png`, (err => {
            //     if (err) console.log(err);
            //     else {
            //         console.log(`\nDeleted file: ${metadata.name}`)
            //     }
            // }));

        } else {
            console.log("- No new Mint");
        }
    } catch (e) {
        console.log(e);
    }

}

const cronTweet = new CronJob("* * * * *", async () => {
    tweet();
});

cronTweet.start();