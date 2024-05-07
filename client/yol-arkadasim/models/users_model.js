const mongoose = require("moongose")
const { unique } = require("next/dist/build/utils")

const {Schema} = moongose

const userSchema = new Schema({
    isim:{
        type: String,
        require: true,
    },
    soyisim:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true, //zorunlu
        unique: true, // benzersiz
    },
    dogum_tarihi:{
        type: Date,
        require: true,
    },
    kayit_tarihi:{
        type: Date,
        default: Date.now,

    },
    kullanici_adi:{
        type: String,
        require: true,
        unique: true,
    },
    sifre:{
        type: String,
        require: true,
    },
    telefon:{
        type: String,
        require: true,
        unique: true,
    }

})

const UsersSchema = mongoose.model("users",userSchema)

module.exports = UsersSchema