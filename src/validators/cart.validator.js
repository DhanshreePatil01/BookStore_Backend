import Joi from '@hapi/joi';

export const newCartValidator = (req, res, next) => {
  const schema = Joi.object({
    userID : Joi.string().required()
    ,
    books:[
        {
            quantity : Joi.number().min(0),
            price :Joi.number().min(0)
        }
    ],
    cartTotal : Joi.number().min(0),
    
  });
  const { error, value } = schema.validate(req.body);
  
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};