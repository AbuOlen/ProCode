function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function randFromArr(dateArray) {
    return dateArray[randInt(0, dateArray.length-1)];
};

function getOrders(count, dateArray) {
  let arr = [];
  for (let i = 0; i < count; i++) {
    let order = {};
    order.number = randInt(123, 128);
    order.userid = randInt(1, 303);
    order.drinkid = randInt(1, 3);
    order.capid = randInt(1, 2);
    order.time = randFromArr(dateArray);
    arr.push(order);
  };
  return arr;
};

module.exports = getOrders;
