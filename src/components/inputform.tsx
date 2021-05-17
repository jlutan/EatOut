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
import { CustomSlider, CustomRangeSlider } from "./sliders";

import "./styles/inputform.css";

interface Range {
  start: number;
  end: number;
}

export interface State {
  query: {
    [key: string]: any; // set index signatures to strings
    location?: string;
    radius?: number;
    categories?: string;
    limit?: number;
    sort_by?: string;
    price?: Range;
    open_now?: boolean;
  };
}

class InputForm extends Component<State> {
  state: State = {
    query: {
      location: "",
      radius: 5, // measured in kilometers
      categories: "restaurants", // always include restaurant
      limit: 15, // # of results to display
      sort_by: "best_match",
      price: { start: 1, end: 2 }, // price range (1-cheap, 4-expensive)
      // open_now: true
    },
  };

  xhttp: XMLHttpRequest = new XMLHttpRequest();
  categories: Array<string> = [""];
  sorts: Array<Object> = [
    {
      label: "Best Match",
      value: "best_match",
    },
    {
      label: "Rating",
      value: "rating",
    },
    {
      label: "Review Count",
      value: "review_count",
    },
    {
      label: "Distance",
      value: "distance",
    },
  ];

  /* Lifecycle Hooks */

  componentDidMount() {
    // Using AJAX to make http requests
    const xhttp = this.xhttp;
    xhttp.responseType = "json";
    // fires whenever the status of the object changes
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        // returns the server response as a JSON object
        console.log(xhttp.response);
      }
    };
  }

  /* Event Handlers */

  handleSubmit = (
    data: any,
    event: React.SyntheticEvent<any> | undefined
  ): void => {
    if (typeof event !== "undefined") event.preventDefault();

    this.setState({ query: JSON.parse(JSON.stringify(data), undefined) });

    console.log(JSON.stringify(data, null, 2));
    // call Yelp API
    // initialize new request
    this.xhttp.open("GET", "https://api.yelp.com/v3/businesses/search");
    // send the request to the internet
    // this.xhttp.send();
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
  onCategoriesChange = (e: InputChangeEvent): void => {};

  // update radius input
  onSliderChange = (e: SliderChangeEvent): void => {
    const query = { ...this.state.query };
    if (e.target.props.name) query[e.target.props.name] = e.value;
    this.setState({ query });
  };

  // update price input
  onRangeChange = (e: RangeSliderChangeEvent): void => {
    const query = { ...this.state.query };
    if (e.target.props.name)
      query[e.target.props.name] = { start: e.value.start, end: e.value.end };
    this.setState({ query });
  };

  // render the component
  render() {
    const { location, radius, categories, limit, sort_by, price } =
      this.state.query;

    return (
      <Form
        onSubmit={this.handleSubmit}
        render={(formRenderProps: any) => (
          <FormElement>
            <fieldset className="k-form-fieldset">
              <legend className="k-form-legend">
                Describe your restaurant search:
              </legend>
              <div className="mb-3">
                <Field
                  autoFocus
                  name="location"
                  onChange={this.onTextChange}
                  value={location}
                  component={Input}
                  label="Location"
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
                <Field
                  name="categories"
                  component={Input}
                  value={categories}
                  defaultValue={"restaurants"}
                  label="Categories"
                ></Field>
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
