import React, { useEffect, useRef } from "react";
import { Route, Routes, useLocation } from 'react-router-dom'
import DisplayHome from './DisplayHome'
import DisplayAlbum from './DisplayAlbum'
import { albumsData } from "../assets/frontend-assets/assets.js";
import { useContext } from "react";

const Display = () => {
    const { albumsData } = useContext('PlayerContext');



    const displayRef = useRef();
    const location = useLocation();
    const isalbum = location.pathname.includes("album")
    const albumid = isalbum ? location.pathname.split('/').pop() : "";
    const bgcolor = isalbum && albumsData.length > 0 ? albumsData.find((x) => (x._id === albumid)).bgColor : "#121212";

    useEffect(() => {
        if (isalbum) {
            displayRef.current.style.background = `linear-gradient(${bgcolor},#121212)`
        }
        else {
            displayRef.current.style.background = `#121212`
        }

    }, [location.pathname])

    return (
        <div ref={displayRef} className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
            {albumsData.length > 0
                ? <Routes>
                    <Route path='/' element={<DisplayHome />} />
                    <Route path='/album/:id' element={<DisplayAlbum album={albumsData.find((x) => (x._id === albumid))} />} />
                </Routes>
                : null
            }

        </div>
    )
}

export default Display