import { Apiresponse } from '../utils/Apiresponse.js'
import { Apierrors } from '../utils/Apierror.js'
import uploadOncloudinary from '../config/cloudinary.js'
import { Song } from '../models/song.model.js'
import { isValidObjectId } from 'mongoose'


const addSong = async (req, res) => {
    try {
        const { name, desc, album } = req.body

        if (!(name && desc)) {
            throw new Apierrors(400, "All fields are required")
        }

        if ([name, desc].some((field) => field?.trim() === "")) {
            throw new Apierrors(400, "No field should be empty")
        }

        const audiolocalpath = req.files?.audio[0].path;
        const imagelocalpath = req.files?.image[0].path;

        if (!audiolocalpath || !imagelocalpath) {
            throw new Apierrors(400, "Both audio and image files are required")
        }

        const uploadAudio = await uploadOncloudinary(audiolocalpath)

        if (!uploadAudio) {
            throw new Apierrors(400, "Audio upload failed")
        }

        const uploadImage = await uploadOncloudinary(imagelocalpath)

        if (!uploadImage) {
            throw new Apierrors(400, "Image upload failed")
        }


        const song = await Song.create({
            name,
            desc,
            album,
            file: uploadAudio.secure_url,
            image: uploadImage.secure_url,
            duration: `${Math.floor(uploadAudio.duration / 60)}:${Math.floor(uploadAudio.duration % 60).toString().padStart(2, '0')}`,
        })

        if (!song) {
            throw new Apierrors(400, "Error while uploading song")
        }

        return res.status(200).json(
            new Apiresponse(200, song, "Song uploaded successfully")
        )
    }
    catch (error) {
        console.log(error)
        throw new Apierrors(500, "Song upload failed")
    }
}

const listSongs = async (req, res) => {
    try {
        const allsongs = await Song.find({})
        console.log(allsongs)
        if (!allsongs) {
            throw new Apierrors(404, "Error while fetching songs")
        }
        return res.status(200).json(
            new Apiresponse(200, allsongs, "All songs fetched successfully")
        )
    } catch (error) {
        throw new Apierrors(500, "Server error")
    }
}

const removeSong = async (req, res) => {
    try {
        const { id } = req.body
        if (!isValidObjectId(id)) {
            throw new Apierrors(400, "Song Id is not valid")
        }
        const songremoved = await Song.findByIdAndDelete(id)
        if (!songremoved) {
            throw new Apierrors(400, "Error while removing song")
        }
        return res.status(200).json(
            new Apiresponse(200, {}, "Song removed successfully")
        )
    }
    catch (error) {
        throw new Apierrors(500, "Server error")
    }
}
export { addSong, listSongs, removeSong }