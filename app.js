const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Connecting to MongoDB database.
const {
    mongoURI
} = require('./config/db');

mongoose.connect(mongoURI, {
        useNewUrlParser: true
    }).then(() => console.log('Connected to MongoDB Server...'))
    .catch(err => console.log(`Error connecting to MongoDB server...${err}`));

// BodyParser Middleware.
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

// Importing routes.
const api = require('./routes/route');

app.get('/', (req, res) => {
    res.send(`Listening on port: ${port}`);
});

// Using routes.
app.use('/api', api);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port: ${port}`));