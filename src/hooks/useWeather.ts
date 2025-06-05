import axios from "axios";
import { z } from "zod";
//import { object, string, number, Output, parse } from "valibot";
import type { SearchType } from "../types";
import { useMemo, useState } from "react";

// ZOD ESQUEMA
const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  }),
});

export type Weather = z.infer<typeof Weather>;

// VALIBOT ESQUEMA

/* const WeatherSchema = object({
  name: string(),
  main: object({
    temp: number(),
    temp_max: number(),
    temp_min: number(),
  }),
});

type Weather = Output<typeof WeatherSchema>; */
const initialState = {
  name: "",
  main: {
    temp: 0,
    temp_max: 0,
    temp_min: 0,
  },
};

export default function useWeather() {
  const [weather, setWeather] = useState<Weather>(initialState);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchWeather = async (search: SearchType) => {
    const appId = import.meta.env.VITE_API_KEY;
    setLoading(true);
    setWeather(initialState);
    try {
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`;

      const { data } = await axios.get(geoUrl);

      //Comprobar si existe...

      if (!data[0]) {
        setNotFound(true);
        return;
      }

      const lat = data[0].lat;
      const lon = data[0].lon;

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;

      const { data: currentWeather } = await axios.get(weatherUrl);
      // Typar las respuestas de APIs con ZOD
      // Verifica que lo que recibimos como respuesta de la api, coincide con nuestro esquema y nos devuelve un boolean.
      const result = Weather.safeParse(currentWeather);

      /* if(result.success){
        console.log(result.data.name)
      } */
      // Typar las respuestas de APIs con Valibot
      /* const result = parse(WeatherSchema, currentWeather); */
      if (result.success) {
        setWeather(result.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const hasWeatherData = useMemo(() => weather.name, [weather]);

  return {
    weather,
    loading,
    fetchWeather,
    hasWeatherData,
    notFound
  };
}
