import React, { Component } from "react";
import { Link } from "react-router-dom";
import { IWeatherDataProps } from "../model";

class WeatherData extends Component<IWeatherDataProps> {
  render() {
    return (
      <>
        {this.props.weather.received ? (
          <div className="display">
            <p>
              <strong>Информация о погоде в городе:</strong>{" "}
              <span>{this.props.weather.city}</span>
            </p>
            <p>
              <strong>Описание:</strong>{" "}
              <span>{this.props.weather.weather_description}</span>
            </p>
            <p>
              <strong>Температура:</strong>{" "}
              <span>{this.props.weather.temp} &deg;C</span>
            </p>
            <p>
              <strong>Ощущается как:</strong>{" "}
              <span>{this.props.weather.temp_feels_like} &deg;C</span>
            </p>
            <p>
              <strong>Максимальная температура:</strong>{" "}
              <span>{this.props.weather.temp_max} &deg;C</span>
            </p>
            <p>
              <strong>Минимальная температура:</strong>{" "}
              <span>{this.props.weather.temp_min} &deg;C</span>
            </p>
            <p>
              <strong>Скорость ветра:</strong>{" "}
              <span>{this.props.weather.wind_speed}</span>
            </p>
            <p>
              <strong>Угол ветра:</strong>{" "}
              <span>{this.props.weather.wind_deg} &deg;</span>
            </p>
            <p>
              <strong>В избранное:</strong>{" "}
              <input
                className="form-check-input"
                type="checkbox"
                checked={this.props.favourite}
                onChange={this.props.onToggleFavouriteCity}
              />
            </p>
            <Link to={`/cityweather/${this.props.weather.city}`}>
              <button
                className="btn btn-outline-info"
                onClick={this.props.onClick}
              >
                Подробнее
              </button>
            </Link>
          </div>
        ) : this.props.weather.error ? (
          <p className="error">Ошибка: {this.props.weather.error}</p>
        ) : (
          <p className="warning">
            <span>Нет данных</span>
          </p>
        )}
      </>
    );
  }
}

export { WeatherData };
