import Joi from "joi";

const SHORTSTR = Joi.string().max(100);
const SHORTSTRREQ = Joi.string().max(100).required();
const LONGSTRREQ = Joi.string().max(5000).required();
const SHORTNUMREQ = Joi.number().required();
const EMAILSTRREQ = Joi.string().email({ minDomainSegments: 2 }).required();
const BOOLTRUE = Joi.boolean();

export const newUserValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      fname: SHORTSTRREQ,
      lname: SHORTSTRREQ,
      phone: SHORTSTR.allow("", null),
      email: EMAILSTRREQ,
      password: SHORTSTRREQ,
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.json({
        status: "error",
        message: error.message,
      });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};
