import axios from "axios";

export const baseUrl = axios.create({
  baseURL:`http://upskilling-egypt.com:3002`
})