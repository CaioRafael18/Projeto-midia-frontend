import axios from "axios";

const api = axios.create({
    baseURL: 'https://projeto-midia-backend-s7dm.vercel.app'
})

export default api