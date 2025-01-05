import { useEffect, useRef, useState } from "react";
import { createContext } from "react";
import {API_ENDPOINTS_FRONTEND} from '../config/api.js'
import axios from 'axios'

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekbg = useRef();
    const seekbar = useRef();

    const [songsData , setsongsData] = useState([])
    const [albumsData , setalbumsData] = useState([])

    const [track, settrack] = useState(songsData[0])
    const [playstatus, setplaystatus] = useState(false)
    const [time, settime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    })
    const play = () => {
        audioRef.current.play();
        setplaystatus(true)
    }

    const pause = () => {
        audioRef.current.pause();
        setplaystatus(false)
    }

    const playwithid = async(id)=>{
       await songsData.map((item)=>{
        if(id === item._id){
            settrack(item);
        }
       })
       await audioRef.current.play();
       setplaystatus(true);
    }

    const previous = async() =>{
    songsData.map(async(item , index)=>{
        if(track._id === item._id && index>0){
            await settrack(songsData[index-1]);
            await audioRef.current.play();
            setplaystatus(true)
        }
    })
    }
    const next = async() =>{
        songsData.map(async(item , index)=>{
            if(track._id === item._id && index<songsData.length){
                await settrack(songsData[index+1]);
                await audioRef.current.play();
                setplaystatus(true)
            }
        })
    }

    const seeksong = async (e) =>{
        audioRef.current.currentTime = ((e.nativeEvent.offsetX/seekbg.current.offsetWidth)*audioRef.current.duration) 
    }

    const getSongData = async () => {
        try {
            const response = await axios.get(API_ENDPOINTS_FRONTEND.listsongs)
            setsongsData(response.data.data)
            settrack(response.data.data[0])
        } catch (error) {
            
        }
    }

    const getAlbumsData = async () => {
        try {
            const response = await axios.get(API_ENDPOINTS_FRONTEND.listalbum)
            setalbumsData(response.data.data)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        setTimeout(() => {
            audioRef.current.ontimeupdate = () => {
                if(!audioRef.current.duration || isNaN(audioRef.current.duration)){
                    return ;
                }
                seekbar.current.style.width = (Math.floor(audioRef.current.currentTime/audioRef.current.duration*100))+"%";
                settime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime%60).toString().padStart(2, "0"),
                        minute:  Math.floor(audioRef.current.currentTime/60)
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration%60),
                        minute:  Math.floor(audioRef.current.duration/60),
                }
            })
            }
        
        }, 1000)
    }, [audioRef])

    useEffect(()=>{
        getSongData();
        getAlbumsData();
    },[])
    const contextvalue = {
        audioRef,
        seekbar,
        seekbg,
        track, settrack,
        playstatus, setplaystatus,
        time, settime,
        play,
        pause,
        playwithid, 
        next ,
        previous,
        seeksong,
        songsData,
        albumsData
    }
    return (
        <PlayerContext.Provider value={contextvalue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider