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
  cityweather: CityWeather;
}

interface IWeatherDataProps {
  weather: Weather;
  favourite: boolean;
  onToggleFavouriteCity: () => void;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

interface IFavouriteListProps {
  cities: Array<string>;
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
}

export interface IInputFormProps {
  searchCity: string;
  onChange: (event: FormEvent<HTMLInputElement>) => void;
  onSearchCity: () => void;
}

export interface HourWeatherInfo {
  datetime: Date;
  description: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
}

export interface CityWeather {
  city: string;
  received: boolean;
  list: HourWeatherInfo[];
  error_text: string;
}

export interface ICitynfoProps {
  cityweather: CityWeather;
}

export { Weather, IWeatherApp, IWeatherDataProps, IFavouriteListProps };
