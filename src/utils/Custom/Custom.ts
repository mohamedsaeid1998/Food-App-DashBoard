import axios from "axios";

  const baseUrl = axios.create({
  baseURL:`http://upskilling-egypt.com:3002`
})

export default baseUrl