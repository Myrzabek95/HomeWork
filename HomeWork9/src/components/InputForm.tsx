import React, { Component, KeyboardEvent } from "react";
import { IInputFormProps } from "../model";

class InputForm extends Component<IInputFormProps> {
  gotCity = () => {
    this.props.onSearchCity();
  };

  checkKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") this.gotCity();
  };

  render() {
    return (
      <div className="form_center">
        <input
          className="input"
          name="cityInput"
          autoCapitalize="true"
          value={this.props.searchCity}
          onChange={this.props.onChange}
          onKeyPress={this.checkKey}
          placeholder="Введите название города"
        />
        <button className="btn btn-outline-info" onClick={this.gotCity}>
          Поиск
        </button>
      </div>
    );
  }
}

export { InputForm };
