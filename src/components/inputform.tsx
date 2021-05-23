import React, { FunctionComponent } from "react";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Label, Error } from "@progress/kendo-react-labels";
import {
  Input,
  NumericTextBox,
  RadioGroup,
} from "@progress/kendo-react-inputs";
import {
  MultiSelect,
  MultiSelectChangeEvent,
} from "@progress/kendo-react-dropdowns";
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
  onNumberChange: (event: any) => void;
  onSortChange: (event: any) => void;
  onMultiSelectChange: (event: MultiSelectChangeEvent) => void;
  onSliderChange: (event: any) => void;
  onRangeChange: (event: any) => void;
  // form state
  sorts: Array<Object>;
  categoryList: Array<Object>;
  query: {
    location: String;
    radius: number;
    categories: Array<Object>;
    limit: number;
    sort_by: String;
    price: Range;
  };
}

const InputForm: FunctionComponent<InputFormProps> = (props) => {
  // query values
  const { location, radius, categories, limit, sort_by, price } = props.query;
  // event handlers
  const {
    handleSubmit,
    onTextChange,
    onNumberChange,
    onSortChange,
    onMultiSelectChange,
    onSliderChange,
    onRangeChange,
    categoryList,
    sorts,
  } = props;

  return (
    <Form
      onSubmit={handleSubmit}
      render={(formRenderProps: any) => (
        <FormElement>
          <fieldset className="k-form-fieldset">
            <legend className="k-form-legend">Describe your search:</legend>
            <div className="mb-3">
              <Field
                autoFocus
                name="location"
                onChange={onTextChange}
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
                onChange={onSliderChange}
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
                data={categoryList}
                textField="text"
                dataItemKey="id"
                onChange={onMultiSelectChange}
                value={categories}
              />
            </div>
            <div className="mb-3">
              <Field
                name="limit"
                component={NumericTextBox}
                onChange={onNumberChange}
                value={limit}
                defaultValue={20}
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
                onChange={onSortChange}
                value={sort_by}
                data={sorts}
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
                onChange={onRangeChange}
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
};

export default InputForm;
