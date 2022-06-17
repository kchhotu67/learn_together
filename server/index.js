require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');
const upload = require('express-fileupload');
app.use(bodyParser.json());

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
}))


app.use(upload());

app.use('/api/v1/users', require('./routes/user'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/topics', require('./routes/topics'));
app.use('/api/v1/rooms', require('./routes/room'));
app.use('/api/v1/messages', require('./routes/message'));
app.use('/api/v1/recents', require('./routes/recent'));
app.use('/api/v1/upload', require('./routes/upload'));
app.use('/api/v1/participants', require('./routes/participants'));

app.use('/api/v1/static/images', express.static(path.join(__dirname, 'images')));

app.get('/api/v1/test', (req, res) => {
  res.send('OK');
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});