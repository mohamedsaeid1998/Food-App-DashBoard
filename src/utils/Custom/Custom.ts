import axios from "axios";

const baseUrl = axios.create({
  baseURL: `https://upskilling-egypt.com:3006`
})

export default baseUrl