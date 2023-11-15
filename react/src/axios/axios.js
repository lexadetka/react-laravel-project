import axios from "axios";

const $axios = axios.create({
  baseURL: 'http://localhost:8000'
})

$axios.interceptors.request.use((config)=>{

  const token = localStorage.getItem('ACCESS_TOKEN')
  config.headers.Authorization = `Bearer ${token}`
  return config;

})

$axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  try {
    const {response} = error
    if (response && response.status === 401){
      localStorage.removeItem('ACCESS_TOKEN')
    }
  } catch (e) {
    console.error(e)
  }
  throw error

})

export default $axios
