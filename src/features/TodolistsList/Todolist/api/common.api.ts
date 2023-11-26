import axios from "axios";

export const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'd97e2ed5-672f-4df7-ab8f-20c419d5b616'
    }
}
export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})