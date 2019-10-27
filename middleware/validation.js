const Joi = require('@hapi/joi');

const validation = (schema) => { 
  return (req, res, next) => { 
    console.log(schema);
    const { error } = schema.validate(req.body); 
    const valid = error == null; 

    if (valid) { 
      next(); 
    } else { 
      const { details } = error; 
      const message = details.map(i => i.message).join(',');

      console.log("error", message); 
     	res.status(422).json({ error: message })
     } 
  } 
}

module.exports = validation;