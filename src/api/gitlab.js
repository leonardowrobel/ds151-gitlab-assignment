import axios from "axios";

const baseUrl = 'https://gitlab.com/'

const client = axios.create({
    baseURL: baseUrl
})

export default client