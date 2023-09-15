import { DataTypes, Model } from "sequelize";
import db from "../db/index.js";

class SearchQueries extends Model {}
SearchQueries.init(
  {
    queries: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  {
    sequelize: db,
    modelName: "searchQueries",
  }
);

export default SearchQueries;
