import React, { Component } from "react";
import InputForm from "./components/inputform";
import {
  InputChangeEvent,
  SliderChangeEvent,
  RangeSliderChangeEvent,
  NumericTextBoxChangeEvent,
  RadioGroupChangeEvent,
} from "@progress/kendo-react-inputs";
import { TimePickerChangeEvent } from "@progress/kendo-react-dateinputs";
import { MultiSelectChangeEvent } from "@progress/kendo-react-dropdowns";
import {
  ResultsType,
  getSorts,
  getCategories,
  toCategoryValue,
} from "./yelp-lib";
import Results from "./components/results";

import "./App.css";

// WARNING: bad practice
const YELP_API_TOKEN: String =
  "5cSbPPrTn0Gr0446_jXm8UakTo0XTmr7xheg_VMBJ143tkLylG9Uri800onLWiHv9BZHRlwKSjgv2rzv4mTIsX4I2d5qXBLBQYp7Ado-cwj-VbqBx5keAQwEJLWhYHYx";

export interface Range {
  start: number;
  end: number;
}

type AppStatus = 0 | 1 | 2; // 0 - no data, 1 - request in progress, 2 - request done and ready

interface AppState {
  status: AppStatus;
  query: {
    [key: string]: any; // set index signatures to strings
    location: string;
    radius: number;
    categories: Array<string>;
    sort_by: string;
    price: Range;
    // open_at: number;
  };
  result: ResultsType;
  batch: number;
}

class App extends Component<AppState> {
  state: AppState = {
    status: 0,
    query: {
      location: "",
      // open_at: 0,
      radius: 5, // measured in kilometers
      categories: ["All"], // always include restaurant
      sort_by: "best_match",
      price: { start: 1, end: 2 }, // price range (1-cheap, 4-expensive)
      // open_now: true
    },
    result: {
      total: 0,
      businesses: [],
    },
    batch: 0,
  };

  sendYelpAPIRequest = (batch: number): void => {
    // generate yelp API query string based on current state
    const generateQueryString = (): string => {
      const query = { ...this.state.query };

      let queryString = "";
      for (const param in query) {
        let paramString = param.toString() + "=";
        if (query && param === "price") {
          if (query.price) {
            const prices: Array<Number> = [];
            for (let i = query.price.start; i <= query.price.end; i++) {
              prices.push(i);
            }
            paramString += prices.join(",");
          }
        } else if (param === "radius") {
          if (query.radius) paramString += Math.round(query.radius * 1000);
        } else if (param === "categories") {
          if (query.categories) {
            const cat: Array<string> = [];
            for (let category of query.categories) {
              const categoryValue = toCategoryValue(category);
              if (categoryValue) cat.push(categoryValue);
            }
            paramString += cat.join(",");
          }
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
      queryString += `limit=50&offset=${Math.max(batch - 1) * 50}`;
      return queryString;
    };
    const queryString = generateQueryString();

    // defines a GET request to the Yelp API
    const getRestaurants = async (url: RequestInfo): Promise<JSON> => {
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

    // send to proxy server to allow cross-site access
    getRestaurants(
      `https://cors-anywhere.herokuapp.com/api.yelp.com/v3/businesses/search?${queryString}`
    )
      .then(
        (value) => {
          this.setState({
            status: 2,
            result: value as unknown as ResultsType,
          });
        },
        (reason) => {
          console.log(reason);
          this.setState({ status: 0, result: null, batch: 0 });
        }
      )
      .catch((reason) => {
        console.log(reason);
        this.setState({ status: 0, result: null, batch: 0 });
      });
  };

  getUnixTimeStamp = (dateTime: string): void => {
    const getResponse = async (url: string): Promise<string> => {
      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
      });
      return response.text();
    };
    const generateQueryString = (): string => {
      const tokens = dateTime.split(" ");
      const date = tokens.slice(0, 3).join(" ");
      const time = tokens[3];
      return `date=${date} ${time}`;
    };
    const queryString = generateQueryString();

    getResponse(
      `https://showcase.api.linx.twenty57.net/UnixTime/tounix?${queryString}`
    )
      .then((value) => {
        const query = { ...this.state.query };
        console.log(value);
        query.open_at = Number.parseInt(value, 10).valueOf();
        this.setState({ query });
      })
      .catch((reason) => console.error(reason));
  };

  /* Event Handlers */

  // Sends a request to the Yelp API and saves the result to the state
  handleSubmit = async (
    data: any,
    event: React.SyntheticEvent<any> | undefined
  ): Promise<void> => {
    if (typeof event !== "undefined") event.preventDefault();

    this.sendYelpAPIRequest(1);

    if (this.state.batch === 0) this.setState({ batch: 1 });
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

  onTimeChange = (e: TimePickerChangeEvent): void => {
    const query = { ...this.state.query };
    if (e.target.props.name) {
      query[e.target.props.name] = this.getUnixTimeStamp(
        e.value?.toString() as string
      );
    }
  };

  // generate previous batch of Yelp results
  onPrevBatch = (): void => {
    if (this.state.status === 2) {
      this.sendYelpAPIRequest(this.state.batch - 1);
      this.setState({ batch: this.state.batch - 1 });
    }
  };

  // generate next batch of Yelp results
  onNextBatch = (): void => {
    if (this.state.status === 2) {
      this.sendYelpAPIRequest(this.state.batch + 1);
      this.setState({ batch: this.state.batch + 1 });
    }
  };

  onBack = (): void => {
    if (this.state.status !== 0) {
      this.setState({ status: 0, result: null, batch: 0 });
    }
  };

  render() {
    return (
      <div className="App">
        {this.state.status === 2 ? (
          <Results
            result={this.state.result}
            batch={this.state.batch}
            location={this.state.query.location}
            onPrevBatch={this.onPrevBatch}
            onNextBatch={this.onNextBatch}
            onBack={this.onBack}
          />
        ) : (
          <InputForm
            handleSubmit={this.handleSubmit}
            onTextChange={this.onTextChange}
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
