const express = require("express");
const app = express();
const path = require('path');
var logger = require("morgan");
const cors = require('cors')

const PORT = process.env.PORT || 3001;

// Use morgan logger for logging requests
app.use(logger("dev"));
app.use(cors())
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// app.get("*", function(req,res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});