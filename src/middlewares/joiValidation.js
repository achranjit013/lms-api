import Joi from "joi";

const SHORTSTR = Joi.string().max(100);
const SHORTSTRREQ = SHORTSTR.required();
const LONGSTR = Joi.string().max(5000);
const LONGSTRREQ = LONGSTR.required();
const SHORTNUM = Joi.number();
const SHORTNUMREQ = SHORTNUM.required();
const EMAILSTR = Joi.string().email({ minDomainSegments: 2 });
const EMAILSTRREQ = EMAILSTR.required();
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

export const userLoginValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      email: EMAILSTRREQ,
      password: SHORTSTRREQ,
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.json({
        status: error,
        message: error.message,
      });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};
