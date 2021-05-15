import React, { Component } from "react";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Error } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";

export interface State {
  location?: string;
  radius?: number;
  categories?: string;
  limit?: number;
  sort_by?: string;
  price?: string;
  open_now?: boolean;
}

class InputForm extends Component<State> {
  state = {
    query: {
      location: "",
      radius: 1000, // measured in meters
      categories: "restaurants", // always include restaurant
      limit: 15,
      sort_by: "best_match",
      price: "1, 2",
      // open_now: true
    },
  };

  categories = [""];

  handleSubmit = (data: any) => {
    console.log(JSON.stringify(data, null, 2));
    this.setState(JSON.parse(data, undefined));
  };

  render() {
    const {
      query: { location, radius, categories, limit, sort_by, price },
    } = this.state;

    return (
      <Form
        onSubmit={this.handleSubmit}
        render={(formRenderProps) => (
          <FormElement>
            <fieldset className="k-form-fieldset">
              <legend className="k-form-legend">Describe your query:</legend>
              <div className="mb-3">
                <Field
                  autoFocus
                  name="location"
                  component={Input}
                  label="Location"
                />
              </div>
              <div className="mb-3">
                <Field
                  name="radius"
                  type="range"
                  component={Input}
                  label="Radius"
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
                <Field
                  name="price"
                  type="range"
                  component={Input}
                  label="Price"
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
      // <form>
      //   <label>Location: </label>
      //   <input title="Location" type="text"></input>
      //   <label>Search Radius: </label>
      //   <input title="Search Radius" type="range"></input>
      //   <label>Categories: </label>
      //   <input title="Categories" type="text"></input>
      //   <label>Sort By: </label>
      //   <input title="Sort By" type="text"></input>
      //   <label>Price Range: </label>
      //   <input title="Price Range" type="range"></input>
      //   <input type="submit"></input>
      // </form>
    );
  }
}

export default InputForm;
