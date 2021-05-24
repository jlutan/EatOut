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
  FilterChangeEvent,
} from "@progress/kendo-react-data-tools";
import {
  filterBy,
  CompositeFilterDescriptor,
} from "@progress/kendo-data-query";
import RestaurantEntry from "./restaurantentry";
import { ResultsType } from "../yelp-lib";

import "./styles/results.css";

/*
  Filter Operators
  ==================
  Numeric values:
  gt - greater than
  lt - less than
  eq - equal to

  String values:
  contains - contains substring
*/

const initialFilter: CompositeFilterDescriptor = {
  logic: "and",
  filters: [
    {
      field: "transactions",
      operator: "contains",
      value: "restaurant_reservation",
    },
  ],
};

export interface ResultsProps {
  result: ResultsType;
}

const Results: FunctionComponent<ResultsProps> = ({ result }) => {
  const [businesses, setBusinesses] = useState(result.businesses);
  const [filter, setFilter] = useState(initialFilter);

  const onFilterChange = (event: FilterChangeEvent) => {
    setFilter(event.filter);
  };

  const Header: FunctionComponent = () => {
    return (
      <ListViewHeader className="pl-3 pb-2 pt-2">
        Restaurants - {result.total} total results
      </ListViewHeader>
    );
  };

  return (
    <React.Fragment>
      <Filter
        value={filter}
        onChange={onFilterChange}
        fields={[
          {
            name: "transactions",
            label: "Transactions",
            filter: TextFilter,
            operators: Operators.text,
          },
        ]}
      />
      <ListView
        header={Header}
        data={filterBy(businesses, filter)}
        item={RestaurantEntry}
      />
    </React.Fragment>
  );
};

export default Results;
