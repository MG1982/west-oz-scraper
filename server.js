const exphbs = require("express-handlebars");
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

// Initialize Express
let app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));

// Handlebars
app.engine('hbs', exphbs({ defaultLayout: "main", extname: '.hbs' }));
app.set('view engine', '.hbs');

// Connect to the Mongo DB
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

// Listener
let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Running on: http://localhost:${PORT}/`);
}); 