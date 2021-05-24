import React, { FunctionComponent } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardImage,
} from "@progress/kendo-react-layout";
import { ChunkProgressBar } from "@progress/kendo-react-progressbars";
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
          <div>{Math.round(distance)} meters</div>
          <div>
            Rating: {rating}{" "}
            <ChunkProgressBar
              value={rating * 20}
              progressStyle={{ background: "#f0e396" }}
              emptyStyle={{ background: "#ededed" }}
            />
            {review_count && " (" + review_count + " reviews)"} - {price}
          </div>
          {location && <div>{location.address1}</div>}
          {display_phone && <div>{display_phone}</div>}
          {url && (
            <a href={url} target="_blank">
              {name} Website
            </a>
          )}
        </CardBody>
      </div>
    </Card>
  );
};

export default RestaurantEntry;
