import React, { Component } from "react";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Label, Error } from "@progress/kendo-react-labels";
import {
  Input,
  InputChangeEvent,
  SliderChangeEvent,
  RangeSliderChangeEvent,
  NumericTextBoxChangeEvent,
  NumericTextBox,
  RadioGroupChangeEvent,
  RadioGroup,
} from "@progress/kendo-react-inputs";
import {
  MultiSelect,
  MultiSelectChangeEvent,
} from "@progress/kendo-react-dropdowns";
import { CustomSlider, CustomRangeSlider } from "./sliders";
import { getSorts, getCategories } from "../lib";

import "./styles/inputform.css";

const YELP_API_TOKEN: String =
  "5cSbPPrTn0Gr0446_jXm8UakTo0XTmr7xheg_VMBJ143tkLylG9Uri800onLWiHv9BZHRlwKSjgv2rzv4mTIsX4I2d5qXBLBQYp7Ado-cwj-VbqBx5keAQwEJLWhYHYx";

interface Range {
  start: number;
  end: number;
}

export interface InputFormState {
  query: {
    [key: string]: any; // set index signatures to strings
    location?: string;
    radius?: number;
    categories?: Array<Object>;
    limit?: number;
    sort_by?: string;
    price?: Range;
    open_now?: boolean;
  };
  result: Object;
}

class InputForm extends Component<InputFormState> {
  state: InputFormState = {
    query: {
      location: "",
      radius: 5, // measured in kilometers
      categories: [], // always include restaurant
      limit: 15, // # of results to display
      sort_by: "best_match",
      price: { start: 1, end: 2 }, // price range (1-cheap, 4-expensive)
      // open_now: true
    },
    result: {},
  };

  xhttp: XMLHttpRequest = new XMLHttpRequest();
  categoryList: Array<Object> = [];
  sorts: Array<Object> = [];

  /* Lifecycle Hooks */

  componentDidMount() {
    // initialize members
    this.categoryList = getCategories();
    this.sorts = getSorts();

    // Using AJAX to make http requests
    const xhttp = this.xhttp;
    xhttp.responseType = "json";
    // fires whenever the status of the object changes
    xhttp.onreadystatechange = () => {
      // activates when request is done and HTTP status is OK
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        // returns the server response as a JSON object
        console.log(xhttp.response);
        this.setState({ result: xhttp.response });
      }
    };
  }

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
      let paramString = param.toString() + '="';
      if (query && param === "price") {
        const el: Array<Number> = [];
        if (query.price) {
          for (let i = query.price.start; i <= query.price.end; i++) {
            el.push(i);
          }
        }
        paramString += el.join(",");
      } else if (param === "radius") {
        if (query.radius) paramString += query.radius * 1000;
      } else if (param === "categories") {
      } else {
        paramString += query[param];
      }
      queryString += paramString + '"&';
    }
    console.log(queryString);

    this.getRestaurants(
      `https://api.yelp.com/v3/businesses/search?${queryString}`
    )
      .then((data) => console.log(data))
      .catch((reason) => console.log(reason));
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

  // render the component
  render() {
    const { location, radius, categories, limit, sort_by, price } =
      this.state.query;

    const categoriesValue: Array<String> = [];
    categories?.forEach((category) =>
      categoriesValue.push(category.toString())
    );

    return (
      <Form
        onSubmit={this.handleSubmit}
        render={(formRenderProps: any) => (
          <FormElement>
            <fieldset className="k-form-fieldset">
              <legend className="k-form-legend">Describe your search:</legend>
              <div className="mb-3">
                <Field
                  autoFocus
                  name="location"
                  onChange={this.onTextChange}
                  value={location}
                  component={Input}
                  label="Location (City, Street, Zip code, etc.)"
                />
              </div>
              <div className="mb-3">
                <Label editorId="radius">Search Radius (in km)</Label>
                <Field
                  name="radius"
                  component={CustomSlider}
                  onChange={this.onSliderChange}
                  value={radius}
                  defaultValue={5}
                  min={1}
                  max={40}
                  step={1}
                  positions={[1, 5, 10, 20, 30, 40]}
                ></Field>
              </div>
              <div className="mb-3">
                <MultiSelect
                  label="Categories"
                  name="categories"
                  data={this.categoryList}
                  textField="text"
                  dataItemKey="id"
                  onChange={this.onMultiSelectChange}
                  value={categories}
                />
              </div>
              <div className="mb-3">
                <Field
                  name="limit"
                  component={NumericTextBox}
                  onChange={this.onNumberChange}
                  value={limit}
                  defaultValue={15}
                  min={1}
                  max={200}
                  step={1}
                  label="Result Limit"
                ></Field>
              </div>
              <div className="mb-3">
                <Label editorId="sort_by">Sort By</Label>
                <Field
                  name="sort_by"
                  component={RadioGroup}
                  disabled={false}
                  onChange={this.onSortChange}
                  value={sort_by}
                  data={this.sorts}
                  label="Sort By"
                ></Field>
              </div>
              <div className="mb-3">
                <Label editorId="price">Price</Label>
                <Field
                  id="price"
                  name="price"
                  type="range"
                  component={CustomRangeSlider}
                  onChange={this.onRangeChange}
                  value={price}
                  min={1}
                  max={4}
                  step={1}
                  defaultValue={{ start: 1, end: 2 }}
                  positions={[1, 2, 3, 4]}
                ></Field>
              </div>
            </fieldset>
            <div className="k-form-buttons">
              <button type="submit" className="k-button">
                Submit
              </button>
            </div>
          </FormElement>
        )}
      />
    );
  }
}

export default InputForm;
