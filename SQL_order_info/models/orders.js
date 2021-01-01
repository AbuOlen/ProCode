const mysql = require("mysql2/promise");
const config = require("../config/mysql.coffeshop");

const order_info = async (drink_name, start, end) => {
  try {
    const con = await mysql.createConnection(config);
   
    const query = `SELECT orders.Time, orders.Number, users.Name FROM orders INNER JOIN users ON orders.userID=users.ID  INNER JOIN menuDrinks ON menuDrinks.ID=orders.drinkID WHERE menuDrinks.Name= ? AND orders.Time BETWEEN ? AND ? ORDER BY Time `;

    const [row, fields] = await con.execute(query, [drink_name, start, end]);

    con.end();

    console.log("get drinks from model:", row);
    return row;
  } catch (err) {
    console.log("catch err:", err);
    con.end();
  }
};

module.exports.order_info = order_info;
