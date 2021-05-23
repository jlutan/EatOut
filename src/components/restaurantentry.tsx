import React, { FunctionComponent } from "react";
import "./styles/restaurantentry.css";

export interface RestaurantEntryProps {
  dataItem: {
    [key: string]: any;
    name: string;
    distance: number; // in meters
    location?: {
      address1: string;
    };
    price: string;
    rating: number;
    review_count?: number;
    image_url?: string;
    display_phone?: string;
    phone?: string;
    url?: string;
  };
}

const RestaurantEntry: FunctionComponent<RestaurantEntryProps> = (props) => {
  const {
    name,
    distance,
    location,
    price,
    rating,
    review_count,
    image_url,
    display_phone,
    phone,
    url,
  } = props.dataItem;

  return (
    <div className="restaurant-entry">
      <div className="info">
        <div>{name}</div>
        <div>{Math.round(distance)} meters</div>
        <div>
          Rating: {rating}{" "}
          {review_count ? "(" + review_count + "reviews)" : null} - {price}
        </div>
        {location ? <div>{location.address1}</div> : null}
        {display_phone ? (
          <div>{display_phone}</div>
        ) : phone ? (
          <div>{phone}</div>
        ) : null}
        {url ? (
          <a href={url} target="_blank">
            {name}'s Website
          </a>
        ) : null}
      </div>
      <img width="128px" src={image_url} title={name} alt="No Image" />
    </div>
  );
};

export default RestaurantEntry;
