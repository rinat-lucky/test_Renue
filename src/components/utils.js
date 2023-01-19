export const reduce = (collection) => {
  return collection.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
}; 

export const makeShopList = (collection) => {
  const formedList = reduce(collection);
  const sortedList = Object.entries(formedList);
  sortedList.sort((a, b) => b[1] - a[1]);
  return sortedList;
};
