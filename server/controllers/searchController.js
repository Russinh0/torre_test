import searchServices from "../services/searchServices.js";
async function postQuery(req, res) {
  try {
    const { userId, query } = req.body;
    const data = await searchServices.postQuery(userId, query);
    console.log(data);
    return res.status(data[1]).json(data[0]);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal error" });
  }
}

async function getQueries(req, res) {
  try {
    const data = await searchServices.getQueries(req.body.userId);
    return res.status(data[1]).json(data[0]);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ body: "Internal error" });
  }
}

export default { getQueries, postQuery };
