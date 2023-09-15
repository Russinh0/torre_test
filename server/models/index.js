import User from './User.js'
import GenomaFavs from './GenomaFavs.js'
import SearchQueries from './SearchQueries.js'
User.hasOne(SearchQueries)
SearchQueries.belongsTo(User)

User.hasMany(GenomaFavs)
GenomaFavs.belongsTo(User)

export default {User,GenomaFavs,SearchQueries}