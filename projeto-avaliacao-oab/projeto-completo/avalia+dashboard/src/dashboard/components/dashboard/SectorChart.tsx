import { Card, CardHeader, CardTitle, CardContent } from "@/dashboard/components/ui/card";
import { Skeleton } from "@/dashboard/components/ui/skeleton";
import { PieChartIcon, Activity } from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar
} from "recharts";

interface SectorData {
  name: string;
  average: number;
  evaluations: number;
  color: string;
}

interface SectorChartProps {
  data: SectorData[];
  type?: "bar" | "pie";
  isLoading?: boolean;
}

const PROFESSIONAL_COLORS = ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#06B6D4'];

export const SectorChart = ({ data, type = "bar", isLoading = false }: SectorChartProps) => {
  if (isLoading) {
    return (
      <Card className="shadow-xl rounded-2xl border-0">
        <CardHeader>
          <CardTitle className="text-slate-700">
            {type === "pie" ? "Distribuição por Setor" : "Avaliação por Setor"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-[300px] rounded-lg" />
        </CardContent>
      </Card>
    );
  }

  if (type === "pie") {
    return (
      <Card className="bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900/50 dark:to-indigo-900/30 shadow-xl rounded-2xl border-indigo-100 dark:border-indigo-800 border transition-colors duration-300">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-800/40 dark:to-purple-800/40 rounded-lg">
              <PieChartIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-100">Distribuição por Setor</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={110}
                innerRadius={50}
                fill="#8884d8"
                dataKey="average"
                animationBegin={0}
                animationDuration={800}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={PROFESSIONAL_COLORS[index % PROFESSIONAL_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => `${Number(value).toFixed(1)}/5`}
                contentStyle={{
                  backgroundColor: 'var(--color-bg)',
                  border: '2px solid var(--color-border)',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                  padding: '12px'
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900/50 dark:to-blue-900/30 shadow-xl rounded-2xl border-blue-100 dark:border-blue-800 border transition-colors duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-800/40 dark:to-cyan-800/40 rounded-lg">
            <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-100">Avaliação por Setor</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <defs>
              <linearGradient id="barGradient1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8}/>
                <stop offset="100%" stopColor="#1E3A8A" stopOpacity={0.4}/>
              </linearGradient>
              <linearGradient id="barGradient2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                <stop offset="100%" stopColor="#4C1D95" stopOpacity={0.4}/>
              </linearGradient>
              <linearGradient id="barGradient3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EC4899" stopOpacity={0.8}/>
                <stop offset="100%" stopColor="#831843" stopOpacity={0.4}/>
              </linearGradient>
              <linearGradient id="barGradient4" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.8}/>
                <stop offset="100%" stopColor="#92400E" stopOpacity={0.4}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.5} radius={8} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: 'var(--color-text)', fontWeight: 600 }}
              stroke="var(--color-border)"
              height={60}
              interval={0}
              tickFormatter={(value) => value.length > 15 ? value.substring(0, 15) + '...' : value}
            />
            <YAxis
              domain={[0, 5]}
              tick={{ fontSize: 12, fill: 'var(--color-text)', fontWeight: 600 }}
              stroke="var(--color-border)"
              tickFormatter={(value) => value.toFixed(1)}
              label={{ value: 'Nota (0-5)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' }}}
            />
            <Tooltip
              formatter={(value: number) => `${Number(value).toFixed(1)}/5`}
              contentStyle={{
                backgroundColor: 'var(--color-bg)',
                border: '2px solid var(--color-border)',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.12)',
                padding: '12px'
              }}
              cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
            />
            <Bar 
              dataKey="average" 
              radius={[8, 8, 0, 0]} 
              animationDuration={800}
              fill="url(#barGradient1)"
            >
              {data.map((entry, index) => {
                const gradients = ['url(#barGradient1)', 'url(#barGradient2)', 'url(#barGradient3)', 'url(#barGradient4)'];
                return (
                  <Cell key={`cell-${index}`} fill={gradients[index % gradients.length]} />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};