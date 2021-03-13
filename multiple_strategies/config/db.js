// конфигурация базы данных
module.exports = {
  uri: 'mongodb://localhost:27017/authorization',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
    useCreateIndex: true
  },
};
