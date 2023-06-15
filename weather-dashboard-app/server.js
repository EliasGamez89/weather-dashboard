const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'weather-dashboard-app', 'views'));

app.use(express.static(path.join(__dirname, 'html')));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
