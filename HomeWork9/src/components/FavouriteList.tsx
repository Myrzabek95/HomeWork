import React, { Component } from "react";
import { IFavouriteListProps } from "../model";
import { Link } from "react-router-dom";

class FavouriteList extends Component<IFavouriteListProps> {
  render() {
    return (
      <div className="favourite_list">
        <div>Избранные города:</div>
        {this.props.cities.length > 0 ? (
          <div>
            {this.props.cities.map((city, index) => (
              <div key={index} onClick={this.props.onClick}>
                <Link to={`/cityweather/${city}`}>{city}</Link>
              </div>
            ))}
          </div>
        ) : (
          <div>Нет данных</div>
        )}
      </div>
    );
  }
}

export { FavouriteList };
