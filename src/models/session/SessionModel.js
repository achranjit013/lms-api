import SessionSchema from "./SessionSchema.js";

// create
export const createSession = (obj) => {
  return SessionSchema(obj).save();
};

// get
export const getSession = (filter) => {
  return SessionSchema.findOne(filter);
};

// delete
export const deleteSession = (filter) => {
  return SessionSchema.findOneAndDelete(filter);
};
