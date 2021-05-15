import React, { Component } from "react";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Label, Error } from "@progress/kendo-react-labels";
import {
  Input,
  SliderChangeEvent,
  RangeSliderChangeEvent,
} from "@progress/kendo-react-inputs";
import { CustomSlider, CustomRangeSlider } from "./sliders";

export interface Range {
  start: number;
  end: number;
}

export interface State {
  location?: string;
  radius?: number;
  categories?: string;
  limit?: number;
  sort_by?: string;
  price?: Range;
  open_now?: boolean;
}

class InputForm extends Component<State> {
  state = {
    query: {
      location: "",
      radius: 1000, // measured in meters
      categories: "restaurants", // always include restaurant
      limit: 15, // # of results to display
      sort_by: "best_match",
      price: { start: 1, end: 2 }, // price range (1-cheap, 3-expensive)
      // open_now: true
    },
  };

  categories = [""];

  handleSubmit = (
    data: any,
    event: React.SyntheticEvent<any> | undefined
  ): void => {
    if (typeof event !== "undefined") event.preventDefault();
    console.log(JSON.stringify(data, null, 2));
    this.setState({ query: JSON.parse(JSON.stringify(data), undefined) });
  };

  // change radius slider
  onRadiusChange = (e: SliderChangeEvent) => {
    const query = { ...this.state.query };
    query.radius = e.value;
    this.setState({ query });
  };

  // change price slider
  onPriceChange = (e: RangeSliderChangeEvent) => {
    const query = { ...this.state.query };
    query.price = { start: e.value.start, end: e.value.end };
    this.setState({ query });
  };

  render() {
    const { radius, price } = this.state.query;

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
                  component={Input}
                  label="Location"
                />
              </div>
              <div className="mb-3">
                <Label editorId="radius">Radius</Label>
                <Field
                  id="radius"
                  name="radius"
                  component={CustomSlider}
                  onChange={this.onRadiusChange}
                  value={radius}
                  min={0}
                  max={1000}
                  step={20}
                  defaultValue={100}
                  positions={[0, 250, 500, 750, 1000]}
                ></Field>
              </div>
              <div className="mb-3">
                <Field
                  name="categories"
                  component={Input}
                  label="Categories"
                ></Field>
              </div>
              <div className="mb-3">
                <Field name="limit" component={Input} label="Limit"></Field>
              </div>
              <div className="mb-3">
                <Field name="sort-by" component={Input} label="Sort By"></Field>
              </div>
              <div className="mb-3">
                <Label editorId="price">Price</Label>
                <Field
                  id="price"
                  name="price"
                  type="range"
                  component={CustomRangeSlider}
                  onChange={this.onPriceChange}
                  value={price}
                  min={1}
                  max={3}
                  step={1}
                  defaultValue={{ start: 1, end: 1 }}
                  positions={[1, 2, 3]}
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
