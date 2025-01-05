import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_ENDPOINTS } from '../config/api.js'
import { toast } from 'react-toastify'

const Listsong = () => {
  const [songData, setsongData] = useState([])

  const fetchSongs = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.listsongs)
      if (response.data.success) {
        setsongData(response.data.data)
      }

    } catch (error) {
      toast.error("Error Occured")
    }
  }

  const removeSong = async (id) => {
    try {
      const response = await axios.post(API_ENDPOINTS.removesong, { id })
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchSongs()
      }
    } catch (error) {
      toast.error("Error Occured")
    }

  }

  useEffect(() => {
    fetchSongs()

  }, [])

  return (
    <div>
      <p>All Songs List</p>
      <br />
      <div>
        <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
          <p>Image</p>
          <p>Song</p>
          <p>ALbum</p>
          <p>Duration</p>
          <p>Action</p>
        </div>
        {songData.map((item, index) => {
          return (
            <div key={index} className='grid grid-cols-[1fr_1fr_1fr ] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
              <img className='w-12' src={item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.album}</p>
              <p>{item.duration}</p>
              <p onClick={() => { removeSong(item._id) }} className='cursor-pointer'>x</p>
            </div>

          )
        })}
      </div>



    </div>
  )
}

export default Listsong