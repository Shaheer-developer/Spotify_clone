
const Api_url = import.meta.env.API_URL;

export const API_ENDPOINTS = {
    addsong:`${Api_url}/api/v1/songs/add`,
    listsong:`${Api_url}/api/v1/songs/list`,
    removesong:`${Api_url}/api/v1/songs/remove`,
    addalbum:`${Api_url}/api/v1/album/add`,
    removealbum:`${Api_url}/api/v1/album/remove`,
}