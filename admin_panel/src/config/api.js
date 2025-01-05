

const Api_url = import.meta.env.API_URL || 'http://localhost:4000'

export const API_ENDPOINTS = {
    addsong:`${Api_url}/api/v1/songs/add`,
    listsongs:`${Api_url}/api/v1/songs/list`,
    removesong:`${Api_url}/api/v1/songs/remove`,
    addalbum:`${Api_url}/api/v1/album/add`,
    listalbum:`${Api_url}/api/v1/album/all`,
    removealbum:`${Api_url}/api/v1/album/remove`,
}