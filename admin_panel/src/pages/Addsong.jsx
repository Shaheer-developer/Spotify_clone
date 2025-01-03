import React, { useState } from 'react'
import { assets } from '../assets/admin-assets/assets'

const Addsong = () => {
  const [image, setimage] = useState(false)
  const [song, setsong] = useState(false)
  const [name, setname] = useState(false)
  const [desc, setdesc] = useState(false)
  const [album, setalbum] = useState(false)
  const [loading, setloading] = useState(false)
  const [albumData, setalbumData] = useState(false)

  return (
    <form className='flex flex-col items-start gap-8 text-gray-600'>
      <div className='flex gap-8'>
        <div className='flex flex-col gap-4'>
          <p>Upload song</p>
          <input type="file" id='song' accept='audio/*' hidden />
          <label for="song">
            <img src={assets.upload_song} className='w-24 cursor-pointer' alt="" />
          </label>
        </div>
        <div className='flex flex-col gap-4'>
          <p>Upload Image</p>
          <input type="file" id='image' accept='image/*' hidden />
          <label for="image">
            <img className='w-24 cursor-pointer' src={assets.upload_area} alt="" />
          </label>

        </div>
      </div>
      <div className='flex flex-col gap-2.5'>
        <p>Song name</p>
        <input className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' placeholder='Type here' type="text" required />
      </div>
      <div className='flex flex-col gap-2.5'>
        <p>Song Description</p>
        <input className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' placeholder='Type here' type="text" required />
      </div>
      <div className='flex flex-col gap-2.5'>
        <p>Album</p>
        <select className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[150px]'>
          <option value="none">None</option>
        </select>
      </div>

      <button type='submit' className='text-base bg-black text-white py-2.5 px-14 cursor-pointer'>ADD</button>
    </form>
  )
}

export default Addsong