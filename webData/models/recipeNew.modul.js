const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  recipeName : {
      type: String,
      require : true
  },
  ingredients : {
      type : String,
      require : true
  },
  instructions: {
    type : String,
    require : true
},
 url:{
    type : String,
    require : true
  },
  img:{
    type : String
    // type : Buffer
  },
  like :{
    type :Number,
    default:0
  }
})

const recipeNewModel = mongoose.model('recipesNew' ,recipeSchema)

module.exports = {
  recipeNewModel
}
