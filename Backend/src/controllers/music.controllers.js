const express = require("express");
const res = require("express/lib/response");
const mongoose = require("mongoose");

const router = express.Router();
const artist = require("../models/artist.model");
const List = require("../models/music.models");
const { populate, off } = require("../models/music.models");
const list = require("../models/music.models");
router.use(express.json());

router.post("/", async(req, res) => {
    const List = await list.create(req.body);
    return res.status(201).send({ List });
});
router.get("/", async(req, res) => {
    const page = +req.query.page || 1;
    const size = +req.query.size || 8;

    const offset = (page - 1) * size;

    const List = await list.find().skip(offset).limit(size).lean().exec();
    const totalCount = await list.find().countDocuments().lean().exec();
    const totalPages = Math.ceil(totalCount / size);
    return res.status(200).send({ List, totalPages });
});
router.get("/search", async(req, res) => {
    let x = req.query.artist;
    // console.log(x);
    const List = await list.find({ artist: x }).lean().exec();

    return res.status(200).send({ List });
});

router.get("/filter", async(req, res) => {
    let x = req.query.gener;
    let y = req.query.year;
    const page = +req.query.page || 1;
    const size = +req.query.size || 10;
    console.log(size);
    // console.log(x);
    const offset = (page - 1) * size;

    if (x && !y) {
        const List = await list
            .find({ gener: x })
            .skip(offset)
            .limit(size)
            .lean()
            .exec();
        const totalCount = await list
            .find({ gener: x })
            .countDocuments()
            .lean()
            .exec();

        const totalPages = Math.ceil(totalCount / size);
        return res.status(200).send({ List, totalPages });
    }
    if (y && !x) {
        const List = await list
            .find({ year: y })
            .skip(offset)
            .limit(size)
            .lean()
            .exec();

        const totalCount = await list
            .find({ year: y })
            .countDocuments()
            .lean()
            .exec();
        // console.log(totalCount);
        const totalPages = Math.ceil(totalCount / size);
        // console.log(totalPages);
        return res.status(200).send({ List, totalPages });
    }
    const List = await list
        .find({ $and: [{ gener: x }, { year: y }] })
        .skip(offset)
        .limit(size)
        .lean()
        .exec();

    const totalCount = await list
        .find({ $and: [{ gener: x }, { year: y }] })
        .countDocuments()
        .lean()
        .exec();
    const totalPages = Math.ceil(totalCount / size);
    return res.status(200).send({ List, totalPages });
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