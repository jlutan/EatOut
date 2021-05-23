import React, { FunctionComponent, useState } from "react";
import {
  ListView,
  ListViewHeader,
  ListViewFooter,
} from "@progress/kendo-react-listview";
import RestaurantEntry from "./restaurantentry";
import "./styles/results.css";

export interface ResultsProps {
  result: {
    [key: string]: any;
    total: number;
    businesses: Array<Object>;
  };
}

const Results: FunctionComponent<ResultsProps> = ({ result }) => {
  const [businesses, setBusinesses] = useState(result.businesses);

  const Header: FunctionComponent = () => {
    return (
      <ListViewHeader className="pl-3 pb-2 pt-2">
        Restaurants - {result.total} total results
      </ListViewHeader>
    );
  };

  return <ListView header={Header} data={businesses} item={RestaurantEntry} />;
};

export default Results;
