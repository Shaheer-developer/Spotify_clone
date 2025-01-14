import React, { useEffect, useState } from 'react'
import { assets } from '../assets/admin-assets/assets'
import axios from 'axios'
import { API_ENDPOINTS } from '../config/api'
import { toast } from 'react-toastify'

const Addsong = () => {
  const [image, setimage] = useState(false)
  const [song, setsong] = useState(false)
  const [name, setname] = useState("")
  const [desc, setdesc] = useState("")
  const [album, setalbum] = useState(false)
  const [loading, setloading] = useState(false)
  const [albumData, setalbumData] = useState([])

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setloading(true)
    try {
      const formData = new FormData();

      formData.append('name', name)
      formData.append("desc" , desc)
      formData.append('image' , image)
      formData.append("audio" , song)
      formData.append('album' , album)

      const response = await axios.post(API_ENDPOINTS.addsong , formData)
      console.log(response)

      if(response.data.success){
        toast.success("Song added")
        setname("")
        setdesc("")
        setalbum("none")
        setimage(false)
        setsong(false)
      }
    else{
      toast.error("Something went wrong")
    }
    } catch (error) {
     toast.error("Error occured") 
    }
setloading(false)
  }

const loadAlbumData = async() => {
  try {
    const response = await axios.get(API_ENDPOINTS.listalbum)
    if(response.data.success){
      setalbumData(response.data.data)
    }
    else{
      toast.error("Enable to load Album data")
    }
  } catch (error) {
    toast.error("Error Occurred")
  }
}

useEffect(()=>{
  loadAlbumData()
},[])


  return loading ? (
    <div className='grid place-items-center min-h-[80vh]'>
      <div className='w-16 h-16 place-self-center border-4 border-gray-400 border-t-gray-800 rounded-full animate-spin'>
      </div>
    </div>
  ): (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-start gap-8 text-gray-600'>
      <div className='flex gap-8'>
        <div className='flex flex-col gap-4'>
          <p>Upload song</p>
          <input onChange={(e)=>setsong(e.target.files[0])} type="file" id='song' accept='audio/*' hidden />
          <label for="song">
            <img src={song?assets.upload_added : assets.upload_song} className='w-24 cursor-pointer' alt="" />
          </label>
        </div>
        <div className='flex flex-col gap-4'>
          <p>Upload Image</p>
          <input onChange={(e) => setimage(e.target.files[0])} type="file" id='image' accept='image/*' hidden />
          <label for="image">
            <img className='w-24 cursor-pointer' src={image?URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>

        </div>
      </div>
      <div className='flex flex-col gap-2.5'>
        <p>Song name</p>
        <input onChange={(e) => setname(e.target.value)} value={name} className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' placeholder='Type here' type="text" required />
      </div>
      <div className='flex flex-col gap-2.5'>
        <p>Song Description</p>
        <input onChange={(e) => setdesc(e.target.value)} value={desc} className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' placeholder='Type here' type="text" required />
      </div>
      <div className='flex flex-col gap-2.5'>
        <p>Album</p>
        <select onChange={(e) => setalbum(e.target.value)} defaultValue={album} className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[150px]'>
       <option value="none">none</option>
          {albumData.map((item , index)=>(<option key={index} value={item.name}>{item.name}</option>))}
        </select>
      </div>

      <button type='submit' className='text-base bg-black text-white py-2.5 px-14 cursor-pointer'>ADD</button>
    </form>
  )
}

export default Addsong