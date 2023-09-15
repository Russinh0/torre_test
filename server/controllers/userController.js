import userServices from "../services/userServices.js";
async function register(req, res) {
  try {
    const data = await userServices.register(req.body);
    console.log(data);
    return res.status(data[1]).json(data[0]);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal error" });
  }
}

async function login(req, res) {
  try {
    const data = await userServices.login(req.body);
    return res.status(data[1]).json(data[0]);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ body: "Internal error" });
  }
}

export default { login, register };
