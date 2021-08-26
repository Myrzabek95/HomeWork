import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ICitynfoProps } from "../model";

export class HourWeather extends Component<ICitynfoProps> {
  render() {
    return (
      <>
        <Link to="/">Назад</Link>
        {this.props.cityweather.received ? (
          <div className="container">
            <h1>
              Город:
              <span>{this.props.cityweather.city}</span>
            </h1>
            <hr />
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Описание</th>
                    <th>Температура</th>
                    <th>Ощущается как</th>
                    <th>Максимальная температура</th>
                    <th>Минимальная температура</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.cityweather.list.map((data, index) => (
                    <tr key={index}>
                      <th>
                        {new Intl.DateTimeFormat("ru", {
                          year: "numeric",
                          month: "long",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(data.datetime)}
                      </th>
                      <td>{data.description}</td>
                      <td>{data.temp} &deg;C</td>
                      <td>{data.feels_like} &deg;C</td>
                      <td>{data.temp_max} &deg;C</td>
                      <td>{data.temp_min} &deg;C</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : this.props.cityweather.error_text ? (
          <div className="error">
            Ошибка: {this.props.cityweather.error_text}
          </div>
        ) : (
          <div className="no-data">Нет данных</div>
        )}
      </>
    );
  }
}
