const mysql = require('mysql2/promise');

const config = {
    host: '127.0.0.1',
    port: '3306',
    user:'root',
    password:'maranoid',
    database: 'proj1',
};

const info = async () => {
    try {
        const con = await mysql.createConnection(config);
        console.log('connected successfully');

        const [rowsB, fieldsB] = await con.execute(`DROP TABLE IF EXISTS Books`);
        console.log(rowsB);
        const [rowsP, fieldsP] = await con.execute(`DROP TABLE IF EXISTS Pets`);
        console.log(rowsP);
        const [rowsA, fieldsA] = await con.execute(`DROP TABLE IF EXISTS Authors`);
        console.log(rowsA);

        const [rows1, fields1] = await con.execute(`CREATE TABLE Authors (
            ID int UNSIGNED NOT NULL,
            Name VARCHAR(128),
            Country VARCHAR(128),
            PRIMARY KEY (ID)
        )`);
        console.table(rows1);

        let authors = [
            1, "Asimov", "USA",
            2, "Bradbury", "USA",
            3, "Lem", "Poland"
        ];
        let ins_authors= `INSERT INTO Authors (ID, Name, Country) VALUES (?, ?, ?), (?, ?, ?), (?, ?, ?)`;
        const [rows2, fields2] = await con.execute(ins_authors, authors);
        console.table(rows2);

        const [rows3, fields3] = await con.execute(`CREATE TABLE Books (
            BookID int NOT NULL,
            Title VARCHAR(128),
            AuthorID int UNSIGNED,
            Pages int NOT NULL,
            FOREIGN KEY (AuthorID) REFERENCES Authors(ID)
        )`);
        console.table(rows3);
        const [rows4, fields4] = await con.execute(`CREATE TABLE Pets (
            PetID int UNSIGNED,
            PetName VARCHAR(128),
            PetKind VARCHAR(128),
            OwnerID int UNSIGNED,
            FOREIGN KEY (OwnerID) REFERENCES Authors(ID)
        )`);
        console.table(rows4);

        let books = [
            1, "lorem", 3, 335,
            2, "lorem2", 1, 1335,
            3, "lorem3", 1, 1368,
            4, "lorem4", 2, 195,
            5, "lorem5", 3, 95,
            6, "lorem6", 1, 538
        ];
        let ins_books = `INSERT INTO Books (BookID, Title, AuthorID, Pages) VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)`;
        const [rows5, fields5] = await con.execute(ins_books, books);
        console.table(rows5);

        let pets = [
            1, "Rex", "Dog", 1,
            2, "Molly", "Cat", 2,
            3, "Wojciech", "Dog", 3
        ];
        let ins_pets = `INSERT INTO Pets (PetID, PetName, PetKind, OwnerID) VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)`;
        const [rows6, fields6] = await con.execute(ins_pets, pets);
        console.table(rows6);

        con.end();

    } catch (err) {
        console.log('catch error', err);
    }
};

info(); 