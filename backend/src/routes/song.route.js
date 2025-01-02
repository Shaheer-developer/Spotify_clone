import {addSong , listSongs , removeSong} from '../controllers/song.controller.js'
import express from 'express'
import upload from '../middleware/multer.middleware.js';

const songRouter = express.Router();

songRouter.route('/add').post(upload.fields([{
    name:"image", maxCount:1
},
{
    name:"audio", maxCount:1
}
]), addSong)

songRouter.get('/list', listSongs)

songRouter.post('/remove', removeSong)

export {songRouter}