import genomeFavsServices from "../services/genomeFavsServices.js";
async function addFav(req, res) {
  try {
    const data = await genomeFavsServices.addFav(req.body, req.user.id);
    console.log(data,'controller')
    return res.status(data[1]).json(data[0]);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal error" });
  }
}

async function getFavs(req, res) {
  try {
    const { actualPage } = req.body;
    const data = await genomeFavsServices.getFavs(req.user.id, actualPage);
    return res.status(data[1]).json(data[0]);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal error" });
  }
}

async function removeFav(req, res) {
  try {
    const data = await genomeFavsServices.removeFav(req.params.ardaId);
    return res.status(data[1]).json(data[0]);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal error" });
  }
}

export default { addFav, getFavs, removeFav };
