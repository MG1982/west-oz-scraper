const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const app = express();
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
const Handlebars = require('handlebars');
const expressHandlebars = require("express-handlebars")
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine('handlebars', expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set("view engine", "handlebars")

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

mongoose.connect(MONGODB_URI);

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});

module.exports = app;