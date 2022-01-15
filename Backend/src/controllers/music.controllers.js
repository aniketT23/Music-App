const express = require("express");
const res = require("express/lib/response");
const mongoose = require("mongoose");

const router = express.Router();
const artist = require("../models/artist.model");
const List = require("../models/music.models");
const { populate } = require("../models/music.models");
const list = require("../models/music.models");
router.use(express.json());

router.post("/", async(req, res) => {
    const List = await list.create(req.body);
    return res.status(201).send({ List });
});
router.get("/", async(req, res) => {
    const List = await list.find().lean().exec();
    return res.status(200).send({ List });
});
router.get("/search", async(req, res) => {
    let x = req.query.artist;
    // console.log(x);
    const List = await list.find({ artist: x }).lean().exec();

    return res.status(200).send({ List });
});

router.get("/:id", async(req, res) => {
    const List = await list.findById(req.params.id).lean().exec();
    return res.status(200).send({ List });
});
router.patch("/:id", async(req, res) => {
    const List = await list
        .findByIdAndUpdate(req.params.id, req.body, { new: true })
        .lean()
        .exec();
    return res.status(200).send({ List });
});

router.delete("/:id", async(req, res) => {
    const List = await list.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send({ List });
});

module.exports = router;