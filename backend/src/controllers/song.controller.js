import { Apiresponse } from '../utils/Apiresponse.js'
import { Apierrors } from '../utils/Apierror.js'
import uploadOncloudinary from '../config/cloudinary.js'
import { Song } from '../models/song.model.js'


const addSong = async (req, res) => {
    try {
        const { name, desc, album } = req.body

        if (!(name && desc && album)) {
            throw new Apierrors(400, "All fields are required")
        }

        if ([name, desc, album].some((field) => field?.trim() === "")) {
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
            duration: `${Math.floor(uploadAudio.duration/60)}:${Math.floor(uploadAudio.duration%60)}`,
        })

        const createdSong = await Song.findById(song._id)

        if (!createdSong) {
            throw new Apierrors(400, "Error while uploading song")
        }

        return res.status(200).json(
            new Apiresponse(200, createdSong, "Song uploaded successfully")
        )
    }
    catch (error) {
        console.log(error)
        return error;
    }

}

const listSongs = async (req, res) => {

}

export { addSong, listSongs }