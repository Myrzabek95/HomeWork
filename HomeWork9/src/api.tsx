import axios, { AxiosResponse } from "axios";

export async function openweathermap(city: string): Promise<any> {
  const response = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=39bbedf276925e4799df975e7d2d74e7&units=metric&lang=ru`
  );
  return response.data;
}
export async function openweathermapHour(city: string): Promise<any> {
  const response = await axios.get(
    `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=39bbedf276925e4799df975e7d2d74e7&units=metric&lang=ru`
  );
  return response.data;
}
