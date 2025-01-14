import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true
    },
    album:{
        type:String,
    },
    file:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    }
},{timestamps:true})

export const Song = mongoose.models.Song || mongoose.model("Song" , songSchema)