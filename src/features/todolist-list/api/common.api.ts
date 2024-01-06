import axios from "axios";

export const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '88c70fdf-4e66-4d91-860b-59030fc7971d',
    }
}
export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})