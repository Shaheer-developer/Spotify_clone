import { useEffect, useRef, useState } from "react";
import { createContext } from "react";
import { songsData } from "../assets/frontend-assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekbg = useRef();
    const seekbar = useRef();

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
        await settrack(songsData[id]);
        await  audioRef.current.play();
        setplaystatus(true)
    }

    const previous = async() =>{
        if(track.id>0) {
            await settrack(songsData[track.id-1])
           await  audioRef.current.play()
           setplaystatus(true)
        }
    }
    const next = async() =>{
        if(track.id < songsData.length-1) {
            await settrack(songsData[track.id+1])
           await  audioRef.current.play()
           setplaystatus(true)
        }
    }

    const seeksong = async (e) =>{
        audioRef.current.currentTime = ((e.nativeEvent.offsetX/seekbg.current.offsetWidth)*audioRef.current.duration) 
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
        seeksong
    }
    return (
        <PlayerContext.Provider value={contextvalue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider