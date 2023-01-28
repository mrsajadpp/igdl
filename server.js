const express = require("express");
const instagramGetUrl = require("instagram-url-direct")
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const axios = require("axios");
const cheerio = require("cheerio");
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('Igdl is up.')
})

app.post("/api/ig/download", async (req, res) => {
  try{
  let links = await instagramGetUrl(req.body.url)
  console.log(links)
  res.header('Content-Disposition', 'attachment; filename="' + new Date() + ' - Fizzy.mp4"');
  res.write(links.url_list[0], 'binary');
  res.end();
  } catch(err) {
    console.error(err)
  }
});

app.get('*', (req, res) => {
    res.json({ error: 'Not found', status: 404 })    
})
