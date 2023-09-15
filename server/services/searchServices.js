import GenomaFavs from "../models/GenomaFavs.js";
import SearchQueries from "../models/SearchQueries.js";
import User from "../models/User.js";
import payloadGen from "../utils/payloadGen.js";

async function getQueries(id) {
  try {
    const queries = await SearchQueries.findAll({ where: { id } });
    return payloadGen(queries[0].queries, "", 200);
  } catch (e) {
    console.error("Error when trying to get the past queries:", e);
    return payloadGen(null, "Error when trying to get the past queries", 500);
  }
}

async function postQuery(userId, query) {
  try {
    const queries = await SearchQueries.findOne({ where: { userId } });
    if (!queries) {
      const newQueries = await SearchQueries.create({ queries: [query] });
      const user = await User.findByPk(userId);
      newQueries.setUser(user);
      return payloadGen(null, "", 204);
    }
    const arrQueriesMutable = queries.queries.slice();
    if (arrQueriesMutable.length >= 10) {
      arrQueriesMutable.shift();
      arrQueriesMutable.push(query);
    } else arrQueriesMutable.push(query);
    queries.queries = arrQueriesMutable;
    await queries.save();
    return payloadGen(queries.queries, "", 200);
  } catch (e) {
    console.error("Error when trying push the query:", e);
    return payloadGen(null, "Error when trying push the query", 500);
  }
}

export default {
  getQueries,
  postQuery,
};
