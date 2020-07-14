
// DEPENDENCIES

// EXPRESS CONFIGURATION
var express = require("express");

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTER

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


// LISTENEr

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});