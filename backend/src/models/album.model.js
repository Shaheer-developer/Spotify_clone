import mongoose, { mongo } from "mongoose";

const albumSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    bgColor:{
        type:String,
        required:true
    },
},{timestamps:true})

export const Album = mongoose.models.Album || mongoose.model("Album" , albumSchema)