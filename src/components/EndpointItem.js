import React from 'react';

const EndpointItem = ({ endpoint, index, openEndpoint, setOpenEndpoint }) => {
  const toggleEndpoint = () => {
    setOpenEndpoint((prev) => (prev?.path === endpoint.path && prev?.method === endpoint.method ? null : endpoint));
  };

  return (
    <div className="endpoint-item">
      <div className="endpoint-header" onClick={toggleEndpoint}>
        <button
          className={`method-btn ${endpoint.method.toLowerCase()}`}
          aria-expanded={openEndpoint?.path === endpoint.path && openEndpoint?.method === endpoint.method}
        >
          {endpoint.method}
        </button>
        <span className="endpoint-path">{endpoint.path}</span>
        <span className="endpoint-desc">{endpoint.description}</span>
      </div>
      {openEndpoint?.path === endpoint.path && openEndpoint?.method === endpoint.method && (
        <div className="endpoint-details">
          <h3>Chi tiết</h3>
          {endpoint.fullDescription && (
            <div className="detail-section">
              <h4>Mô tả đầy đủ</h4>
              <p>{endpoint.fullDescription}</p>
            </div>
          )}
          {endpoint.auth && (
            <div className="detail-section auth-section">
              <h4>Xác thực</h4>
              <p><strong>Yêu cầu:</strong> {endpoint.auth.required ? 'Bắt buộc' : 'Không bắt buộc'}</p>
              {endpoint.auth.required && (
                <>
                  <p><strong>Header:</strong> {endpoint.auth.header}</p>
                  <p>{endpoint.auth.description}</p>
                </>
              )}
            </div>
          )}
          <div className="detail-section">
            <h4>Tham số</h4>
            {endpoint.parameters.length > 0 ? (
              <table className="param-table">
                <thead>
                  <tr>
                    <th>Tên</th>
                    <th>Kiểu</th>
                    <th>Mô tả</th>
                    <th>Bắt buộc</th>
                  </tr>
                </thead>
                <tbody>
                  {endpoint.parameters.map((param, i) => (
                    <tr key={i} className={param.required ? 'required' : ''}>
                      <td>{param.name}</td>
                      <td>{param.type}</td>
                      <td>{param.description}</td>
                      <td>{param.required ? 'Có' : 'Không'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Không có tham số.</p>
            )}
          </div>
          {endpoint.exampleUrl && (
            <div className="detail-section">
              <h4>URL Mẫu</h4>
              <p dangerouslySetInnerHTML={{ __html: endpoint.exampleUrl }} />
            </div>
          )}
          {endpoint.requestExample && (
            <div className="detail-section">
              <h4>Ví dụ Request</h4>
              {endpoint.requestExample.headers && (
                <>
                  <h5>Headers</h5>
                  <pre>{JSON.stringify(endpoint.requestExample.headers, null, 2)}</pre>
                </>
              )}
              {endpoint.requestExample.body && (
                <>
                  <h5>Body</h5>
                  <pre>{JSON.stringify(endpoint.requestExample.body, null, 2)}</pre>
                </>
              )}
              {endpoint.requestExample.files && (
                <>
                  <h5>Files</h5>
                  <pre>{JSON.stringify(endpoint.requestExample.files, null, 2)}</pre>
                </>
              )}
            </div>
          )}
          <div className="detail-section">
            <h4>Phản hồi</h4>
            <p>
              <strong>Trạng thái:</strong> {endpoint.response.status} -{" "}
              {endpoint.response.description}
            </p>
            <div className="response-schema">
              <h5>Dữ liệu phản hồi</h5>
              <pre>
                {JSON.stringify(endpoint.response.example || endpoint.response, null, 2)}
              </pre>
            </div>
          </div>
          {endpoint.errorResponses && (
            <div className="detail-section">
              <h4>Phản hồi lỗi</h4>
              <table className="error-table">
                <thead>
                  <tr>
                    <th>Mã trạng thái</th>
                    <th>Mô tả</th>
                  </tr>
                </thead>
                <tbody>
                  {endpoint.errorResponses.map((error, i) => (
                    <tr key={i}>
                      <td>{error.status}</td>
                      <td>{error.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EndpointItem;