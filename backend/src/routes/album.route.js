import express from 'express'
import { addAlbum, allAlbums, removeAlbum } from '../controllers/album.controller.js'
import upload from '../middleware/multer.middleware.js'

const albumRouter = express.Router()

albumRouter.route('/add').post(upload.single("image"), addAlbum)

albumRouter.route('/all').get(allAlbums)

albumRouter.route('/remove').post(removeAlbum)



export {albumRouter}