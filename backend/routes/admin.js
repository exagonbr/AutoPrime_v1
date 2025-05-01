const express = require('express');
const router = express.Router();

// Dashboard Stats
router.get('/dashboard/stats', async (req, res) => {
  try {
    const stats = {
      totalProviders: await req.db('service_providers').count('* as count').first(),
      activeProviders: await req.db('service_providers').where('is_active', true).count('* as count').first(),
      totalTransactions: await req.db('service_transactions').count('* as count').first(),
      monthlyRevenue: await req.db('service_transactions')
        .where('created_at', '>=', req.db.raw('DATE_TRUNC(\'month\', CURRENT_DATE)'))
        .sum('platform_fee as total')
        .first()
    };

    res.json({
      totalProviders: parseInt(stats.totalProviders.count),
      activeProviders: parseInt(stats.activeProviders.count),
      totalTransactions: parseInt(stats.totalTransactions.count),
      monthlyRevenue: parseFloat(stats.monthlyRevenue.total || 0)
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Providers Management
router.get('/providers', async (req, res) => {
  try {
    const providers = await req.db('service_providers')
      .select('*')
      .orderBy('created_at', 'desc');
    res.json(providers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching providers' });
  }
});

router.post('/providers', async (req, res) => {
  try {
    const [provider] = await req.db('service_providers')
      .insert(req.body)
      .returning('*');
    res.status(201).json(provider);
  } catch (error) {
    res.status(500).json({ error: 'Error creating provider' });
  }
});

router.put('/providers/:id', async (req, res) => {
  try {
    const [provider] = await req.db('service_providers')
      .where('id', req.params.id)
      .update(req.body)
      .returning('*');
    res.json(provider);
  } catch (error) {
    res.status(500).json({ error: 'Error updating provider' });
  }
});

router.patch('/providers/:id/toggle-status', async (req, res) => {
  try {
    const [provider] = await req.db('service_providers')
      .where('id', req.params.id)
      .update('is_active', req.body.is_active)
      .returning('*');
    res.json(provider);
  } catch (error) {
    res.status(500).json({ error: 'Error updating provider status' });
  }
});

// Plans Management
router.get('/plans', async (req, res) => {
  try {
    const plans = await req.db('service_plans')
      .select('*')
      .orderBy('monthly_fee', 'asc');
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching plans' });
  }
});

router.post('/plans', async (req, res) => {
  try {
    const [plan] = await req.db('service_plans')
      .insert(req.body)
      .returning('*');
    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ error: 'Error creating plan' });
  }
});

router.put('/plans/:id', async (req, res) => {
  try {
    const [plan] = await req.db('service_plans')
      .where('id', req.params.id)
      .update(req.body)
      .returning('*');
    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: 'Error updating plan' });
  }
});

router.patch('/plans/:id/toggle-status', async (req, res) => {
  try {
    const [plan] = await req.db('service_plans')
      .where('id', req.params.id)
      .update('is_active', req.body.is_active)
      .returning('*');
    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: 'Error updating plan status' });
  }
});

// Service Categories Management
router.get('/categories', async (req, res) => {
  try {
    const categories = await req.db('service_categories')
      .select('*')
      .orderBy('name', 'asc');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching categories' });
  }
});

router.post('/categories', async (req, res) => {
  try {
    const [category] = await req.db('service_categories')
      .insert(req.body)
      .returning('*');
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Error creating category' });
  }
});

router.put('/categories/:id', async (req, res) => {
  try {
    const [category] = await req.db('service_categories')
      .where('id', req.params.id)
      .update(req.body)
      .returning('*');
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Error updating category' });
  }
});

module.exports = router;
