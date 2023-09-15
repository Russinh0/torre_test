import GenomaFavs from "../models/GenomaFavs.js";
import User from "../models/User.js";
import payloadGen from "../utils/payloadGen.js";

async function addFav(body, userId) {
  try {
    const user = await User.findByPk(userId);
    if (!user)
      return payloadGen(null, "Error trying to find your user...", 500);
    const genFav = await GenomaFavs.create({ publicId: body });
    user.addGenomaFavs(genFav);
    return payloadGen(null, "Fav added succesfully", 204);
  } catch (error) {
    console.error("Error when trying to register:", error);
    payloadGen(null, "Error when trying to register", 500);
  }
}

async function getFavs(id, actualPage) {
  try {
    const favs = await GenomaFavs.findAll({
      where: { userId: id },
      limit: 10,
      offset: (actualPage - 1) * 10,
    });
    return favs[0]
      ? payloadGen(favs, "", 201)
      : payloadGen(null, "Not find any fav.", 404);
  } catch (e) {
    console.error("Error when trying to login:", e);
    return payloadGen(null, "Error when trying to login", 500);
  }
}

async function removeFav(id) {
  try {
    const isDeleted = await GenomaFavs.destroy({ where: { id } });
    return isDeleted
      ? payloadGen(null, "Fav removed succesfully", 200)
      : payloadGen(null, "Fav was already removed", 404);
  } catch (e) {
    console.error("Error when trying to login:", e);
    return payloadGen(null, "Error when trying to login", 500);
  }
}

export default {
  addFav,
  getFavs,
  removeFav,
};
