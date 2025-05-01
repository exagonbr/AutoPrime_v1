import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Box, Typography } from '@mui/material';
import './Charts.css';

const RevenueChart = ({ data }) => {
  return (
    <Box className="chart-container">
      <Typography variant="h6" gutterBottom>
        Revenue Trends
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            tickFormatter={(value) => new Date(value).toLocaleDateString()}
          />
          <YAxis />
          <Tooltip 
            formatter={(value) => `R$ ${value.toFixed(2)}`}
            labelFormatter={(label) => new Date(label).toLocaleDateString()}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="total_revenue"
            name="Total Revenue"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="platform_fees"
            name="Platform Fees"
            stroke="#82ca9d"
          />
          <Line
            type="monotone"
            dataKey="provider_earnings"
            name="Provider Earnings"
            stroke="#ffc658"
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="chart-stats">
        <Typography variant="body2" color="text.secondary">
          Last 30 Days Revenue Analysis
        </Typography>
      </div>
    </Box>
  );
};

export default RevenueChart;
