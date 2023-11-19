import { useQuery } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios"

interface IAuthenticatedQuery {
  queryKey:string[],
  url:string,
  data?: any;
  config?: AxiosRequestConfig
}

const UseAuthenticatedQuery = ({queryKey,url,data,config}:IAuthenticatedQuery) => {

return useQuery({
queryKey,
queryFn:async ()=>{
  const res = await axios.post(url,data,config)
  return res
}
})
}

export default UseAuthenticatedQuery