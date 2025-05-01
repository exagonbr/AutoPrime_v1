const express = require('express');
const router = express.Router();
const knexConfig = require('../knexfile').development;
const knex = require('knex')(knexConfig);

// Get dashboard analytics data
router.get('/dashboard/analytics', async (req, res) => {
  try {
    // Get revenue analytics for the last 30 days
    const revenue = await knex('revenue_analytics')
      .orderBy('date', 'desc')
      .limit(30);

    // Get latest provider analytics
    const providers = await knex('provider_analytics')
      .orderBy('date', 'desc')
      .first();

    // Get service analytics grouped by category
    const services = await knex('service_analytics as sa')
      .join('service_categories as sc', 'sa.category_id', 'sc.id')
      .select(
        'sc.name',
        knex.raw('SUM(sa.total_services) as total_services'),
        knex.raw('SUM(sa.total_revenue) as total_revenue'),
        knex.raw('AVG(sa.average_service_time) as average_service_time'),
        knex.raw('AVG(sa.average_distance) as average_distance'),
        knex.raw('AVG(sa.average_rating) as average_rating')
      )
      .where('sa.date', '>=', knex.raw('CURRENT_DATE - INTERVAL \'30 days\''))
      .groupBy('sc.id', 'sc.name');

    res.json({
      revenue: revenue.reverse(), // Send in chronological order
      providers,
      services
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get dashboard stats
router.get('/dashboard/stats', async (req, res) => {
  try {
    // Get current month's data
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    const [providerStats, transactionStats] = await Promise.all([
      // Get provider statistics
      knex('service_providers')
        .select(
          knex.raw('COUNT(*) as total_providers'),
          knex.raw('COUNT(CASE WHEN is_active = true THEN 1 END) as active_providers')
        )
        .first(),

      // Get transaction statistics for current month
      knex('service_transactions')
        .where('created_at', '>=', firstDayOfMonth)
        .select(
          knex.raw('COUNT(*) as total_transactions'),
          knex.raw('SUM(total_amount) as monthly_revenue')
        )
        .first()
    ]);

    res.json({
      totalProviders: providerStats.total_providers,
      activeProviders: providerStats.active_providers,
      totalTransactions: transactionStats.total_transactions || 0,
      monthlyRevenue: transactionStats.monthly_revenue || 0
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
