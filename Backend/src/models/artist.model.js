const req = require("express/lib/request");
const mongoose = require("mongoose");
const list = require("./music.models");

const artistSchema = new mongoose.Schema({
    artist_name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "album",
        require: true,
    },
    // artist: {
    //     type: String,
    //     required: true,
    // },
    song: { type: String, required: true },
    image: { type: String, required: true },
    genres: { type: String, required: true },
}, {
    versionKey: false,
});

const artist = mongoose.model("song", artistSchema);
module.exports = artist;