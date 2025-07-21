import React, { useMemo, useState, useEffect } from 'react';
import EndpointItem from './EndpointItem';
import vnpayEndpoints from './vnpayEndpoints';

const Vnpay = ({ openEndpoint, setOpenEndpoint }) => {
  // Optimize performance with useMemo
  const endpoints = useMemo(() => vnpayEndpoints, []);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter endpoints by path or method
  const filteredEndpoints = endpoints.filter(
    (endpoint) =>
      endpoint.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
      endpoint.method.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add IntersectionObserver for animation effects
  useEffect(() => {
    const items = document.querySelectorAll('.endpoint-item');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing after becoming visible
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is in viewport
      }
    );

    items.forEach((item) => observer.observe(item));

    return () => {
      items.forEach((item) => observer.unobserve(item));
    };
  }, [filteredEndpoints]); // Update observer when filtered endpoints change

  return (
    <div className="api-docs">
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Tìm kiếm endpoint thanh toán..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredEndpoints.length > 0 ? (
        filteredEndpoints.map((endpoint, index) => (
          <EndpointItem
            key={`${endpoint.path}-${endpoint.method}-${index}`}
            endpoint={endpoint}
            index={index}
            openEndpoint={openEndpoint}
            setOpenEndpoint={setOpenEndpoint}
          />
        ))
      ) : (
        <p>Không tìm thấy endpoint thanh toán phù hợp.</p>
      )}
    </div>
  );
};

export default Vnpay;