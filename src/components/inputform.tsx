import React, { FunctionComponent } from "react";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Label } from "@progress/kendo-react-labels";
import { Input, RadioGroup } from "@progress/kendo-react-inputs";
import {
  MultiSelect,
  MultiSelectChangeEvent,
} from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import { Ripple } from "@progress/kendo-react-ripple";
import { CustomSlider, CustomRangeSlider } from "./sliders";
import { Range } from "../App";

import "./styles/inputform.css";

export interface InputFormProps {
  // event handlers
  handleSubmit: (
    values: {
      [name: string]: any;
    },
    event?: React.SyntheticEvent<any, Event> | undefined
  ) => void;
  onTextChange: (event: any) => void;
  onSortChange: (event: any) => void;
  onMultiSelectChange: (event: MultiSelectChangeEvent) => void;
  onSliderChange: (event: any) => void;
  onRangeChange: (event: any) => void;
  // form state
  sorts: Array<{ label: string; value: string }>;
  categoryList: Array<string>;
  query: {
    location: string;
    radius: number;
    categories: Array<string>;
    sort_by: string;
    price: Range;
    // open_at: number;
  };
}

const InputForm: FunctionComponent<InputFormProps> = (props) => {
  // query values
  const { location, radius, categories, sort_by, price } = props.query;
  // event handlers
  const {
    handleSubmit,
    onTextChange,
    onSortChange,
    onMultiSelectChange,
    onSliderChange,
    onRangeChange,
    categoryList,
    sorts,
  } = props;

  const locationValidator = (): string => {
    return location.length > 0 ? "" : "Please enter a location.";
  };

  // const timeValidator = (): string => {
  //   return open_at !== 0 ? "" : "Please choose an opening time.";
  // };

  return (
    <Form
      onSubmit={handleSubmit}
      render={(formRenderProps: any) => (
        <FormElement>
          <fieldset className="k-form-fieldset">
            <legend className="k-form-legend">Describe your search:</legend>
            <div className="form-field">
              <Field
                autoFocus
                label="Location (City, Street, Zip code, etc.)"
                name="location"
                onChange={onTextChange}
                value={location}
                defaultValue={location}
                validator={locationValidator}
                component={Input}
              />
            </div>
            {/* <div className="form-field">
              <Field
                label="Open Time"
                name="open_at"
                onChange={onTimeChange}
                value={open_at}
                validator={timeValidator}
                component={TimePicker}
              />
            </div> */}
            <div className="form-field">
              <Label editorId="radius">Search Radius (in km)</Label>
              <Field
                name="radius"
                component={CustomSlider}
                onChange={onSliderChange}
                value={radius}
                defaultValue={5}
                min={1}
                max={40}
                step={1}
                positions={[1, 5, 10, 20, 30, 40]}
              ></Field>
            </div>
            <div className="form-field">
              <MultiSelect
                label="Categories"
                valid={categories.length > 0}
                validationMessage="Please choose at least one category."
                name="categories"
                allowCustom={true}
                data={categoryList}
                onChange={onMultiSelectChange}
                value={categories}
              />
            </div>
            <div className="form-field">
              <Label editorId="price">Price</Label>
              <Field
                id="price"
                name="price"
                type="range"
                component={CustomRangeSlider}
                onChange={onRangeChange}
                value={price}
                min={1}
                max={4}
                step={1}
                defaultValue={{ start: 1, end: 2 }}
                positions={[1, 2, 3, 4]}
              ></Field>
            </div>
            <div className="form-field">
              <Label editorId="sort_by">Sort By</Label>
              <Ripple>
                <Field
                  name="sort_by"
                  hint={"Choose the sort for the results."}
                  component={RadioGroup}
                  disabled={false}
                  onChange={onSortChange}
                  defaultValue={sorts[0].value}
                  value={sort_by}
                  data={sorts}
                  label="Sort By"
                ></Field>
              </Ripple>
            </div>
          </fieldset>
          <div className="k-form-buttons">
            <Ripple>
              <Button
                look="default"
                primary={true}
                type="submit"
                className="k-button"
              >
                Search for Restaurants
              </Button>
            </Ripple>
          </div>
        </FormElement>
      )}
    />
  );
};

export default InputForm;
