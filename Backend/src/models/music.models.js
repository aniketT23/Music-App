const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
    artist: { type: String, required: true },
    Number_songs: { type: Number, required: true },
    photo: { type: String, required: true },
}, {
    versionKey: false,
});

const List = mongoose.model("album", musicSchema);

module.exports = List;