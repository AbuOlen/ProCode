const Ajv = require('ajv');

const schema = {
  type: "object",
  properties: {
  name: {
      type: "string",
      "minLength": 1,
      "maxLength": 255,
      "pattern": "^[a-zA-Z]+$"
    },
  surname: {
      type: "string",
      "minLength": 1,
      "maxLength": 255,
      "pattern": "^[a-zA-Z]+$"
    },
    login: {
      type: "string",
      "minLength": 5,
      "maxLength": 15,
      "pattern": "^[0-9a-zA-Z]+$"
    },
    auth: {
      type: "string",
      "minLength": 1,
      "maxLength": 512,
      "pattern": "^[0-9a-zA-Z]+$"
    },
  },
};

const validator = (req, res, next) => {
    
    const ajv = new Ajv({ allErrors: true });
    
      const valid = ajv.validate(schema, req.body);
      console.log(req.body);

      if (!valid) {
        res.send(ajv.errors);
        
        return;
      }
      next();
   
  };
  
 
  module.exports = validator;