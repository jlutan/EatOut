import React, { FunctionComponent } from "react";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Label, Error } from "@progress/kendo-react-labels";
import {
  Input,
  NumericTextBox,
  RadioGroup,
} from "@progress/kendo-react-inputs";
import {
  TimePicker,
  TimePickerChangeEvent,
} from "@progress/kendo-react-dateinputs";
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
  onTimeChange: (event: TimePickerChangeEvent) => void;
  // form state
  sorts: Array<{ label: string; value: string }>;
  categoryList: Array<string>;
  query: {
    location: string;
    radius: number;
    categories: Array<string>;
    sort_by: string;
    price: Range;
    open_at: number;
  };
}

const InputForm: FunctionComponent<InputFormProps> = (props) => {
  // query values
  const { location, open_at, radius, categories, sort_by, price } = props.query;
  // event handlers
  const {
    handleSubmit,
    onTextChange,
    onNumberChange,
    onSortChange,
    onMultiSelectChange,
    onSliderChange,
    onRangeChange,
    onTimeChange,
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
                label="Location (City, Street, Zip code, etc.)"
                name="location"
                onChange={onTextChange}
                value={location}
                component={Input}
              />
            </div>
            <div className="mb-3">
              <Field
                label="Open At"
                name="open_at"
                onChange={onTimeChange}
                value={open_at}
                component={TimePicker}
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
                allowCustom={true}
                data={categoryList}
                onChange={onMultiSelectChange}
                value={categories}
              />
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
            <div className="mb-3">
              <Label editorId="sort_by">Sort By</Label>
              <Field
                name="sort_by"
                component={RadioGroup}
                disabled={false}
                onChange={onSortChange}
                defaultValue={sorts[0].value}
                value={sort_by}
                data={sorts}
                label="Sort By"
              ></Field>
            </div>
          </fieldset>
          <div className="k-form-buttons">
            <button type="submit" className="k-button">
              Search Restaurants
            </button>
          </div>
        </FormElement>
      )}
    />
  );
};

export default InputForm;
