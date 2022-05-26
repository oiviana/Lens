import axios from 'axios';
import {REACT_APP_BASE_URL} from "@env"

const api = axios.create({baseURL: `${process.env.REACT_APP_BASE_URL}`})

export default api;