import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>OAB Avaliações</h2>
      </div>
      <ul className="sidebar-menu">
        <li><NavLink to="/dashboard"><i className="fas fa-home"></i> Dashboard</NavLink></li>
        <li><NavLink to="/relatorios"><i className="fas fa-chart-bar"></i> Relatórios</NavLink></li>
        <li><NavLink to="/setores"><i className="fas fa-building"></i> Setores</NavLink></li>
        <li><NavLink to="/avaliacoes"><i className="fas fa-star"></i> Avaliações</NavLink></li>
        <li><NavLink to="/configuracoes"><i className="fas fa-cog"></i> Configurações</NavLink></li>
      </ul>
    </div>
  );
};

export default Sidebar;