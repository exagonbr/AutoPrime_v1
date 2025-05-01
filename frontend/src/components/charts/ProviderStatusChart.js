import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';
import { Box, Typography } from '@mui/material';
import './Charts.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ProviderStatusChart = ({ data }) => {
  const chartData = [
    { name: 'Total Providers', value: data.total_providers },
    { name: 'Active Providers', value: data.active_providers },
    { name: 'Online Providers', value: data.online_providers },
    { name: 'Busy Providers', value: data.busy_providers }
  ];

  const activeRate = ((data.active_providers / data.total_providers) * 100).toFixed(1);
  const onlineRate = ((data.online_providers / data.active_providers) * 100).toFixed(1);

  return (
    <Box className="chart-container">
      <Typography variant="h6" gutterBottom>
        Provider Status Distribution
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [value, 'Providers']}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div className="chart-stats">
        <Typography variant="body2" color="text.secondary">
          Active Rate: {activeRate}%
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Online Rate: {onlineRate}%
        </Typography>
      </div>
    </Box>
  );
};

export default ProviderStatusChart;
