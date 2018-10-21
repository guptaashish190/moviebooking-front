const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(`${__dirname}/public`));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(PORT, () => {
  console.log(`listening to port: ${PORT}`);
});
