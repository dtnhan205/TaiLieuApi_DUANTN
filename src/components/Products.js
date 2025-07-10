import React from 'react';
import EndpointItem from './EndpointItem';

const Products = ({ openEndpoint, setOpenEndpoint }) => {
  const endpoints = [
    {
      method: 'GET',
      path: '/api/products',
      description: 'Lấy tất cả sản phẩm (chỉ admin)',
      fullDescription: 'Trả về danh sách tất cả sản phẩm, bao gồm cả sản phẩm ẩn (`hidden`) và không hoạt động (`inactive`). Yêu cầu quyền admin thông qua token JWT trong header `Authorization`.',
      auth: {
        required: true,
        header: 'Authorization: Bearer <token>',
        description: 'Token JWT của admin được yêu cầu trong header. Token được cấp sau khi đăng nhập với tài khoản admin qua endpoint `/api/auth/login`.'
      },
      parameters: [],
      response: {
        status: 200,
        description: 'Danh sách tất cả sản phẩm',
        example: [
          {
            _id: '60d5f8e9b1a2b4f8e8f9e2b1',
            name: 'Sản phẩm 1',
            slug: 'san-pham-1',
            status: 'show',
            active: true,
            view: 100,
            id_brand: '60d5f8e9b1a2b4f8e8f9e2b2',
            id_category: '60d5f8e9b1a2b4f8e8f9e2b3',
            images: ['images/product1.jpg'],
            short_description: 'Mô tả ngắn',
            description: 'Mô tả chi tiết',
            option: [{ value: 'Size M', price: 100000, stock: 50 }],
            createdAt: '2025-07-09T00:00:00Z'
          }
        ]
      },
      errorResponses: [
        { status: 401, description: 'Không có token hoặc token không hợp lệ' },
        { status: 403, description: 'Không có quyền admin' },
        { status: 500, description: 'Lỗi máy chủ' }
      ]
    },
    {
      method: 'GET',
      path: '/api/products/active',
      description: 'Lấy sản phẩm đang hoạt động',
      fullDescription: 'Trả về danh sách các sản phẩm có `status: show` và `isActive: true` (dựa trên trạng thái của danh mục liên quan). Không yêu cầu xác thực.',
      auth: {
        required: false,
        description: 'Không yêu cầu token. Endpoint này có thể truy cập công khai.'
      },
      parameters: [],
      response: {
        status: 200,
        description: 'Danh sách sản phẩm đang hoạt động',
        example: [
          {
            _id: '60d5f8e9b1a2b4f8e8f9e2b1',
            name: 'Sản phẩm 1',
            slug: 'san-pham-1',
            status: 'show',
            active: true,
            view: 100,
            id_brand: '60d5f8e9b1a2b4f8e8f9e2b2',
            id_category: '60d5f8e9b1a2b4f8e8f9e2b3',
            images: ['images/product1.jpg'],
            short_description: 'Mô tả ngắn',
            description: 'Mô tả chi tiết',
            option: [{ value: 'Size M', price: 100000, stock: 50 }],
            createdAt: '2025-07-09T00:00:00Z'
          }
        ]
      },
      errorResponses: [
        { status: 500, description: 'Lỗi máy chủ' }
      ]
    },
    {
      method: 'GET',
      path: '/api/products/:identifier',
      description: 'Lấy sản phẩm theo ID hoặc slug',
      fullDescription: 'Trả về thông tin chi tiết của một sản phẩm dựa trên `identifier` (ID hoặc slug). Nếu không có token admin, lượt xem (`view`) của sản phẩm sẽ tăng lên 1.',
      auth: {
        required: false,
        description: 'Token admin trong header `Authorization` là tùy chọn. Nếu cung cấp token admin, lượt xem sẽ không tăng.'
      },
      parameters: [
        { name: 'identifier', type: 'string', description: 'ID (ObjectId) hoặc slug của sản phẩm', required: true }
      ],
      response: {
        status: 200,
        description: 'Chi tiết sản phẩm',
        example: {
          _id: '60d5f8e9b1a2b4f8e8f9e2b1',
          name: 'Sản phẩm 1',
          slug: 'san-pham-1',
          status: 'show',
          active: true,
          view: 101,
          id_brand: '60d5f8e9b1a2b4f8e8f9e2b2',
          id_category: '60d5f8e9b1a2b4f8e8f9e2b3',
          images: ['images/product1.jpg'],
          short_description: 'Mô tả ngắn',
          description: 'Mô tả chi tiết',
          option: [{ value: 'Size M', price: 100000, stock: 50 }],
          createdAt: '2025-07-09T00:00:00Z'
        }
      },
      errorResponses: [
        { status: 400, description: 'Identifier không hợp lệ' },
        { status: 404, description: 'Không tìm thấy sản phẩm' },
        { status: 500, description: 'Lỗi máy chủ' }
      ]
    },
    {
      method: 'POST',
      path: '/api/products',
      description: 'Tạo sản phẩm mới',
      fullDescription: 'Tạo một sản phẩm mới với các thông tin được cung cấp. Yêu cầu quyền admin thông qua token JWT. Hỗ trợ upload nhiều file ảnh. Slug được tự động tạo từ tên sản phẩm và đảm bảo tính duy nhất.',
      auth: {
        required: true,
        header: 'Authorization: Bearer <token>',
        description: 'Token JWT của admin được yêu cầu trong header.'
      },
      parameters: [
        { name: 'name', type: 'string', description: 'Tên sản phẩm, phải duy nhất', required: true },
        { name: 'id_brand', type: 'string', description: 'ObjectId của thương hiệu, phải tồn tại trong database', required: true },
        { name: 'id_category', type: 'string', description: 'ObjectId của danh mục, phải tồn tại trong database', required: true },
        { name: 'status', type: 'string', description: 'Trạng thái hiển thị (`show` hoặc `hidden`), mặc định là `show`' },
        { name: 'active', type: 'boolean', description: 'Trạng thái hoạt động, mặc định là `true`' },
        { name: 'view', type: 'integer', description: 'Số lượt xem, mặc định là `0`' },
        { name: 'short_description', type: 'string', description: 'Mô tả ngắn của sản phẩm' },
        { name: 'description', type: 'string', description: 'Mô tả chi tiết của sản phẩm' },
        { name: 'option', type: 'array', description: 'Danh sách tùy chọn sản phẩm (JSON), ví dụ: `[{"value": "Size M", "price": 100000, "stock": 50}]`' },
        { name: 'images', type: 'file', description: 'File ảnh sản phẩm (hỗ trợ nhiều file, định dạng: jpg, png, ...)' }
      ],
      requestExample: {
        headers: { 'Authorization': 'Bearer <token>' },
        body: {
          name: 'Sản phẩm 2',
          id_brand: '60d5f8e9b1a2b4f8e8f9e2b2',
          id_category: '60d5f8e9b1a2b4f8e8f9e2b3',
          status: 'show',
          active: true,
          view: 0,
          short_description: 'Mô tả ngắn',
          description: 'Mô tả chi tiết',
          option: [{ value: 'Size L', price: 120000, stock: 30 }]
        },
        files: ['product2.jpg']
      },
      response: {
        status: 201,
        description: 'Tạo sản phẩm thành công',
        example: {
          message: 'Tạo sản phẩm thành công',
          product: {
            _id: '60d5f8e9b1a2b4f8e8f9e2b4',
            name: 'Sản phẩm 2',
            slug: 'san-pham-2',
            status: 'show',
            active: true,
            view: 0,
            id_brand: '60d5f8e9b1a2b4f8e8f9e2b2',
            id_category: '60d5f8e9b1a2b4f8e8f9e2b3',
            images: ['images/product2.jpg'],
            short_description: 'Mô tả ngắn',
            description: 'Mô tả chi tiết',
            option: [{ value: 'Size L', price: 120000, stock: 30 }],
            createdAt: '2025-07-09T00:00:00Z'
          }
        }
      },
      errorResponses: [
        { status: 400, description: 'Thiếu các trường bắt buộc hoặc dữ liệu không hợp lệ (ví dụ: trùng tên sản phẩm, ObjectId không hợp lệ)' },
        { status: 401, description: 'Không có token hoặc token không hợp lệ' },
        { status: 403, description: 'Không có quyền admin' },
        { status: 500, description: 'Lỗi máy chủ' }
      ]
    },
    {
      method: 'PUT',
      path: '/api/products/:identifier',
      description: 'Cập nhật sản phẩm',
      fullDescription: 'Cập nhật thông tin sản phẩm dựa trên `identifier` (ID hoặc slug). Yêu cầu quyền admin thông qua token JWT. Hỗ trợ upload ảnh mới và tự động tạo slug mới nếu tên sản phẩm thay đổi.',
      auth: {
        required: true,
        header: 'Authorization: Bearer <token>',
        description: 'Token JWT của admin được yêu cầu trong header.'
      },
      parameters: [
        { name: 'identifier', type: 'string', description: 'ID (ObjectId) hoặc slug của sản phẩm', required: true },
        { name: 'name', type: 'string', description: 'Tên sản phẩm mới, tự động tạo slug mới nếu thay đổi' },
        { name: 'id_brand', type: 'string', description: 'ObjectId của thương hiệu' },
        { name: 'id_category', type: 'string', description: 'ObjectId của danh mục' },
        { name: 'status', type: 'string', description: 'Trạng thái hiển thị (`show` hoặc `hidden`)' },
        { name: 'active', type: 'boolean', description: 'Trạng thái hoạt động' },
        { name: 'short_description', type: 'string', description: 'Mô tả ngắn' },
        { name: 'description', type: 'string', description: 'Mô tả chi tiết' },
        { name: 'option', type: 'array', description: 'Danh sách tùy chọn sản phẩm (JSON), ví dụ: `[{"value": "Size M", "price": 100000, "stock": 50}]`' },
        { name: 'images', type: 'file', description: 'File ảnh mới (hỗ trợ nhiều file, thay thế ảnh cũ)' }
      ],
      requestExample: {
        headers: { 'Authorization': 'Bearer <token>' },
        body: {
          name: 'Sản phẩm 1 (Cập nhật)',
          id_brand: '60d5f8e9b1a2b4f8e8f9e2b2',
          id_category: '60d5f8e9b1a2b4f8e8f9e2b3',
          status: 'show',
          active: true,
          short_description: 'Mô tả ngắn cập nhật',
          description: 'Mô tả chi tiết cập nhật',
          option: [{ value: 'Size M', price: 110000, stock: 40 }]
        },
        files: ['product1_updated.jpg']
      },
      response: {
        status: 200,
        description: 'Cập nhật sản phẩm thành công',
        example: {
          message: 'Cập nhật sản phẩm thành công',
          product: {
            _id: '60d5f8e9b1a2b4f8e8f9e2b1',
            name: 'Sản phẩm 1 (Cập nhật)',
            slug: 'san-pham-1-cap-nhat',
            status: 'show',
            active: true,
            view: 101,
            id_brand: '60d5f8e9b1a2b4f8e8f9e2b2',
            id_category: '60d5f8e9b1a2b4f8e8f9e2b3',
            images: ['images/product1_updated.jpg'],
            short_description: 'Mô tả ngắn cập nhật',
            description: 'Mô tả chi tiết cập nhật',
            option: [{ value: 'Size M', price: 110000, stock: 40 }],
            createdAt: '2025-07-09T00:00:00Z'
          }
        }
      },
      errorResponses: [
        { status: 400, description: 'Dữ liệu không hợp lệ hoặc trùng lặp slug' },
        { status: 401, description: 'Không có token hoặc token không hợp lệ' },
        { status: 403, description: 'Không có quyền admin' },
        { status: 404, description: 'Không tìm thấy sản phẩm' },
        { status: 500, description: 'Lỗi máy chủ' }
      ]
    },
    {
      method: 'DELETE',
      path: '/api/products/:identifier',
      description: 'Xóa sản phẩm',
      fullDescription: 'Xóa một sản phẩm dựa trên `identifier` (ID hoặc slug). Yêu cầu quyền admin thông qua token JWT.',
      auth: {
        required: true,
        header: 'Authorization: Bearer <token>',
        description: 'Token JWT của admin được yêu cầu trong header.'
      },
      parameters: [
        { name: 'identifier', type: 'string', description: 'ID (ObjectId) hoặc slug của sản phẩm', required: true }
      ],
      response: {
        status: 200,
        description: 'Xóa sản phẩm thành công',
        example: { message: 'Xóa sản phẩm thành công' }
      },
      errorResponses: [
        { status: 401, description: 'Không có token hoặc token không hợp lệ' },
        { status: 403, description: 'Không có quyền admin' },
        { status: 404, description: 'Không tìm thấy sản phẩm' },
        { status: 500, description: 'Lỗi máy chủ' }
      ]
    },
    {
      method: 'PUT',
      path: '/api/products/:identifier/toggle-visibility',
      description: 'Chuyển đổi hiển thị sản phẩm',
      fullDescription: 'Chuyển đổi trạng thái hiển thị của sản phẩm giữa `show` và `hidden`. Yêu cầu quyền admin thông qua token JWT.',
      auth: {
        required: true,
        header: 'Authorization: Bearer <token>',
        description: 'Token JWT của admin được yêu cầu trong header.'
      },
      parameters: [
        { name: 'identifier', type: 'string', description: 'ID (ObjectId) hoặc slug của sản phẩm', required: true }
      ],
      response: {
        status: 200,
        description: 'Chuyển đổi trạng thái hiển thị thành công',
        example: {
          message: 'Sản phẩm đã được hiển thị',
          product: {
            _id: '60d5f8e9b1a2b4f8e8f9e2b1',
            name: 'Sản phẩm 1',
            slug: 'san-pham-1',
            status: 'show',
            active: true,
            view: 101,
            id_brand: '60d5f8e9b1a2b4f8e8f9e2b2',
            id_category: '60d5f8e9b1a2b4f8e8f9e2b3',
            images: ['images/product1.jpg'],
            createdAt: '2025-07-09T00:00:00Z'
          }
        }
      },
      errorResponses: [
        { status: 401, description: 'Không có token hoặc token không hợp lệ' },
        { status: 403, description: 'Không có quyền admin' },
        { status: 404, description: 'Không tìm thấy sản phẩm' },
        { status: 500, description: 'Lỗi máy chủ' }
      ]
    },
    {
      method: 'PUT',
      path: '/api/products/:identifier/toggle-active',
      description: 'Chuyển đổi trạng thái hoạt động',
      fullDescription: 'Chuyển đổi trạng thái hoạt động (`active`) của sản phẩm giữa `true` và `false`. Yêu cầu quyền admin thông qua token JWT.',
      auth: {
        required: true,
        header: 'Authorization: Bearer <token>',
        description: 'Token JWT của admin được yêu cầu trong header.'
      },
      parameters: [
        { name: 'identifier', type: 'string', description: 'ID (ObjectId) hoặc slug của sản phẩm', required: true }
      ],
      response: {
        status: 200,
        description: 'Chuyển đổi trạng thái hoạt động thành công',
        example: {
          message: 'Sản phẩm đã được kích hoạt',
          product: {
            _id: '60d5f8e9b1a2b4f8e8f9e2b1',
            name: 'Sản phẩm 1',
            slug: 'san-pham-1',
            status: 'show',
            active: true,
            view: 101,
            id_brand: '60d5f8e9b1a2b4f8e8f9e2b2',
            id_category: '60d5f8e9b1a2b4f8e8f9e2b3',
            images: ['images/product1.jpg'],
            createdAt: '2025-07-09T00:00:00Z'
          }
        }
      },
      errorResponses: [
        { status: 401, description: 'Không có token hoặc token không hợp lệ' },
        { status: 403, description: 'Không có quyền admin' },
        { status: 404, description: 'Không tìm thấy sản phẩm' },
        { status: 500, description: 'Lỗi máy chủ' }
      ]
    }
  ];

  return (
    <>
      {endpoints.map((endpoint, index) => (
        <EndpointItem
          key={`${endpoint.path}-${index}`}
          endpoint={endpoint}
          index={index}
          openEndpoint={openEndpoint}
          setOpenEndpoint={setOpenEndpoint}
        />
      ))}
    </>
  );
};

export default Products;