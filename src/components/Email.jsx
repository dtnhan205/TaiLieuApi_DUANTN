import React, { useMemo, useState, useEffect } from 'react';
import EndpointItem from './EndpointItem';
import emailEndpoints from './emailEndpoints';

const Email = ({ openEndpoint, setOpenEndpoint }) => {
  // Tối ưu hiệu suất với useMemo
  const endpoints = useMemo(() => emailEndpoints, []);
  const [searchTerm, setSearchTerm] = useState('');

  // Lọc endpoint theo path hoặc method
  const filteredEndpoints = endpoints.filter(
    (endpoint) =>
      endpoint.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
      endpoint.method.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Thêm IntersectionObserver để kích hoạt hiệu ứng
  useEffect(() => {
    const items = document.querySelectorAll('.endpoint-item');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Ngừng quan sát sau khi xuất hiện
          }
        });
      },
      {
        threshold: 0.1, // Kích hoạt khi 10% của phần tử nằm trong viewport
      }
    );

    items.forEach((item) => observer.observe(item));

    return () => {
      items.forEach((item) => observer.unobserve(item));
    };
  }, [filteredEndpoints]); // Cập nhật observer khi danh sách endpoint thay đổi

  return (
    <div className="api-docs">
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Tìm kiếm endpoint..."
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
        <p>Không tìm thấy endpoint phù hợp.</p>
      )}
    </div>
  );
};

export default Email;