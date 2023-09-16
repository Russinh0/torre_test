import { DataTypes, Model } from "sequelize";
import db from "../db/index.js";

class GenomaFavs extends Model {}
GenomaFavs.init(
  {
    ardaId: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    name:{
      type:DataTypes.STRING,
      allowNull:false
    },
    imageUrl:{
      type:DataTypes.STRING
    },
    professionalHeadline:{
      type:DataTypes.STRING
    }
  },
  {
    sequelize: db,
    modelName: "genomaFavs",
    timestamps:false
  }
);

export default GenomaFavs;
