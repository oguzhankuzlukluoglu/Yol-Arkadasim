const mongoose = require("moongose")
const { unique } = require("next/dist/build/utils")

const {Schema} = moongose

const postSchema = new Schema({
    ilan_tarihi: {
        type: Date,
        default: Date.now,
    },
    nereden: {
        type: String,
    },
    nereye: {
        type: String,
    },
    ulasim_tercihi: {
        type: String,
    },
    yolculuk_aciklamasi: {
        type: Text,
    }
})

const PostSchema = mongoose.model("post",postSchema)

module.exports = PostSchema