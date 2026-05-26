import axios from 'axios';

const crujiApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export default crujiApi;