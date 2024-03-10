const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const homeRoutes = require('./Routers/home');

const app = express();
const port = process.env.PORT || 3001;

mongoose.connect("mongodb://localhost:27017/blogdata")
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Error connecting to MongoDB:", err));

app.set('view engine','ejs');
app.use(express.static('public'));

// body parser 
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



app.use('/' , homeRoutes);

app.listen(port, () => console.log(`Server listening on port ${port}`));