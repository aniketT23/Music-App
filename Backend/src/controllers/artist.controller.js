const express = require("express");
const res = require("express/lib/response");
const mongoose = require("mongoose");
const router = express.Router();
const artist = require("../models/artist.model");
const list = require("../models/music.models");
router.use(express.json());

router.post("/", async(req, res) => {
    const Songs = await artist.create(req.body);
    return res.status(201).send({ Songs });
});

router.get("/", async(req, res) => {
    const songs = await artist.find().populate("artist_name").lean().exec();
    return res.status(200).send({ songs });
});

router.get("/:id", async(req, res) => {
    const songs = await artist
        .findById(req.params.id)
        .populate("artist_name")
        .lean()
        .exec();
    return res.status(200).send({ songs });
});



module.exports = router;