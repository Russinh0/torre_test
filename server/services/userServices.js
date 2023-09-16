import User from "../models/User.js";
import { generateToken } from "../token/index.js";
import payloadGen from "../utils/payloadGen.js";

async function register(body) {
  try {
    const { username, password } = body;
    username=username.toLowerCase()
    const [_, created] = await User.findOrCreate({
      where: { username },
      defaults: { password },
    });
    return created
      ? payloadGen(null, "User registred succesfully", 200)
      : payloadGen(null, "Username already exists", 404);
  } catch (error) {
    console.error("Error when trying to register:", error);
    payloadGen(null, "Error when trying to register", 500);
  }
}

async function login(username, password) {
  try {
    const user = await User.findOne({
      where: { username },
    });
    if (!user) return payloadGen(null, "This username isn't registered", 401);
    if (!(await user.validatePassword(password))) {
      return payloadGen(null, "Incorrect password.", 401);
    }
    return payloadGen(generateToken(user), "User login succesfully", 201);
  } catch (e) {
    console.error("Error when trying to login:", error);
    return payloadGen(null, "Error when trying to login", 500);
  }
}

export default {
  register,
  login,
};
