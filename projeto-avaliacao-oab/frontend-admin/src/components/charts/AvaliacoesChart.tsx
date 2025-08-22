// frontend-admin/src/components/charts/AvaliacoesChart.tsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Definindo o tipo de dados que o gráfico espera receber
type ChartData = {
  name: string;
  avaliacoes: number;
};

type AvaliacoesChartProps = {
  data: ChartData[];
};

const AvaliacoesChart = ({ data }: AvaliacoesChartProps) => {
  return (
 
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <XAxis dataKey="name" stroke="#a0bfe0" />
        <YAxis stroke="#a0bfe0" />
        <Tooltip
          cursor={{ fill: 'rgba(129, 157, 194, 0.2)' }}
          contentStyle={{ 
            backgroundColor: '#1E293B', 
            border: '1px solid #334155',
            color: '#e0e0e0'
          }}
        />
        <Legend wrapperStyle={{ color: '#e0e0e0' }}/>
        <Bar dataKey="avaliacoes" fill="#A0BFE0" name="Total de Avaliações" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AvaliacoesChart;