import React from 'react';
import EndpointItem from './EndpointItem';

const RouteDetails = ({ routes, selectedRoute, routeDetails, openEndpoint, setOpenEndpoint }) => {
  const route = routes.find((r) => r.name === selectedRoute);
  const RouteComponent = route?.component;

  return (
    <main className="route-details">
      {selectedRoute && (
        <>
          <h2>Tài liệu cho {route.label}</h2>
          <div className="endpoint-list">
            {RouteComponent ? (
              <RouteComponent
                openEndpoint={openEndpoint}
                setOpenEndpoint={setOpenEndpoint}
              />
            ) : (
              routeDetails[selectedRoute]?.map((endpoint, index) => (
                <EndpointItem
                  key={`${endpoint.path}-${index}`}
                  endpoint={endpoint}
                  index={index}
                  openEndpoint={openEndpoint}
                  setOpenEndpoint={setOpenEndpoint}
                />
              ))
            )}
          </div>
        </>
      )}
    </main>
  );
};

export default RouteDetails;