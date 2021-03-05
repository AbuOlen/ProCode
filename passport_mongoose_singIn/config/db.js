// конфигурация базы данных
module.exports = {
  uri: 'mongodb://localhost:27017/school_passport',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
};
