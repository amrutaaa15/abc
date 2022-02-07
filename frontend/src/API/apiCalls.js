import axios from 'axios'
import { mainUrl } from './mainUrl';

export const addUser = data => axios.post(`${mainUrl}/users/adduser`, data);
export const loginUser = data => axios.post(`${mainUrl}/users/loginuser`, data);
export const dash=()=>{
    return axios.get(`${mainUrl}/users/dash`,{
        headers:{"authorization":`Bearer ${localStorage.getItem('_token')}`}
    });
}
export const bookSlot = data => axios.post(`${mainUrl}/users/bookslot`, data);
export const locationBooking = data => axios.post(`${mainUrl}/users/locationslot`, data);
export const getSlots = () => axios.get(`${mainUrl}/users/getslots`);


