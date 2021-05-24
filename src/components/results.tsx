import React, { FunctionComponent, useState } from "react";
import {
  ListView,
  ListViewHeader,
  ListViewFooter,
} from "@progress/kendo-react-listview";
import {
  Filter,
  Operators,
  TextFilter,
} from "@progress/kendo-react-data-tools";
import { filterBy } from "@progress/kendo-data-query";
import RestaurantEntry from "./restaurantentry";
import "./styles/results.css";

interface FilterType {}

const initialFilter: FilterType = {
  logic: "and",
  filters: [],
};

export interface ResultsProps {
  result: {
    [key: string]: any;
    total: number;
    businesses: Array<Object>;
  };
}

const Results: FunctionComponent<ResultsProps> = ({ result }) => {
  const [businesses, setBusinesses] = useState(result.businesses);
  const [filter, setFilter] = useState(initialFilter);

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
