const mysql = require('mysql');

const config = {
    host: '127.0.0.1',
    port: '3306',
    user:'root',
    password:'maranoid',
    database: 'proj1',
};
const connection = mysql.createConnection(config);

connection.connect(err => {
    if(err) {
        console.log(err);
    } else {
        console.log('connected successfully');
    }
});

//const query = 'SELECT * FROM user';
//const query = 'INSERT INTO user(id, name, email, password) VALUES(5, "Michal", "ghg@ghg", "12345")';
//const query = 'SELECT * FROM user WHERE (id < 3)';
//const query = 'SELECT name * FROM user WHERE (id > 4)';
// const query = `CREAT TABLE pets ( 
//     id INT PRIMARY KEY,
//     name VARCHAR(33),
//     age INT
//     )
//     `;

// const query = 'INSERT INTO user(id, name, age) VALUES(6, "Barsik", "4")';
//const query = 'DELETE FROM user WHERE id = 1';


connection.query(query, (err, result) => {
    console.log('err', err);
    console.log('result', result);
});

connection.end(err => {
    if (err) console.log(err)
});