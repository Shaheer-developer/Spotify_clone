import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_ENDPOINTS } from '../config/api'
import { toast } from 'react-toastify'

const Listalbum = () => {
  const [data, setdata] = useState([])

  const fetchalbums = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.listalbum)
      console.log(response.data.data)
      if (response.data.success) {
        setdata(response.data.data)
      }
    } catch (error) {
      toast.error("Error Occurred")
    }
  }

  const removealbum = async (id) => {
    try {
      const response = await axios.post(API_ENDPOINTS.removealbum, {id})
      if (response.data.success) {
        toast.success("Album removed successfully")
        await fetchalbums();
      }
    }
    catch (error) {
      toast.error("Error Occurred")
    }
  }

  useEffect(() => {
    fetchalbums();
  }, [])

  return (
    <div>
      <p>All Albums List</p>
      <br />
      <div>
        <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album Colour</b>
          <b>Action</b>
        </div>
        {data.map((item, index) => {
          return (
            <div className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5' key={index}>
              <img className='w-12' src={item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.desc}</p>
              <input type="color" value={item.bgColor} />
              <p className='cursor-pointer' onClick={()=>{removealbum(item._id)}}>x</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Listalbum