"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", recyclable: 4, organic: 3, electric: 1, nonRecyclable: 2 },
  { name: "Tue", recyclable: 3, organic: 4, electric: 2, nonRecyclable: 3 },
  { name: "Wed", recyclable: 5, organic: 2, electric: 1, nonRecyclable: 1 },
  { name: "Thu", recyclable: 2, organic: 3, electric: 0, nonRecyclable: 2 },
  { name: "Fri", recyclable: 4, organic: 2, electric: 1, nonRecyclable: 2 },
  { name: "Sat", recyclable: 6, organic: 4, electric: 2, nonRecyclable: 3 },
  { name: "Sun", recyclable: 3, organic: 2, electric: 1, nonRecyclable: 1 },
];

export default function StatsChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="recyclable"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="organic"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="electric"
            stroke="hsl(var(--chart-3))"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="nonRecyclable"
            stroke="hsl(var(--chart-4))"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}