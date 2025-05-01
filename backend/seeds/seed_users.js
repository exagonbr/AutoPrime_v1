const bcrypt = require('bcrypt');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del();

  const masterPasswordHash = await bcrypt.hash('masterpassword', 10);
  const professionalPasswordHash = await bcrypt.hash('professionalpassword', 10);

  await knex('users').insert([
    { username: 'master', password: masterPasswordHash, role: 'master' },
    { username: 'professional', password: professionalPasswordHash, role: 'professional' },
  ]);
};
