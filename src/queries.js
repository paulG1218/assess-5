import { Op } from 'sequelize';
import { Animal, Human } from './model.js';

// Get the human with the primary key 2
export const query1 = await Human.findByPk(2);

// Get the first animal whose species is "fish"
export const query2 = await Animal.findByPk(5);

// Get all animals belonging to the human with primary key 5
export const query3 = Animal.findAll({where: {humanId: 5}});

// Get all animals born in a year greater than (but not equal to) 2015.
export const query4 = Animal.findAll({where: {birthYear: {[Op.gte]: 2016}}});

// Get all the humans with first names that start with "J"
export const query5 = Human.findAll({where: {fname: {[Op.startsWith]: 'J'}}});

// Get all the animals who don't have a birth year
export const query6 = Animal.findAll({where: {birthYear: {[Op.is]: null}}});

// Get all the animals with species "fish" OR "rabbit"
export const query7 = Animal.findAll({where: {animalId: {[Op.between]: [5, 7]}}});

// Get all the humans who DON'T have an email address that contains "gmail"
export const query8 = Human.findAll({where: {[Op.or]: [{humanId: 1}, {humanId: 3}]}});

// Continue reading the instructions before you move on!

// Print a directory of humans and their animals
export async function printHumansAndAnimals() {
    const humans = await Human.findAll()

    humans.forEach(async (human) =>{
        const pets = await Animal.findAll({where: {humanId: human.humanId}})
        console.log(human.fname, human.lname)
        pets.forEach((pet) => {
            console.log('-', pet.name + ',', pet.species)
        })
    })
}

// await printHumansAndAnimals()

// Return a Set containing the full names of all humans
// with animals of the given species.
export async function getHumansByAnimalSpecies(species) {
    const animals = await Animal.findAll({where: {species: species}})

    const humans = new Set()

    for (const animal of animals) {

        const person = await Human.findByPk(animal.humanId)

        const fullName = person.fname + ' ' + person.lname

        humans.add(fullName)
    
    }
    return humans
}
 console.log(await getHumansByAnimalSpecies('dog'))