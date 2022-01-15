const express = require("express");
const req = require("express/lib/request");
const mongoose = require("mongoose");
const app = express();
const musicController = require("./controllers/music.controllers");
const artistController = require("./controllers/artist.controller");
app.use(express.json());
app.use("/music", musicController);
app.use("/songs", artistController);

module.exports = app;