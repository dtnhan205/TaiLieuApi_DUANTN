import React from 'react';

const Sidebar = ({ routes, selectedRoute, handleRouteClick }) => {
  return (
    <nav className="route-sidebar">
      <h2>Danh sách Route</h2>
      <ul className="route-list">
        {routes.map((route) => (
          <li key={route.name}>
            <button
              className={`route-btn ${selectedRoute === route.name ? 'active' : ''}`}
              onClick={() => handleRouteClick(route.name)}
              aria-current={selectedRoute === route.name ? 'true' : 'false'}
            >
              {route.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;