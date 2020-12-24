const mysql = require('mysql2/promise');

const config = {
    host: '127.0.0.1',
    port: '3306',
    user:'root',
    password:'maranoid',
    database: 'proj1',
};

const library = async () => {
    try {
        const con = await mysql.createConnection(config);
        console.log('connected successfully');

        const [rows0, fields0] = await con.execute(`DROP TABLE IF EXISTS Books`);
        console.log(rows0);

        const [rows, fields] = await con.execute(`CREATE TABLE Books (
            BookID int NOT NULL,
            NameBook VARCHAR(128),
            AuthorID int UNSIGNED,
            Pages int NOT NULL
        )`);
        console.table(rows);

        let arr_data = [
            1, "lorem", 3, 335,
            2, "lorem2", 4, 1335,
            3, "lorem3", 4, 1368,
            4, "lorem4", 2, 195,
            5, "lorem5", 1, 95,
            6, "lorem6", 4, 538
        ];
        let ins_data = `INSERT INTO Books (BookID, NameBook, AuthorID, Pages) VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)`;
        const [rows2, fields2] = await con.execute(ins_data, arr_data);
        console.table(rows2);

        let read_book = `SELECT * FROM Books WHERE (Pages > 400)`;
        const [rows3, fields3] = await con.execute(read_book);
        console.table(rows3);

        let upd_pages = `UPDATE Books SET Pages = 800 WHERE (BookID = 1)`;
        const [rows4, fields4] = await con.execute(upd_pages);
        console.table(rows4);
        
        let del_book = `DELETE FROM Books WHERE (BookID = 2)`;
        const [rows5, fields5] = await con.execute(del_book);
        console.table(rows5);
        con.end();

    } catch (err) {
        console.log('catch error', err);
    }
};

library(); 


















                // приклад

// const myquery1 = async () => {
//     try {
//         const con = await mysql.createConnection(config);
//         console.log('connected successfully');

//         const [rows, fields] = await con.query(query);
//         console.log(rows);
//         console.log(fields);

//         const [rows2, fields2] = await con.query(query2);
//         console.log(rows2);
//         console.log(fields2);

     //----------------- 2 variant---------
        // await con.query(query, (result) => {
        //     console.log('result', result);
        // });
        // const res1 = await con.query(query);
        // console.log(res1);
        // console.log(rows);
        // console.log(fields);
       
        // await con.query(query2, (result) => {
        //     console.log('result', result);
        // }) 
    //----------------------
