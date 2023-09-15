import searchServices from "../services/searchServices.js";
async function postQuery(req, res) {
  try {
    const { query } = req.body;
    if(!query) return res.sendStatus(404)
    const data = await searchServices.postQuery(req.user.id, query);
    console.log(data);
    return res.status(data[1]).json(data[0]);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal error" });
  }
}

async function getQueries(req, res) {
  try {
    const data = await searchServices.getQueries(req.user.id);
    return res.status(data[1]).json(data[0]);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ body: "Internal error" });
  }
}

export default { getQueries, postQuery };
