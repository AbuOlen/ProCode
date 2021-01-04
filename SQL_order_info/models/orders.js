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


const order_sum = async (drink_name, start, end) => {
  try {
    const con = await mysql.createConnection(config);
   //DROP VIEW IF EXISTS MyTable; 
   //; SELECT SUM(BIll) FROM MyTable WHERE Drink = 'mokko'

    const [row0, fields0] = await con.query(`DROP VIEW IF EXISTS MyTable`);
    const query = `CREATE VIEW MyTable AS SELECT orders.Time, orders.Number, users.Name, menuDrinks.Name AS Drink, (menuDrinks.Price * menuCapacities.Multiplier) AS Bill FROM orders INNER JOIN users ON orders.userID=users.ID INNER JOIN menuDrinks ON menuDrinks.ID=orders.drinkID INNER JOIN menuCapacities ON menuCapacities.ID=orders.CupID WHERE orders.Time BETWEEN ? AND ? ORDER BY Time`;

    const [row1, fields1] = await con.query(query, [start, end]);

    const [row2, fields2] = await con.query(`SELECT SUM(BIll) AS Total FROM MyTable WHERE Drink = ?`, [drink_name]);

    con.end();

    console.log("calculate sum:", row2);
    return row2;
  } catch (err) {
    console.log("catch err:", err);
    con.end();
  }
};
module.exports.order_info = order_info;
module.exports.order_sum = order_sum;