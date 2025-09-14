// Substitua o código do SectorChart.tsx pelo código abaixo
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Skeleton } from "../ui/skeleton";

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

// Paleta de cores para o tema claro
const LIGHT_COLORS = ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0']; 

export const SectorChart = ({
  data,
  type = "bar",
  isLoading = false
}: SectorChartProps) => {
  if (isLoading) {
    return (
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-primary">
            {type === "pie" ? "Distribuição por Setor" : "Avaliação por Setor"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-[300px]" />
        </CardContent>
      </Card>
    );
  }

  if (type === "pie") {
    return (
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-primary">Distribuição por Setor</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="average"
                animationBegin={0}
                animationDuration={800}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={LIGHT_COLORS[index % LIGHT_COLORS.length]}
                    stroke="hsl(var(--background))"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${Number(value).toFixed(1)}`, 'Média']}
                labelFormatter={(label) => `Setor: ${label}`}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => <span className="text-sm text-foreground">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-primary">Avaliação por Setor</CardTitle>
      </CardHeader>
      <CardContent className="rounded-none">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 60,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis
              dataKey="name"
              tick={{
                fontSize: 12,
                fill: 'hsl(var(--foreground))',
              }}
              stroke="hsl(var(--border))"
              height={40}
              interval={0}
              tickFormatter={(value) => (value.length > 12 ? value.substring(0, 12) + '...' : value)}
            />
            <YAxis
              domain={[0, 5]}
              tick={{
                fontSize: 12,
                fill: 'hsl(var(--foreground))',
              }}
              stroke="hsl(var(--border))"
              tickFormatter={(value) => value.toFixed(1)}
            />
            <Tooltip
              formatter={(value: number, name: string) => [
                `${Number(value).toFixed(1)}`,
                name === 'average' ? 'Média' : 'Avaliações',
              ]}
              labelFormatter={(label) => `Setor: ${label}`}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Bar dataKey="average" radius={[6, 6, 0, 0]} name="average" animationDuration={800}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={LIGHT_COLORS[index % LIGHT_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};