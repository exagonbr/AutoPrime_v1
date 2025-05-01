exports.up = function(knex) {
  return knex.schema.createTable('service_plans', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('description');
    table.decimal('monthly_fee', 10, 2);
    table.decimal('commission_rate', 5, 2); // percentage
    table.integer('max_active_providers').defaultTo(1);
    table.boolean('is_active').defaultTo(true);
    table.json('features'); // Store additional plan features as JSON
    table.timestamps(true, true);
  })
  .createTable('service_categories', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('description');
    table.decimal('base_price', 10, 2);
    table.decimal('price_per_km', 10, 2);
    table.decimal('price_per_hour', 10, 2);
    table.boolean('is_active').defaultTo(true);
    table.timestamps(true, true);
  })
  .createTable('provider_plans', function(table) {
    table.increments('id').primary();
    table.integer('provider_id').references('id').inTable('service_providers').onDelete('CASCADE');
    table.integer('plan_id').references('id').inTable('service_plans').onDelete('CASCADE');
    table.date('start_date').notNullable();
    table.date('end_date');
    table.string('status').defaultTo('active'); // active, cancelled, expired
    table.decimal('price_paid', 10, 2);
    table.timestamps(true, true);
  })
  .createTable('service_transactions', function(table) {
    table.increments('id').primary();
    table.integer('provider_id').references('id').inTable('service_providers').onDelete('CASCADE');
    table.integer('category_id').references('id').inTable('service_categories');
    table.decimal('base_amount', 10, 2);
    table.decimal('distance_fee', 10, 2);
    table.decimal('time_fee', 10, 2);
    table.decimal('total_amount', 10, 2);
    table.decimal('platform_fee', 10, 2);
    table.decimal('provider_earnings', 10, 2);
    table.string('status'); // pending, completed, cancelled
    table.json('service_details');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('service_transactions')
    .dropTable('provider_plans')
    .dropTable('service_categories')
    .dropTable('service_plans');
};
