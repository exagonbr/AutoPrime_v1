const generateDates = (count) => {
  const dates = [];
  const today = new Date();
  for (let i = count - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
};

exports.seed = async function(knex) {
  // Generate last 30 days of data
  const dates = generateDates(30);
  
  // Clear existing entries
  await knex('service_analytics').del();
  await knex('revenue_analytics').del();
  await knex('provider_analytics').del();

  // Seed provider analytics
  const providerAnalytics = dates.map(date => ({
    date,
    total_providers: Math.floor(Math.random() * 20) + 80, // 80-100 range
    active_providers: Math.floor(Math.random() * 15) + 65, // 65-80 range
    online_providers: Math.floor(Math.random() * 10) + 40, // 40-50 range
    busy_providers: Math.floor(Math.random() * 8) + 20,   // 20-28 range
    average_rating: (Math.random() * 1) + 4,  // 4.0-5.0 range
    created_at: knex.fn.now(),
    updated_at: knex.fn.now()
  }));

  // Seed revenue analytics
  const revenueAnalytics = dates.map(date => {
    const totalTransactions = Math.floor(Math.random() * 30) + 50; // 50-80 range
    const completedTransactions = Math.floor(totalTransactions * 0.85); // 85% completion rate
    const cancelledTransactions = totalTransactions - completedTransactions;
    const totalRevenue = (Math.random() * 5000) + 8000; // 8000-13000 range
    const platformFees = totalRevenue * 0.15; // 15% platform fee
    const providerEarnings = totalRevenue - platformFees;

    return {
      date,
      total_revenue: totalRevenue,
      platform_fees: platformFees,
      provider_earnings: providerEarnings,
      total_transactions: totalTransactions,
      completed_transactions: completedTransactions,
      cancelled_transactions: cancelledTransactions,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    };
  });

  // Get service categories for service analytics
  const categories = await knex('service_categories').select('id');
  
  // Seed service analytics
  const serviceAnalytics = dates.flatMap(date => 
    categories.map(category => ({
      date,
      category_id: category.id,
      total_services: Math.floor(Math.random() * 15) + 10, // 10-25 range
      total_revenue: (Math.random() * 2000) + 1000, // 1000-3000 range
      average_service_time: (Math.random() * 60) + 30, // 30-90 minutes
      average_distance: (Math.random() * 10) + 5, // 5-15 km
      average_rating: (Math.random() * 1) + 4, // 4.0-5.0 range
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    }))
  );

  // Insert seed data
  await knex('provider_analytics').insert(providerAnalytics);
  await knex('revenue_analytics').insert(revenueAnalytics);
  await knex('service_analytics').insert(serviceAnalytics);
};
