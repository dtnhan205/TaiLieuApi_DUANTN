import React from 'react';

const Header = ({ selectedServer, setSelectedServer, servers }) => {
  return (
    <header className="api-header">
      <h1>
        Tài Liệu API
        <span className="version">
          1.0 <span className="oas">FPT</span>
        </span>
      </h1>
      <p className="api-info">API Backend - Pure Botanica | <a href="https://github.com/dtnhan205">Github Đinh Thế Nhân</a></p>
      <div className="server-selection">
        <label htmlFor="server-select">Server:</label>
        <select
          id="server-select"
          value={selectedServer}
          onChange={(e) => setSelectedServer(e.target.value)}
        >
          {servers.map((server) => (
            <option key={server} value={server}>
              {server}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
};

export default Header;