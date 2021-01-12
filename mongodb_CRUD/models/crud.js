const { uri, options } = require("../config/mongodb").db;
const { MongoClient, ObjectID } = require("mongodb");
const client = new MongoClient(uri, options);

// Establishes connection 
const main = async () => {
    try {
      await client.connect();
      console.log('====> db connected');
    } catch (e) {
      console.error(e);
    }
  };
// Connect to db
  main().catch(console.error);
  
  const collection = client.db().collection("1");

// Gets data from db
  const getAllData = async () => {
    return await collection.find().toArray();
  };

// Gets item from db
const getItem =  async (ident) => {
  const g =  await collection.findOne({"_id": ObjectID(ident)});
  console.log('response getItem', g);
  return g;
};

// Adds data to db
  const appendData =  async (obj) => {
    const a =  await collection.insertOne(obj);
    console.log('response insertOne', a.result);
  };

// Updates data 
const updateData =  async (ident, obj) => {
  const c =  await collection.findOneAndReplace({"_id": ObjectID(ident)}, obj);
  console.log('response updateData', c);
};

// Deletes data 
const deleteData =  async (ident) => {
  const d =  await collection.findOneAndDelete({"_id": ObjectID(ident)});
  console.log('response deleteData', d.result);
};


  process.on("SIGINT", () => {
    client.close();
    process.exit();
});

 
  module.exports = {
    getAllData,
    getItem,
    appendData,
    updateData,
    deleteData
  };
  