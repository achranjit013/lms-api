import UserSchema from "./UserSchema.js";

// create user
export const createUser = (userObj) => {
  return UserSchema(userObj).save();
};

// read user
// get a user by their email
export const getUserByEmail = (email) => {
  return UserSchema.findOne({ email });
};

// get a admin
export const getOneAdmin = (filter) => {
  return UserSchema.findOne(filter);
};

// get all users who are not admin (i.e. students)
// export const getAllStudents = (filter) => {
//   return UserSchema.find(filter);
// };

// update user

// delete user

//update "refreshJWT"
export const updateRefreshJWT = async (email, refreshJWT) => {
  return await UserSchema.findOneAndUpdate({ email }, { refreshJWT });
};
