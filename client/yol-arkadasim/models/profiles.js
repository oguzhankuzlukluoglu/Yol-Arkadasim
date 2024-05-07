const mongoose = require("moongose")
const { unique } = require("next/dist/build/utils")

const {Schema} = moongose

const profilesSchema = new Schema({
    ilgi_alanlari:{
        type: Text,
    },
    hakkimda:{
        type: Text,
    },
    konum:{
        type: String,
    },
    seyahat_tercihleri: {
        type: String,
    },
})

const ProfilesSchema = mongoose.model("profiles",profilesSchema)

module.exports = ProfilesSchema