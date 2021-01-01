const mysql = require("mysql2/promise");
const config = require("../config/mysql.coffeshop");

const get = async () => {
  try {
    const con = await mysql.createConnection(config);
    
    const query = `SELECT Name FROM menuDrinks`;

    const [row, fields] = await con.execute(query);

    con.end();

    console.log("get drinks from model:", row);
    return row;
  } catch (err) {
    console.log("catch err:", err);
    con.end();
  }
};

module.exports.get = get;
