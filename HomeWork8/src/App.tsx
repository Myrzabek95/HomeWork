import React, { Component, FormEvent, MouseEvent } from "react";

import { FavouriteList } from "./components/FavouriteList";
import { InputForm } from "./components/InputForm";
import { WeatherData } from "./components/WeatherData";
import { IWeatherApp, openweathermap } from "./model";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

const STORAGE = "";

class App extends Component<{}, IWeatherApp> {
  state = {
    searchCity: "",
    favourite: new Array<string>(),
    weather: {
      city: "",
      weather_description: "",
      temp: 0,
      temp_feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      wind_speed: 0,
      wind_deg: 0,
      error: "",
      received: false,
    },
  };

  searchCityClick = (): void => {
    this.loadWeather(this.state.searchCity);
  };

  inputCity = (event: FormEvent<HTMLInputElement>): void => {
    const searchCity = event.currentTarget.value.toUpperCase();

    this.setState({ searchCity });
  };

  favouriteClick = (event: MouseEvent<HTMLDivElement>): void => {
    const searchCity = event.currentTarget.innerText;

    this.setState({ searchCity });

    this.loadWeather(searchCity);
  };

  isFavourite = (city: string): boolean => {
    return this.state.favourite.indexOf(city) >= 0;
  };

  toggleFavourite = (): void => {
    const id = this.state.favourite.indexOf(
      this.state.searchCity.toUpperCase()
    );

    if (id >= 0) {
      const len = this.state.favourite.length;

      const newFavourites = [
        ...this.state.favourite.slice(0, id),
        ...this.state.favourite.slice(id + 1, len),
      ];

      this.setState({
        favourite: newFavourites,
      });

      localStorage.setItem(STORAGE, JSON.stringify(newFavourites));
    } else {
      const newCity = this.state.searchCity.toUpperCase();

      const newFavourites = [...this.state.favourite, newCity];

      this.setState({
        favourite: newFavourites,
      });

      localStorage.setItem(STORAGE, JSON.stringify(newFavourites));
    }
  };

  loadWeather = (city: string): void => {
    openweathermap(city)
      .then((data) => {
        if (data.cod === 200) {
          this.setState({
            weather: {
              city,
              weather_description: data.weather[0].description,
              temp: data.main.temp,
              temp_feels_like: data.main.feels_like,
              temp_min: data.main.temp_max,
              temp_max: data.main.temp_min,
              wind_speed: data.wind.speed,
              wind_deg: data.wind.deg,
              error: "",
              received: true,
            },
          });
        } else {
          this.setState({
            weather: {
              ...this.state.weather,
              received: false,
              error: data.message,
            },
          });
        }
      })
      .catch((error) => {
        this.setState({
          weather: {
            ...this.state.weather,
            received: false,
            error_text: error,
          },
        });
      });
  };

  componentDidMount() {
    const favourites = localStorage.getItem(STORAGE);

    this.setState({
      favourite: favourites ? JSON.parse(favourites) : [],
    });
  }

  render() {
    return (
      <div className="app-wrapper top20">
        <div className="container">
          <div className="row">
            <div className="col-4">
              <FavouriteList
                cities={this.state.favourite}
                onClick={this.favouriteClick}
              />
            </div>
            <div className="col-8">
              <InputForm
                searchCity={this.state.searchCity}
                onSearchCity={this.searchCityClick}
                onChange={this.inputCity}
              />
              <div className="top20">
                <WeatherData
                  weather={this.state.weather}
                  onToggleFavouriteCity={this.toggleFavourite}
                  favourite={this.isFavourite(this.state.searchCity)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { App, STORAGE };
