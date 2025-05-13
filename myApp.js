require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

var personSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    favoriteFoods: [String],
  },
  { collection: "people" },
);

const PersonModel = mongoose.model("Person", personSchema);

// Función que crea y guarda a una persona de manera asincrónica
// Función corregida para crear y guardar una persona
const createAndSavePerson = (done) => {
  const janeFonda = new PersonModel({
    name: "prueba",
    age: 84,
    favoriteFoods: ["eggs", "fish", "fresh fruit"],
  });

  janeFonda
    .save()
    .then((data) => done(null, data)) // Éxito: llama a done con los datos
    .catch((err) => done(err)); // Error: pasa el error al callback
};

// Función para crear múltiples personas
const createManyPeople = async (arrayOfPeople) => {
  return await PersonModel.create(arrayOfPeople);
};

// Función para buscar personas por nombre
const findPeopleByName = async (personName) => {
  return await PersonModel.find({ name: personName }).exec();
};

// Función para buscar por comida favorita
const findOneByFood = async (food) => {
  return await PersonModel.findOne({ favoriteFoods: food }).exec();
};

// Función para buscar persona por ID
const findPersonById = async (personId) => {
  return await PersonModel.findById(personId).exec();
};

// Función para buscar, editar y guardar
const findEditThenSave = async (personId) => {
  const foodToAdd = "hamburger";
  const person = await PersonModel.findById(personId).exec();
  person.favoriteFoods.push(foodToAdd);
  return await person.save();
};

// Función para buscar y actualizar
const findAndUpdate = async (personName) => {
  const ageToSet = 20;
  return await PersonModel.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
  ).exec();
};

// Función para eliminar por ID
const removeById = async (personId) => {
  return await PersonModel.findByIdAndRemove(personId).exec();
};

// Función para eliminar múltiples personas
const removeManyPeople = async () => {
  const nameToRemove = "Mary";
  return await PersonModel.deleteMany({ name: nameToRemove }).exec();
};

// Función para cadena de consultas
const queryChain = async () => {
  const foodToSearch = "burrito";
  return await PersonModel.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec();
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------
exports.PersonModel = PersonModel;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
