import axios from "axios";

export const API_URL = 'https://api.privatbank.ua'

export const http = axios.create({
    baseURL: API_URL,
    withCredentials: false,
});
