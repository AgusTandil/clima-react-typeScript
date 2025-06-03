import axios from "axios";
import type { SearchType } from "../types";
export default function useWeather() {
  const fetchWeather = async(search : SearchType) => {
    const appId = import.meta.env.VITE_API_KEY;
    console.log('appID',appId)
    try {
        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`
        
        const {data} = await axios.get(geoUrl)
        console.log(data)
    } catch (error) {
        console.log(error)
    }
  };

  return {
    fetchWeather,   
  };
}
