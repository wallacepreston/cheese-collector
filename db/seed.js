const db = require('./index');
const {Cheese, Board} = db;

const cheeseData = [
  {
    title: 'Roquefort',
    description: "The blue pockets of mold that dot a chunk of Roquefort are colonies of the mold Penicillium roquefort, found naturally in the caves of Roquefort, France.",
  },
  {
    title: 'Camembert',
    description: "As one of the most widely produced French cheeses, it is one of the best.",
  },
  {
    title: 'Chevre',
    description: "The French word chèvre literally translate to 'goat,' and is used to refer to any cheese made from goat's milk.",
  },
  {
    title: 'Feta',
    description: "Feta is one of the many cheese worldwide to be a protected designation of origin product, meaning that a cheese may only bear the label 'feta' in the E.U.",
  },
  {
    title: 'Mozzarella',
    description: "Mozzarella is a fresh, pulled-curd cheese made from the milk of water buffalo (for mozzarella di bufala) or cows (for mozzarella fior di latte). The curds are heated in warm water and stretched by hand before being rolled into moist balls. ",
  },
  {
    title: 'Cheddar',
    description: "Cheddar is a cow's milk cheese that originated in Somerset, England. Cheddar is not only a noun, but it's also a verb; 'to cheddar' refers to a cheesemaking process whereby the curds of the cow's milk are cooked and then milled into rice-size pieces.",
  },
];
const boardData = [
  {
    type: 'French',
    description: "Of course, French cheese is the best.",
    rating: 5,
  },
  {
    type: 'American',
    description: "All-American, all the time.",
    rating: 3,
  },
  {
    type: 'Mix',
    description: "Mixed bags are fun!",
    rating: 4,
  },
];


async function seed() {
  await db.sync({force: true});
  console.log('db synced!');

  // Populate data
  for (const board of boardData) {
    await Board.create(board);
  }
  console.log(`seeded ${boardData.length} boards`);

  for (const cheese of cheeseData) {
    await Cheese.create(cheese);
  }
  console.log(`seeded ${cheeseData.length} cheeses`);
  
  // Associate data
  const frenchCheeses = await Promise.all(['Roquefort', 'Camembert', 'Chevre'].map(cheeseTitle => Cheese.findOne({where: {title: cheeseTitle}})));
  const frenchBoard = await Board.findOne({where: { type: 'French'}});
  for (const cheese of frenchCheeses) {
    await frenchBoard.addCheese(cheese);
  }  
  console.log(`added ${frenchCheeses.length} cheeses to French cheese board`);

  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes
module.exports = seed;
