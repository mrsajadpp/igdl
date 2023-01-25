const express = require('express');
const instagramGetUrl = require("instagram-url-direct");
const bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('Igdl is up.')
})

app.post('/api/ig/download', async (req, res) => {
  try {
    if (req.body.url.startsWith('https://instagram.com/') || req.body.url.startsWith('http://instagram.com/') || req.body.url.startsWith('http://www.instagram.com/') || req.body.url.startsWith('https://www.instagram.com/')) {
      const links = await instagramGetUrl(req.body.url)
      if (req.body.type == 'mp4') {
        res.redirect(links.url_list[0])
      } else {
        if (req.body.type == 'mp3') {
          res.header('Content-Disposition', 'attachment; filename="' + new Date() + '- Fizzy.mp3"');
          res.write(links.url_list[0], 'binary');
          res.end();
        }
      }
    } else {
      res.json({ error: 'Not found', status: 404 })
    }
  }
  catch (err) {
    res.json({ error: err, status: 500 })
  }
})

app.get('*', (req, res) => {
    res.json({ error: 'Not found', status: 404 })    
})