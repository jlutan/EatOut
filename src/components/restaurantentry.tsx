import React, { FunctionComponent } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardImage,
} from "@progress/kendo-react-layout";
import { getRatingAsset } from "../yelp-lib";
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
    <Card orientation="horizontal">
      <CardImage src={image_url} />
      <div className="k-vbox">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardBody>
          <div>Price - {price}</div>
          <div>
            Distance -{" "}
            {distance > 1000
              ? `${(distance / 1000).toPrecision(3)} kilometers`
              : `${Math.round(distance)} meters`}
          </div>
          <div className="rating">
            <img
              src={"yelp-assets/stars/" + getRatingAsset(rating)}
              alt="Yelp rating"
            />
            {review_count && ` ${rating} (Based on ${review_count} reviews)`}
          </div>
          {location && <div>{location.address1}</div>}
          {display_phone ? (
            <div>{display_phone}</div>
          ) : (
            phone && <div>{phone}</div>
          )}
          {url && (
            <a
              className="business-page-link"
              role="button"
              href={url}
              target="_blank"
              rel="noreferrer noopener"
            >
              <img src="yelp-assets/Burst.svg" alt="Yelp burst logo" />
              <div>
                <div>Yelp</div>
                <div className="lighter-text">Read more on Yelp</div>
              </div>
            </a>
          )}
        </CardBody>
      </div>
    </Card>
  );
};

export default RestaurantEntry;
