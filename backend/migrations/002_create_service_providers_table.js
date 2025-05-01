exports.up = function(knex) {
  return knex.schema.createTable('service_providers', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').unique().notNullable();
    table.string('phone').notNullable();
    table.string('document_number').unique().notNullable(); // CPF/CNPJ
    table.string('vehicle_info');
    table.string('specialties');
    table.decimal('rating', 2, 1).defaultTo(5.0);
    table.boolean('is_active').defaultTo(true);
    table.decimal('latitude', 10, 8);
    table.decimal('longitude', 11, 8);
    table.string('current_status').defaultTo('offline'); // online, offline, busy
    table.decimal('base_price', 10, 2);
    table.decimal('price_per_km', 10, 2);
    table.decimal('price_per_hour', 10, 2);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('service_providers');
};
