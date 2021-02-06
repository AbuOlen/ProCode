const path = require('path');
const mongoose = require("mongoose");
const { Schema } = mongoose;

const { ObjectId } = require('mongodb');

const generalSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      minLength: 1,
      maxLength: 255,
    },
    surname: {
      type: Schema.Types.String,
      required: true,
      minLength: 1,
      maxLength: 255,
    },
    login: {
      type: Schema.Types.String,
      required: true,
      unique: true,
      minLength: 5,
      maxLength: 15,
    },
    auth: {
      type: Schema.Types.String,
      required: true,
      unique: true,
      minLength: 1,
      maxLength: 512,
    },
    email: {
        type: Schema.Types.String,
        required: false,
        minLength: 5,
        maxLength: 50,
      },
    phone: {
        type: Schema.Types.String,
        required: true,
      },
    birthday: {
      type: Schema.Types.Date,
      required: true,
    },
    sex: {
      type: Schema.Types.String,
      enum: ["Male", "Female"],
      required: true,
    },
    parameters: {
      height: {
        type: Schema.Types.Number,
        required: false,
        minLength: 1,
        maxLength: 15,
      },
      weight: {
        type: Schema.Types.Number,
        required: false,
        minLength: 1,
        maxLength: 15,
      },
      fill_date: {
        type: Schema.Types.Date,
        default: Date.now,
        required: false,
      },
    },
    subjects: { 
    mathematics: [
      {
      mark: {
          type: Schema.Types.Number,
          required: false,
          min: 1,
          max: 12,
        },
      fill_date: {
        type: Schema.Types.Date,
        default: Date.now,
        required: false,
        },
      }
    ],
    literature: [
      {
      mark: {
          type: Schema.Types.Number,
          required: false,
          min: 1,
          max: 12,
        },
      fill_date: {
        type: Schema.Types.Date,
        default: Date.now,
        required: false,
        },
      }
    ],
  },
    address: {
      zip: {
        type: Schema.Types.String,
        required: true,
        minLength: 1,
        maxLength: 15,
      },
      country: {
        type: Schema.Types.String,
        required: true,
        minLength: 1,
        maxLength: 15,
      },
      city: {
        type: Schema.Types.String,
        required: true,
        minLength: 1,
        maxLength: 100,
      },
      street: {
        type: Schema.Types.String,
        required: true,
        minLength: 0,
        maxLength: 255,
      },
      bilding: {
        type: Schema.Types.String,
        required: true,
        minLength: 1,
        maxLength: 256,
      },
      apartment: {
        type: Schema.Types.String,
        required: true,
        minLength: 1,
        maxLength: 256,
      },
    },
  },
  { timestamps: true }
);


// generalSchema.statics.findUserNameByLogin = function(login, callback) {
//   const userData =  this.findOne({ login: login }); 
//   userData.exec(function (err, data) {
//     if (err) throw err;
//     return callback(data.name);
//   });
//  };

 generalSchema.statics.findUserNameByLogin = async function(login) {
  const userData =  await this.findOne({ 'login': login }).exec();
    console.log(userData.name);
    return (userData.name);
  
 };

//  generalSchema.statics.findAllUsersByCity = async function(city, cb) {
//   const userData =  await this.find({})
//   .where ('address.city', city)
//   .exec(cb);
//  };

//  generalSchema.statics.findAllUsersByCity = async function(city, cb) {
//   const userData =  await this.find({'address.city': city})
//   .exec(cb);
//  };

 generalSchema.statics.findUserById = async function(id) {
  let userData = await this.findById(id);
  return userData;
 };

 generalSchema.methods.getNameCity = function() {
  return `${this.name}(${this.address.city})`;
 },

 generalSchema.statics.findUsersFromThisCity = async function(id) {
  const oneUser = await this.findUserById(id);
  const users = await this.find({'address.city': oneUser.address.city});
  console.log(users);
  return users.map(el => el.getNameCity());
 };



 




 generalSchema.methods.getNSurname = async function() {

  return `$(this.name.charAt(0)). ${this.surname}`;
 }






// generalSchema.methods.findUsersFromThisCity = async function(cb) {
//    return await this.model('users')
//    .where ('address.city', this.address.city)
//   //  .where('_id').ne(this._id)
//    .exec(cb)
//  };




const modelname = path.basename(__filename, '.js'); // Название модели совпадает с названием файла модели. Тут мы получаем имя файла без расширения .js
const model = mongoose.model(modelname, generalSchema); // собственно создаем модель
module.exports = model;