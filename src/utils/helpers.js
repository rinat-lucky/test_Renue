const reduce = (collection) => {
  return collection.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
}; 

export const makeSortedList = (collection, index) => {
  const formedList = reduce(collection);
  const sortedList = Object.entries(formedList);
  sortedList.sort((a, b) => b[index] - a[index]);
  return sortedList;
};
