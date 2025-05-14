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
const createAndSavePerson = async (done) => {
  const janeFonda = new PersonModel({
    name: "prueba",
    age: 84,
    favoriteFoods: ["eggs", "fish", "fresh fruit"],
  });

  try {
    const data = await janeFonda.save();
    done(null, data); // Éxito
  } catch (err) {
    done(err); // Error
  }
};

// Función para crear múltiples personas
const createManyPeople = (arrayOfPeople, done) => {
  PersonModel.create(arrayOfPeople, (err, data) => {
    if (err) return done(err);
    return done(null, data);
  });
};

// Función para buscar personas por nombre
const findPeopleByName = (personName, done) => {
  PersonModel.find({ name: personName }, (err, data) => {
    if (err) return done(err);
    return done(null, data);
  });
};

// Función para buscar por comida favorita
const findOneByFood = (food, done) => {
  PersonModel.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return done(err);
    return done(null, data);
  });
};
// Función para buscar persona por ID
const findPersonById = (personId, done) => {
  PersonModel.findById(personId, (err, data) => {
    if (err) return done(err);
    return done(null, data);
  });
};

// Función para buscar, editar y guardar
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  PersonModel.findById(personId, (err, person) => {
    if (err) return done(err);

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    });
  });
};
// Función para buscar y actualizar
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  PersonModel.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    },
  );
};

// Función para eliminar por ID
const removeById = (personId, done) => {
  PersonModel.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) return done(err);
    done(null, removedPerson);
  });
};

// Función para eliminar múltiples personas
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  PersonModel.deleteMany({ name: nameToRemove })
    .then((result) => {
      const response = {
        n: result.deletedCount,
        ok: result.acknowledged ? 1 : 0,
      };
      done(null, response);
    })
    .catch((err) => done(err));
};

// Función para cadena de consultas
const queryChain = (done) => {
  const foodToSearch = "burrito";

  PersonModel.find({ favoriteFoods: foodToSearch })
    .sort("name")
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      if (err) return done(err);
      done(null, data);
    });
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
