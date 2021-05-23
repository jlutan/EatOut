import React, { Component } from "react";
import InputForm from "./components/inputform";
import {
  InputChangeEvent,
  SliderChangeEvent,
  RangeSliderChangeEvent,
  NumericTextBoxChangeEvent,
  RadioGroupChangeEvent,
} from "@progress/kendo-react-inputs";
import { MultiSelectChangeEvent } from "@progress/kendo-react-dropdowns";
import { getSorts, getCategories } from "./lib";

import "./App.css";

// WARNING: bad practice
const YELP_API_TOKEN: String =
  "5cSbPPrTn0Gr0446_jXm8UakTo0XTmr7xheg_VMBJ143tkLylG9Uri800onLWiHv9BZHRlwKSjgv2rzv4mTIsX4I2d5qXBLBQYp7Ado-cwj-VbqBx5keAQwEJLWhYHYx";

export interface Range {
  start: number;
  end: number;
}

interface AppState {
  status: number; // 0 - no data ready, 1 - request in progress, 2 - request done and ready
  query: {
    [key: string]: any; // set index signatures to strings
    location: string;
    radius: number;
    categories: Array<Object>;
    limit: number;
    sort_by: string;
    price: Range;
    open_at?: number;
    open_now?: boolean;
  };
  result: Object;
}

class App extends Component<AppState> {
  state: AppState = {
    status: 0,
    query: {
      location: "",
      radius: 5, // measured in kilometers
      categories: [], // always include restaurant
      limit: 20, // # of results to display
      sort_by: "best_match",
      price: { start: 1, end: 2 }, // price range (1-cheap, 4-expensive)
      // open_now: true
    },
    result: {},
  };

  // defines a GET request to the Yelp API
  getRestaurants = async (url: RequestInfo): Promise<JSON> => {
    // calling the fetch API
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        Authorization: `Bearer ${YELP_API_TOKEN}`,
      },
    });
    return response.json();
  };

  /* Event Handlers */

  // Sends a request to the Yelp API and saves the result to the state
  handleSubmit = async (
    data: any,
    event: React.SyntheticEvent<any> | undefined
  ): Promise<void> => {
    if (typeof event !== "undefined") event.preventDefault();

    const query = { ...this.state.query };

    let queryString = "";
    for (const param in query) {
      let paramString = param.toString() + "=";
      if (query && param === "price") {
        const el: Array<Number> = [];
        if (query.price) {
          for (let i = query.price.start; i <= query.price.end; i++) {
            el.push(i);
          }
        }
        paramString += el.join(",");
      } else if (param === "radius") {
        if (query.radius) paramString += Math.round(query.radius * 1000);
      } else if (param === "categories") {
        // TODO
      } else if (typeof query[param] === "string") {
        const tokens = query[param].split(" ");
        if (tokens.length > 1) {
          paramString += '"' + tokens.join(" ") + '"';
        } else {
          paramString += query[param];
        }
      } else {
        paramString += query[param];
      }
      queryString += paramString + "&";
    }

    // send request to proxy server
    this.getRestaurants(
      `https://cors-anywhere.herokuapp.com/api.yelp.com/v3/businesses/search?${queryString}`
    )
      .then(
        (value) => {
          this.setState({ status: 2, result: value });
        },
        (reason) => {
          console.log(reason);
          this.setState({ status: 0 });
        }
      )
      .catch((reason) => {
        console.log(reason);
        this.setState({ status: 0 });
      });
    // if (this.xhttp.withCredentials) {
    //   // initialize the request
    //   this.xhttp.open(
    //     "GET",
    //     `https://api.yelp.com/v3/businesses/search?${queryString}`
    //   );
    //   // set authorization token in the request header
    //   this.xhttp.setRequestHeader("Authorization", `Bearer ${YELP_API_TOKEN}`);
    //   this.xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");

    //   // send the request to the internet
    //   // after firing, the onreadystatechange listener will process the data once the request is done
    //   this.xhttp.send();
    // }
  };

  // update text inputs
  onTextChange = (e: InputChangeEvent): void => {
    const query = { ...this.state.query };
    if (e.target.name) query[e.target.name] = e.value;
    this.setState({ query });
  };

  // update radio button group
  onSortChange = (e: RadioGroupChangeEvent): void => {
    const query = { ...this.state.query };
    query.sort_by = e.value;
    this.setState({ query });
  };

  // update numeric inputs
  onNumberChange = (e: NumericTextBoxChangeEvent): void => {
    const query = { ...this.state.query };
    if (e.target.name) query[e.target.name] = e.value;
    this.setState({ query });
  };

  // update categories
  onMultiSelectChange = (e: MultiSelectChangeEvent): void => {
    const query = { ...this.state.query };
    if (e.target.name) query[e.target.name] = e.value;
    this.setState({ query });
  };

  // update slider input
  onSliderChange = (e: SliderChangeEvent): void => {
    const query = { ...this.state.query };
    if (e.target.props.name) query[e.target.props.name] = e.value;
    this.setState({ query });
  };

  // update range slider input
  onRangeChange = (e: RangeSliderChangeEvent): void => {
    const query = { ...this.state.query };
    if (e.target.props.name) {
      if (e.target.props.name === "price")
        query[e.target.props.name] = {
          start: Math.round(e.value.start),
          end: Math.round(e.value.end),
        };
      else
        query[e.target.props.name] = { start: e.value.start, end: e.value.end };
    }

    this.setState({ query });
  };

  render() {
    return (
      <div className="App">
        {this.state.status === 2 ? (
          <div>Result ready, generating list.</div>
        ) : (
          <InputForm
            handleSubmit={this.handleSubmit}
            onTextChange={this.onTextChange}
            onNumberChange={this.onNumberChange}
            onSortChange={this.onSortChange}
            onMultiSelectChange={this.onMultiSelectChange}
            onSliderChange={this.onSliderChange}
            onRangeChange={this.onRangeChange}
            sorts={getSorts()}
            categoryList={getCategories()}
            query={this.state.query}
          />
        )}
      </div>
    );
  }
}

export default App;