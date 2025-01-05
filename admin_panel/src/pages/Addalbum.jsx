import React, { useState } from 'react'
import { assets } from '../assets/admin-assets/assets'
import axios from 'axios'
import { API_ENDPOINTS } from '../config/api'
import { toast } from 'react-toastify'

const Addalbum = () => {
  const [image, setimage] = useState(false)
  const [color, setcolor] = useState('#ffffff')
  const [name, setname] = useState("")
  const [description, setdescription] = useState("")
  const [loading, setloading] = useState(false)

  const onSubmitHandler = async(e)=>{
    e.preventDefault();
    setloading(true)
  try {
      const formdata = new FormData;
      formdata.append('image', image)
      formdata.append('bgColor', color)
      formdata.append('name' , name)
      formdata.append('desc' , description)
  
      const response = await axios.post(API_ENDPOINTS.addalbum , formdata)
      if(response.data.success){
        toast.success("Album added successfully")
        setname("")
        setdescription("")
        setcolor("#ffffff")
        setimage(false)
      }
      else(
        toast.error("Something went wrong")
      )
  } catch (error) {
    toast.error("Occur Occurred")
  }
  setloading(false)
  }


  return loading ? (<div className='grid place-items-center min-h-[80vh]'>
    <div className='w-16 h-16 place-self-center border-4 border-gray-400 border-t-gray-800 rounded-full animate-spin'>
    </div>
  </div>) : (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-start gap-8 text-gray-600'>

      <div className='flex flex-col gap-4'>
        <p>Upload Image</p>
        <input onChange={(e) => setimage(e.target.files[0])} type="file" name="" id="image" accept='image/*' hidden />
        <label htmlFor="image">
          <img className='w-24 cursor-pointer' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
        </label>
      </div>

      <div className='flex flex-col gap-2.5'>
        <p>ALbum name</p>
        <input onChange={(e) => setname(e.target.value)} value={name} className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)] ' type="text" placeholder='Type here' />
      </div>

      <div className='flex flex-col gap-2.5'>
        <p>ALbum Description</p>
        <input onChange={(e) => setdescription(e.target.value)} value={description} className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)] ' type="text" placeholder='Type here' />
      </div>

      <div className='flex flex-col gap-3'>
        <p>Backeground Color</p>
        <input onChange={(e) => setcolor(e.target.value)} value={color} type="color" />
      </div>

      <button type='submit' className='bg-black text-base text-white py-2.5 px-14 cursor-pointer'>ADD</button>

    </form>
  )
}

export default Addalbum