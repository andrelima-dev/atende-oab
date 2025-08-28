const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="Pesquisar setor..." />
        </div>
      </div>
      <div className="topbar-right">
        <div className="topbar-item">
          <i className="fas fa-bell topbar-icon"></i>
          <span className="badge">3</span>
        </div>
        <div className="user-profile">
          <img src="https://ui-avatars.com/api/?name=Admin+OAB&background=1976d2&color=fff" alt="User" className="user-avatar" />
          <span className="user-name">Admin OAB</span>
        </div>
      </div>
    </div>
  );
};

export default Topbar;