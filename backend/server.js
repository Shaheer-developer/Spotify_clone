import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectdb from './src/config/mongodb.js';

//app config
const app = express();
const port = process.env.PORT || 4000;


//middlewares
app.use(express.json())
app.use(cors());

//initializing routes
import { songRouter } from './src/routes/song.route.js';

app.use('/api/v1/songs', songRouter)


connectdb()
.then(()=>{
    app.on("error", (err) =>{
        console.log(`Error in connection: ${err.message}`)
    })
    app.listen(port, ()=>{
        console.log(`server started on ${port}`)
    })
})
.catch((err)=>{
    console.log("Error:", err)
})
