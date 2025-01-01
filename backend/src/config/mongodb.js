import mongoose from 'mongoose';

const DBNAME = "Spotify_clone";
const connectdb = async () => {
    try {
        const connectionInstance = await mongoose.connect (`${process.env.MONGODB_URI}/${DBNAME}`)
        console.log (`MongoDB connected: ${connectionInstance.connection.host}`)
        
    } catch (error) {
        console.log (`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectdb;