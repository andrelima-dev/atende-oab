interface StatBoxProps {
  title: string;
  value: string | number;
  icon: string;
  color: 'blue' | 'green' | 'orange' | 'pink';
}

const StatBox = ({ title, value, icon, color }: StatBoxProps) => {
  return (
    <div className="stat-box">
      <div className={`stat-icon ${color}`}>
        <i className={`fas ${icon}`}></i>
      </div>
      <div className="stat-info">
        <h3>{value}</h3>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default StatBox;