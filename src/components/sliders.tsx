import * as React from "react";
import { Slider, RangeSlider, SliderLabel } from "@progress/kendo-react-inputs";

/*
  Regular Slider
*/

export interface CustomSliderProps {
  name: string;
  value: number;
  onChange(): Function;
  step: number;
  defaultValue?: number;
  min: number;
  max: number;
  positions?: Array<number>;
}

const CustomSlider: React.FunctionComponent<CustomSliderProps> = ({
  name,
  value,
  onChange,
  step,
  defaultValue,
  min,
  max,
  positions,
}) => {
  return (
    <Slider
      className="custom-slider"
      name={name}
      buttons={true}
      value={value}
      onChange={onChange}
      step={step}
      defaultValue={defaultValue || 100 <= max ? 100 : min}
      min={min}
      max={max}
    >
      {positions &&
        positions.map((pos, i) => (
          <SliderLabel key={i} position={pos}>
            {pos}
          </SliderLabel>
        ))}
    </Slider>
  );
};

/* 
  Range Slider
*/

export interface Range {
  start: number;
  end: number;
}

export interface CustomRangeSliderProps {
  name: string;
  value: Range;
  onChange(): Function;
  step: number;
  defaultValue?: Range;
  min: number;
  max: number;
  positions?: Array<number>;
}

const CustomRangeSlider: React.FunctionComponent<CustomRangeSliderProps> = ({
  name,
  value,
  onChange,
  step,
  defaultValue,
  min,
  max,
  positions,
}) => {
  return (
    <RangeSlider
      className="custom-slider"
      name={name}
      value={value}
      onChange={onChange}
      step={step}
      defaultValue={defaultValue}
      min={min}
      max={max}
    >
      {positions &&
        positions.map((pos, i) => (
          <SliderLabel key={i} position={pos}>
            {pos}
          </SliderLabel>
        ))}
    </RangeSlider>
  );
};

export { CustomSlider, CustomRangeSlider };
