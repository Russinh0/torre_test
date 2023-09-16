import genomeFavsServices from "../services/genomeFavsServices.js";
async function addFav(req, res) {
  try {
    const data = await genomeFavsServices.addFav(req.body, req.user.id);
    return res.status(data[1]).json(data[0]);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal error" });
  }
}

async function getFavs(req, res) {
  try {
    const { actualPage } = req.params;
    const data = await genomeFavsServices.getFavs(req.user.id, actualPage);
    return res.status(data[1]).json(data[0]);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal error" });
  }
}

async function removeFav(req, res) {
  try {
    const data = await genomeFavsServices.removeFav(req.params.username);
    return res.status(data[1]).json(data[0]);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal error" });
  }
}

async function search(req,res){
  try{
    const data = await genomeFavsServices.search(req.body.searchQuery,req.params.actualPage,req.user.id);
    return res.status(data[1]).json(data[0]);
  }
  catch(e){
    console.error(e);
    return res.status(500).json({ message: "Internal error" });
  }
}

export default { addFav, getFavs, removeFav, search };
