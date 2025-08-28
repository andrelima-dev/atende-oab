import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartProps {
  chartData: any;
}

const DistribuicaoNotasChart = ({ chartData }: ChartProps) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right' as const }
    }
  };

  return <Pie data={chartData} options={options} />;
};

export default DistribuicaoNotasChart;