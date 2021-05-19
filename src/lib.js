const getSorts = () => {
  return [
    {
      label: "Best Match",
      value: "best_match",
    },
    {
      label: "Rating",
      value: "rating",
    },
    {
      label: "Review Count",
      value: "review_count",
    },
    {
      label: "Distance",
      value: "distance",
    },
  ];
};

const getCategories = () => {
  return [
    {
      text: "Acai Bowls",
      id: 1,
    },
    {
      text: "Bakeries",
      id: 2,
    },
    {
      text: "Comfort Food",
      id: 3,
    },
    {
      text: "Chinese",
      id: 4,
    },
  ];
};

export { getSorts, getCategories };
