export const generateRandomNumber = (min, max) => {
  return (Math.random() * (max - min) + min);
};

export const generateRandomNumberArray = (min, max, n) => {
  let data = [];
  for(let i=0; i<n; i++) {
    data.push(generateRandomNumber(min, max));
  }
  return data;
};

export const generateInitialData = (minA, maxA, minB, maxB, n, reverseOrder) => {
  let data = [];
  for(let i=0; i<n; i++) {
    data.push({
      price: generateRandomNumber(minA, maxA),
      amount: generateRandomNumber(minB, maxB),
    });
  }
  return data.sort((a,b) => {
    if(reverseOrder){
      return (a.price < b.price) ? 1 : ((b.price < a.price) ? -1 : 0);
    } else {
      return (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0);
    }
  });
};

export const generateData = (min, n) => {
  let data = [];
  data.push(min);
  for(let i=1; i<n; i++) {
    data.push(data[i-1] + generateRandomNumber(10, 25))
  }
  let buys = data.slice(0, data.length/2).reverse();
  let sells = data.slice(data.length/2, data.length + 1);
  let buyResults = [];
  let sellResults = [];
  for(let i=0; i<data.length/2; i++){
    buyResults.push({
      price: buys[i],
      amount: generateRandomNumber(0.001, 2.123),
    });
    sellResults.push({
      price: sells[i],
      amount: generateRandomNumber(0.001, 2.123),
    });
  }
  return {
    buy: buyResults,
    sell: sellResults, 
  };
};
