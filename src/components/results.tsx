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
  Pager,
  PageChangeEvent,
  FilterChangeEvent,
} from "@progress/kendo-react-data-tools";
import {
  filterBy,
  CompositeFilterDescriptor,
} from "@progress/kendo-data-query";
import RestaurantEntry from "./restaurantentry";
import { ResultsType } from "../yelp-lib";
import { Button } from "@progress/kendo-react-buttons";

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

/*
  Transaction values include:
  restaurant-reservation
  pickup
  delivery
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
  batch: number;
  location: string;
  onPrevBatch: () => void;
  onNextBatch: () => void;
  onBack: () => void;
}

const Results: FunctionComponent<ResultsProps> = ({
  result,
  batch,
  location,
  onPrevBatch,
  onNextBatch,
  onBack,
}) => {
  const [filter, setFilter] = useState(initialFilter);
  const [page, setPage] = useState({
    skip: 0,
    take: 10,
  });

  const onFilterChange = (event: FilterChangeEvent): void => {
    setFilter(event.filter);
  };

  const handlePageChange = (event: PageChangeEvent): void => {
    setPage({ skip: event.skip, take: event.take });
  };

  const { skip, take } = page;
  const filteredData = filterBy(result.businesses, filter);

  const Header: FunctionComponent = () => {
    return (
      <ListViewHeader className="pl-3 pb-2 pt-2">
        Restaurants near <strong>{location}</strong> - {result.total} total
        results
      </ListViewHeader>
    );
  };

  const Footer: FunctionComponent = () => {
    return (
      <ListViewFooter className="pl-3 pr-3 pt-2 pb-2">
        <div>
          <Pager
            skip={skip}
            take={take}
            onPageChange={handlePageChange}
            total={filteredData.length}
          />
        </div>
        <div className="batch-buttons">
          <Button
            look="flat"
            primary={true}
            onClick={onPrevBatch}
            disabled={batch === 1 ? true : false}
          >
            {"<"} Previous
          </Button>
          <span>Batch {batch}</span>
          <Button
            look="flat"
            primary={true}
            onClick={onNextBatch}
            disabled={result.total / (batch * 50) > 1 ? false : true}
          >
            Next {">"}
          </Button>
        </div>
        <Button disabled={false} onClick={onBack}>
          New Search
        </Button>
      </ListViewFooter>
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
        footer={Footer}
        data={filteredData.slice(skip, skip + take)}
        item={RestaurantEntry}
      />
    </React.Fragment>
  );
};

export default Results;
