import { Apierrors } from "../utils/Apierror.js";
import { Apiresponse } from "../utils/Apiresponse.js";
import uploadOncloudinary from "../config/cloudinary.js";
import {Album} from '../models/album.model.js'
import { isValidObjectId } from "mongoose";

const addAlbum = async (req , res) => {
    const {name , desc , bgColor} = req.body
    if(!(name && desc && bgColor)){
        throw new Apierrors(400 , "All field are required  ")
    }
    if([name , desc , bgColor].some((field) => field.trim() === "")){
        throw new Apierrors(400 , "fields should not be empty")
    }
    
    const imagelocalpath = req.file?.path;

    if(!imagelocalpath){
        throw new Apierrors(404 , "Image local path not found")
    }
    const imageupload = await uploadOncloudinary(imagelocalpath);
    if(!imageupload){
        throw new Apierrors(400 , "Error while uploading image")
    }
    const album = await Album.create({
        name ,
        desc ,
        bgColor ,
        image : imageupload.secure_url,
    })

    if(!album){
        throw new Apierrors(400 , "Error while creating album")
    }

    return res.status(200).json(
        new Apiresponse(200 , album , "Album created successfully" )
    )
}


const allAlbums = async (req, res) => {
    const allalbums = await Album.find({})
    if(!allalbums){
        throw new Apierrors(400 , "Error while fetching albums")
    }
    return res.status(200).json(
        new Apiresponse(200 , allalbums , "All albums fetched")
    )
}


const removeAlbum = async (req , res) => {
    const { id } = req.body
    if(!isValidObjectId(id)){
        throw new Apierrors(400 , "Invalid album Id")
    }
    const albumremoved = await Album.findByIdAndDelete(id)
    if(!albumremoved){
        throw new Apierrors(400 , "Error while removing album")
    }
    return res.status(200).json(
        new Apiresponse(200 , {} , "Album removed successfully")
    )
}

export {addAlbum , allAlbums , removeAlbum}