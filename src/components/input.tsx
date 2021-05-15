import React, { Component } from "react";

export interface State {
  location?: string;
  radius?: number;
  categories?: string;
  limit?: number;
  sort_by?: string;
  price?: string;
  open_now?: boolean;
}

class Input extends Component<State> {
  state = {
    location: "",
    radius: 1000, // measured in meters
    categories: "restaurants", // always include restaurant
    limit: 15,
    sort_by: "best_match",
    price: "1, 2",
    open_now: true, // keep static
  };

  categories = [""];

  render() {
    const { location, radius, categories, limit, sort_by, price, open_now } =
      this.state;

    return (
      <form>
        <label>Location: </label>
        <input title="Location" type="text"></input>
        <label>Search Radius: </label>
        <input title="Search Radius" type="range"></input>
        <label>Categories: </label>
        <input title="Categories" type="text"></input>
        <label>Sort By: </label>
        <input title="Sort By" type="text"></input>
        <label>Price Range: </label>
        <input title="Price Range" type="range"></input>
        <input type="submit"></input>
      </form>
    );
  }
}

export default Input;
