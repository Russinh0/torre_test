import { DataTypes, Model } from "sequelize";
import db from "../db/index.js";

class GenomaFavs extends Model {}
GenomaFavs.init(
  {
    publicId: {
      type: DataTypes.STRING,
      allowNull:false
    },
  },
  {
    sequelize: db,
    modelName: "genomaFavs",
  }
);

export default GenomaFavs;
