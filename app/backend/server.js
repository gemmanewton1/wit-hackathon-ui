const express = require('express');
const cors = require('cors');
const app = express();
const data = require('./fakeData.json');

app.use(cors());

app.get('/api/healthdata', (req, res) => {
  res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
