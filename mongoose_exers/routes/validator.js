const Ajv = require('ajv');

const schema = {
  type: "object",
  properties: {
    height: {
      type: "string",
      "minLength": 1,
      "maxLength": 3,
      "pattern": "^[0-9]+$"
    },
    weight: {
      type: "string",
      "minLength": 1,
      "maxLength": 3,
      "pattern": "^[0-9]+$"
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