const express = require('express')
const cors = require('cors');
const app = express()

const {getVideoMeta} = require("tiktok-scraper");
const dotenv = require('dotenv');
dotenv.config();


app.use(cors())
app.use(express.static('public'))
app.set('view engine', 'ejs');

app.get('/download', (req, res) => {
    var URL = req.query.URL;

    (async () => {
        try {
            const videoMeta = await getVideoMeta(URL, {});
            res.json(videoMeta);
        } catch (error) {
            res.status(500).send({ error: 'Something failed!' })
        }
    })();
})

app.get('/',function(req,res){
    res.render('index', {
        urlServer: process.env.APP_URL,
    });
});

app.listen(process.env.PORT, () => {
    console.log(`app listening on port ${process.env.PORT}`)
})
