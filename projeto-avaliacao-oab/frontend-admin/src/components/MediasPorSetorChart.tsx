import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ChartProps {
  chartData: any;
}

const MediasPorSetorChart = ({ chartData }: ChartProps) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true, max: 5, title: { display: true, text: 'Nota Média' } },
      x: { title: { display: true, text: 'Setores' } }
    }
  };

  return <Bar data={chartData} options={options} />;
};

export default MediasPorSetorChart;