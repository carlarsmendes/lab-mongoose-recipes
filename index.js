const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp',{
  useNewUrlParser:true
})
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  
  // const Recipe = mongoose.model('Recipe', recipeSchema);
  // module.exports = Recipe

  // Delete all recipes to clean the collection and avoid "unique" problems
Recipe.deleteMany()
.then(() => {
 Recipe.create({ 
  title: "Chicken Teryaki" ,
  cuisine: 'Japanese'}, function (err, recipe) {
    if (err) {
        console.log('An error happened:', err);
    } else {
        console.log('The recipe is saved and is: ', recipe);
    }
  })
  .then(recipeCreated => {
    console.log('Iteration 2', recipeCreated.title)
  }) 

  // const chickenTeryaki = new Recipe () 
 
     //----Iteration 3: InsertMany recipes---
  Recipe.insertMany(data)
  .then(createdRecipes => { 
    console.log('Iteration 3')
        for (let i = 0; i < createdRecipes.length; i++) {
          console.log(i, createdRecipes[i].title)
        }})

   //----Iteration 4: Update Recipe---
  Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
  .then(recipe => { console.log("yey!we updated our Rigatoni!!!", recipe) 
})

      //----Iteration 5: Delete Recipe---
  Recipe.deleteOne({ title: "Carrot Cake"})
  .then(recipe => { console.log("yey!we deleted our Cake!!!", recipe) })
})


//----Iteration 6: Close the Database----
//----But only do it when everything is already finished----
setTimeout(() => {
  // Iteration 6
  mongoose.disconnect()
}, 2000)
