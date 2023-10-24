
const express = require('express');
const app = express();

const port = process.env.PORT || 5000;


app.get('/', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, 'public')});
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });