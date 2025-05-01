import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Box, Typography } from '@mui/material';
import './Charts.css';

const ServiceCategoryChart = ({ data }) => {
  const averageServiceTime = data.reduce((acc, curr) => acc + curr.average_service_time, 0) / data.length;
  const averageDistance = data.reduce((acc, curr) => acc + curr.average_distance, 0) / data.length;
  const totalRevenue = data.reduce((acc, curr) => acc + curr.total_revenue, 0);

  return (
    <Box className="chart-container">
      <Typography variant="h6" gutterBottom>
        Service Categories Performance
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip 
            formatter={(value, name) => [
              name.includes('Revenue') ? `R$ ${value.toFixed(2)}` : value,
              name
            ]}
          />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey="total_services"
            name="Total Services"
            fill="#8884d8"
          />
          <Bar
            yAxisId="right"
            dataKey="total_revenue"
            name="Revenue (R$)"
            fill="#82ca9d"
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="chart-stats">
        <Typography variant="body2" color="text.secondary">
          Average Service Time: {averageServiceTime.toFixed(1)} minutes
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Average Distance: {averageDistance.toFixed(1)} km
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Total Revenue: R$ {totalRevenue.toFixed(2)}
        </Typography>
      </div>
    </Box>
  );
};

export default ServiceCategoryChart;
