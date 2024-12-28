import { useRef, useState } from "react";
import { createContext } from "react";
import { songsData } from "../assets/frontend-assets/assets";

const PlayerContext = createContext();

const PlayerContextProvider = (props) =>{
    const audioRef = useRef();
    const seekbg = useRef();
    const seekbar = useRef();

    const [track , settrack] = useState(songsData[0])
    const [playstatus , setplaystatus] = useState(false)
    const [time , settime] = useState({
        currentTime:{
            second:0,
            minute:0
        },
        totalTime:{
            second:0,
            minute:0
        }
    })
    const play = () =>{
        audioRef.current.play();
        setplaystatus(true)
    }

    const pause = () => {
        audioRef.current.pause();
        setplaystatus(false)
    }

    const contextvalue= {
        audioRef,
        seekbar,
        seekbg,
        track, settrack,
        playstatus,setplaystatus,
        time,settime,
        play,
        pause
    }
    return(
        <PlayerContext.Provider value={contextvalue}> 
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider