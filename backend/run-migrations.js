const path = require('path');
const knex = require('knex');
const config = require('./knexfile');

// Modify the migrations directory path to be relative to backend folder
const modifiedConfig = {
  ...config.development,
  migrations: {
    directory: path.join(__dirname, 'migrations')
  }
};

const db = knex(modifiedConfig);

async function runMigrations() {
  try {
    await db.migrate.latest();
    console.log('Migrations completed successfully');
    process.exit(0);
  } catch (err) {
    console.error('Error running migrations:', err);
    process.exit(1);
  }
}

runMigrations();
