// const { uri, options } = require("../config/db");
// const { MongoClient, ObjectID } = require("mongodb");
// const client = new MongoClient(uri, options);


// Establishes connection 
// const main = async () => {
//   try {
//     await client.connect();
//     console.log("db connected");
//   } catch (e) {
//     console.error(e);
//   }
// };

// Connect to db
// main().catch(console.error);

// const collection = client.db().collection("users");

//Gets user from db
// const getUser =  async (ident) => {
//   const user =  await collection.findOne({"_id": ObjectID(ident)});
//   console.log('response getUser', user);
//   return user;
// };

// Gets user from db
// const getUserByLogin =  async (login) => {
//   const user =  await collection.findOne({"login": login});
//   console.log('response getUserByLogin', user);
//   return user;
// };

// process.on("SIGINT", () => {
//     client.close();
//     process.exit();
// });

// module.exports = { getUserByLogin, getUser };
