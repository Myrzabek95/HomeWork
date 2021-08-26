import axios from "axios";
import { MouseEvent, FormEvent } from "react";

type Weather = {
  city: string;
  weather_description: string;
  temp: number;
  temp_feels_like: number;
  temp_min: number;
  temp_max: number;
  wind_speed: number;
  wind_deg: number;
  error: string;
  received: boolean;
};

interface IWeatherApp {
  searchCity: string;
  favourite: Array<string>;
  weather: Weather;
}

interface IWeatherDataProps {
  weather: Weather;
  favourite: boolean;
  onToggleFavouriteCity: () => void;
}

interface IFavouriteListProps {
  cities: Array<string>;
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
}

interface IInputFormProps {
  searchCity: string;
  onChange: (event: FormEvent<HTMLInputElement>) => void;
  onSearchCity: () => void;
}

async function openweathermap(city: string): Promise<JSON> {
  const response = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=39bbedf276925e4799df975e7d2d74e7&units=metric&lang=ru`
  );
  return response.data;
}

export {
  Weather,
  IWeatherApp,
  IWeatherDataProps,
  IFavouriteListProps,
  IInputFormProps,
  openweathermap,
};
