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

const query = `CREATE TABLE Articles (
    ArticleID int NOT NULL,
    Content VARCHAR(1024),
    UserID int UNSIGNED,
    PRIMARY KEY (ArticleID),
    FOREIGN KEY (UserID) REFERENCES user(id)
)`;

connection.query(query, (err, result) => {
    console.log('err', err);
    console.log('result', result);
});

var art_query = "INSERT INTO Articles (ArticleID, Content, UserID) VALUES ?";
var values = [
    [1, "Lorem", 2],
    [2, "Lorem lorem", 4],
    [3, "Lorem lorem lorem", 5],
];

connection.query(art_query, [values], (err, result) => {
    console.log('err', err);
    console.log('result', result);
});

connection.end(err => {
    if (err) console.log(err)
});