const express = require("express");
const puppeteer = require('puppeteer');
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

async function getVideo(url) {
  try{
  const launch = await puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await launch.newPage();
  await page.goto(url);
  setTimeout(async () => {
    let src = await page.$eval("video", n => n.getAttribute("src"))
    console.log(src);
    res.header('Content-Disposition', 'attachment; filename="' + new Date() + ' - Fizzy.mp4"');
    res.write(src, 'binary');
    res.end();
    await launch.close();
  }, 3000)
  }
  catch(err){
    console.error(err)
  }
}

app.post("/api/ig/download", async (req, res) => {
  try {
    getVideo(req.body.url);
  } catch (err) {
    console.error(err)
  }
});

app.get('*', (req, res) => {
    res.json({ error: 'Not found', status: 404 })    
})
