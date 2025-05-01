exports.seed = async function(knex) {
  // Clean the tables first
  await knex('service_transactions').del();
  await knex('provider_plans').del();
  await knex('service_providers').del();
  await knex('service_categories').del();
  await knex('service_plans').del();

  // Seed service plans
  await knex('service_plans').insert([
    {
      name: 'Plano Básico',
      description: 'Ideal para mecânicos autônomos',
      monthly_fee: 99.90,
      commission_rate: 15.00,
      max_active_providers: 1,
      features: JSON.stringify({
        'dispatch_priority': 'normal',
        'payment_terms': 'D+2',
        'support_level': 'basic'
      })
    },
    {
      name: 'Plano Profissional',
      description: 'Perfeito para oficinas pequenas',
      monthly_fee: 199.90,
      commission_rate: 12.00,
      max_active_providers: 3,
      features: JSON.stringify({
        'dispatch_priority': 'high',
        'payment_terms': 'D+1',
        'support_level': 'priority'
      })
    },
    {
      name: 'Plano Enterprise',
      description: 'Para grandes oficinas e redes',
      monthly_fee: 499.90,
      commission_rate: 10.00,
      max_active_providers: 10,
      features: JSON.stringify({
        'dispatch_priority': 'highest',
        'payment_terms': 'same_day',
        'support_level': 'dedicated'
      })
    }
  ]);

  // Seed service categories
  await knex('service_categories').insert([
    {
      name: 'Emergência Mecânica',
      description: 'Serviços de emergência para problemas mecânicos',
      base_price: 100.00,
      price_per_km: 2.50,
      price_per_hour: 80.00
    },
    {
      name: 'Emergência Elétrica',
      description: 'Serviços de emergência para problemas elétricos',
      base_price: 120.00,
      price_per_km: 2.50,
      price_per_hour: 90.00
    },
    {
      name: 'Troca de Pneu',
      description: 'Serviço de troca de pneu ou reparo',
      base_price: 80.00,
      price_per_km: 2.50,
      price_per_hour: 60.00
    },
    {
      name: 'Reboque',
      description: 'Serviço de reboque para veículos',
      base_price: 150.00,
      price_per_km: 3.50,
      price_per_hour: 100.00
    }
  ]);

  // Seed sample service providers
  await knex('service_providers').insert([
    {
      name: 'João Silva',
      email: 'joao.silva@exemplo.com',
      phone: '11999999999',
      document_number: '12345678901',
      vehicle_info: 'Fiorino 2020 - Branca - ABC1234',
      specialties: 'Mecânica geral, Elétrica',
      latitude: -23.550520,
      longitude: -46.633308,
      base_price: 100.00,
      price_per_km: 2.50,
      price_per_hour: 80.00
    },
    {
      name: 'Maria Oliveira',
      email: 'maria.oliveira@exemplo.com',
      phone: '11988888888',
      document_number: '98765432109',
      vehicle_info: 'Strada 2021 - Prata - XYZ5678',
      specialties: 'Elétrica, Eletrônica',
      latitude: -23.557820,
      longitude: -46.639308,
      base_price: 120.00,
      price_per_km: 2.50,
      price_per_hour: 90.00
    }
  ]);

  // Get the IDs of inserted records
  const [provider] = await knex('service_providers').select('id').where('email', 'joao.silva@exemplo.com');
  const [plan] = await knex('service_plans').select('id').where('name', 'Plano Básico');

  // Seed provider plans
  await knex('provider_plans').insert([
    {
      provider_id: provider.id,
      plan_id: plan.id,
      start_date: new Date(),
      end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      status: 'active',
      price_paid: 99.90
    }
  ]);
};
