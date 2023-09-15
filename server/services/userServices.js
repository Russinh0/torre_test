import User from "../models/User.js";
import payloadGen from "../utils/payloadGen.js";

async function register(body) {
  try {
    const { username, password } = body;
    console.log(username, password);
    const [_, created] = await User.findOrCreate({
      where: { username },
      defaults: { password },
    });
    console.log(created);
    return created
      ? payloadGen(null, "User registred succesfully", 204)
      : payloadGen(null, "Username already exists", 404);
  } catch (error) {
    console.error("Error when trying to register:", error);
    payloadGen(null, "Error when trying to register", 500);
  }
}

async function login(body) {
  try {
    const { username, password } = body;
    const user = await User.findOne({
      where: { username },
    });
    return user
      ? payloadGen(null, "User login succesfully", 201)
      : payloadGen(null, "This username isn't registered", 401);
  } catch (e) {
    console.error("Error when trying to login:", error);
    return payloadGen(null, "Error when trying to login", 500);
  }
}

export default {
  register,
  login,
};
