const path = require('path');
const knex = require('knex');
const config = require('./knexfile');

// Modify the seeds directory path to be relative to backend folder
const modifiedConfig = {
  ...config.development,
  seeds: {
    directory: path.join(__dirname, 'seeds')
  }
};

const db = knex(modifiedConfig);

async function runSeeds() {
  try {
    await db.seed.run();
    console.log('Seeds completed successfully');
    process.exit(0);
  } catch (err) {
    console.error('Error running seeds:', err);
    process.exit(1);
  }
}

runSeeds();
