exports.up = function(knex) {
  return knex.schema
    .createTable('provider_analytics', function(table) {
      table.increments('id').primary();
      table.date('date').notNullable();
      table.integer('total_providers').notNullable();
      table.integer('active_providers').notNullable();
      table.integer('online_providers').notNullable();
      table.integer('busy_providers').notNullable();
      table.decimal('average_rating', 2, 1);
      table.timestamps(true, true);
    })
    .createTable('revenue_analytics', function(table) {
      table.increments('id').primary();
      table.date('date').notNullable();
      table.decimal('total_revenue', 12, 2).notNullable();
      table.decimal('platform_fees', 12, 2).notNullable();
      table.decimal('provider_earnings', 12, 2).notNullable();
      table.integer('total_transactions').notNullable();
      table.integer('completed_transactions').notNullable();
      table.integer('cancelled_transactions').notNullable();
      table.timestamps(true, true);
    })
    .createTable('service_analytics', function(table) {
      table.increments('id').primary();
      table.date('date').notNullable();
      table.integer('category_id').references('id').inTable('service_categories');
      table.integer('total_services').notNullable();
      table.decimal('total_revenue', 12, 2).notNullable();
      table.decimal('average_service_time', 8, 2); // in minutes
      table.decimal('average_distance', 8, 2); // in km
      table.decimal('average_rating', 2, 1);
      table.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('service_analytics')
    .dropTable('revenue_analytics')
    .dropTable('provider_analytics');
};
