import React from 'react'
import { assets } from '../assets/admin-assets/assets.js'

const Sidebar = () => {
  return (
    <div className='bg-[#003A10] min-h-screen pl-[4vw] '>
        <img src={assets.logo} className='mt-5 w-[max(10vw, 100px)] hidden sm:block' alt=""/> 
        <img src={assets.logo_small} className='mt-5 w-[max(5vw,40px) mr-5 sm:hidden block' alt=""/>

        <div className='flex flex-col gap-5 mt-10'>

            <div className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF58] text-sm font-medium cursor-pointer'>
                <img src={assets.add_song} className='w-5' alt=""/>
                <p className='hidden sm:block'>Add Song</p>
            </div>

            <div className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF58] text-sm font-medium cursor-pointer'>
                <img src={assets.song_icon} className='w-5' alt=""/>
                <p className='hidden sm:block'>List Songs</p>
            </div>

            <div className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF58] text-sm font-medium cursor-pointer'>
                <img src={assets.add_album} className='w-5' alt=""/>
                <p className='hidden sm:block'>Add Album</p>
            </div>

            <div className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF58] text-sm font-medium cursor-pointer'>
                <img src={assets.album_icon} className='w-5' alt=""/>
                <p className='hidden sm:block'>List Albums</p>
            </div>

        </div>




    </div>
  )
}

export default Sidebar