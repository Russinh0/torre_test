import { Op } from "sequelize";
import GenomaFavs from "../models/GenomaFavs.js";
import User from "../models/User.js";
import payloadGen from "../utils/payloadGen.js";

async function addFav(body, userId) {
  try {
    const user = await User.findByPk(userId);
    if (!user)
      return payloadGen(null, "Error trying to find your user...", 500);
    const genFav = await GenomaFavs.create(body);
    user.addGenomaFavs(genFav);
    return payloadGen(null, "Fav added succesfully", 204);
  } catch (error) {
    console.error("Error trying to addFav:", error);
    return payloadGen(null, "Error trying to addFav", 500);
  }
}

async function getFavs(userId, actualPage) {
  let favs;
  try {
    if (!parseInt(actualPage)) {
      favs = await GenomaFavs.findAll(
        { attributes: { include: ["username"] } },
        { where: { userId } }
        );
        return favs.length
          ? payloadGen(favs, "", 201)
          : payloadGen(null, "Not find any fav.", 404);
    } else {
      favs = await GenomaFavs.findAll({
        where: { userId },
        limit: 10,
        offset: ((actualPage || 1) - 1) * 10,
        
      });
      const totalResults = await GenomaFavs.count({
        where: { userId }
      });
      return favs.length
          ? payloadGen({favs,totalResults}, "", 201)
          : payloadGen(null, "Not find any fav.", 404);
    }
  } catch (e) {
    console.error("Error when trying to login:", e);
    return payloadGen(null, "Error when trying to login", 500);
  }
}

async function removeFav(username) {
  try {
    const isDeleted = await GenomaFavs.destroy({ where: { username } });
    return isDeleted
      ? payloadGen(null, "Fav removed succesfully", 200)
      : payloadGen(null, "Fav was already removed", 404);
  } catch (e) {
    console.error("Error when trying to remove a favorite user:", e);
    return payloadGen(null, "Error when trying to remove a favorite user", 500);
  }
}

async function search(searchQuery,actualPage, userId) {
  try {
    const results = await GenomaFavs.findAll({
      where: {
        userId,
        [Op.or]: [
          { name: { [Op.iLike]: `%${searchQuery}%` } },
          { username: { [Op.iLike]: `%${searchQuery}%` } },
        ],
      },
      limit: 10,
      offset: ((actualPage || 1) - 1) * 10
    });
    const totalResults = await GenomaFavs.count({
      where: {
        userId,
        [Op.or]: [
          { name: { [Op.iLike]: `%${searchQuery}%` } },
          { username: { [Op.iLike]: `%${searchQuery}%` } },
        ],
      },
    });
    return results.length
      ? payloadGen({results,totalResults}, "", 200)
      : payloadGen([{results:0,totalResults:0}], "No coincidences", 404);
  } catch (e) {
    console.error("Error when trying to login:", e);
    return payloadGen(null, "Error when trying to login", 500);
  }
}

export default {
  addFav,
  getFavs,
  removeFav,
  search,
};
