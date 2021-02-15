// конфигурация базы данных
module.exports = {
  uri: 'mongodb://localhost:27017/sessions',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
};
