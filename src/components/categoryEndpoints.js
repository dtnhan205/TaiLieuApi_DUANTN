const categoryEndpoints = [
  {
    method: 'POST',
    path: '/api/categories',
    description: 'Tạo danh mục mới',
    fullDescription:
      'Tạo một danh mục mới với tên được cung cấp. Yêu cầu quyền admin thông qua token JWT. Tên danh mục phải là một chuỗi không rỗng.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description:
        'Token JWT của admin được yêu cầu trong header. Token được cấp sau khi đăng nhập với tài khoản admin qua endpoint `/api/users/login`.',
    },
    parameters: [
      {
        name: 'name',
        type: 'string',
        description: 'Tên danh mục, phải là chuỗi không rỗng',
        required: true,
        in: 'body',
      },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer <token>' },
      body: { name: 'Danh mục mới' },
    },
    response: {
      status: 201,
      description: 'Tạo danh mục thành công',
      example: {
        message: 'Tạo danh mục thành công',
        category: {
          _id: '60d5f8e9b1a2b4f8e8f9e2b4',
          name: 'Danh mục mới',
          status: 'show',
          createdAt: '2025-07-17T18:11:00.000Z',
        },
      },
    },
    errorResponses: [
      { status: 400, description: 'Tên danh mục không hợp lệ hoặc dữ liệu không hợp lệ' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Không có quyền admin' },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database' },
    ],
  },
  {
    method: 'GET',
    path: '/api/categories',
    description: 'Lấy danh sách danh mục',
    fullDescription:
      'Trả về danh sách tất cả các danh mục có trong hệ thống. Không yêu cầu xác thực, có thể truy cập công khai.',
    auth: {
      required: false,
      description: 'Không yêu cầu token. Endpoint này có thể truy cập công khai.',
    },
    parameters: [],
    response: {
      status: 200,
      description: 'Danh sách danh mục',
      example: [
        {
          _id: '60d5f8e9b1a2b4f8e8f9e2b3',
          name: 'Danh mục 1',
          status: 'show',
          createdAt: '2025-07-17T18:11:00.000Z',
        },
      ],
    },
    errorResponses: [
      { status: 404, description: 'Không tìm thấy danh mục nào' },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database' },
    ],
  },
  {
    method: 'GET',
    path: '/api/categories/:id',
    description: 'Lấy chi tiết danh mục',
    fullDescription:
      'Trả về thông tin chi tiết của một danh mục dựa trên ID. Không yêu cầu xác thực, có thể truy cập công khai.',
    auth: {
      required: false,
      description: 'Không yêu cầu token. Endpoint này có thể truy cập công khai.',
    },
    parameters: [
      {
        name: 'id',
        type: 'string',
        description: 'ObjectId của danh mục',
        required: true,
        in: 'path',
      },
    ],
    response: {
      status: 200,
      description: 'Chi tiết danh mục',
      example: {
        _id: '60d5f8e9b1a2b4f8e8f9e2b3',
        name: 'Danh mục 1',
        status: 'show',
        createdAt: '2025-07-17T18:11:00.000Z',
      },
    },
    errorResponses: [
      { status: 400, description: 'ID danh mục không hợp lệ' },
      { status: 404, description: 'Không tìm thấy danh mục' },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database' },
    ],
  },
  {
    method: 'PUT',
    path: '/api/categories/:id',
    description: 'Cập nhật danh mục',
    fullDescription:
      'Cập nhật thông tin danh mục dựa trên ID, bao gồm tên danh mục. Yêu cầu quyền admin thông qua token JWT.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của admin được yêu cầu trong header.',
    },
    parameters: [
      {
        name: 'id',
        type: 'string',
        description: 'ObjectId của danh mục',
        required: true,
        in: 'path',
      },
      {
        name: 'name',
        type: 'string',
        description: 'Tên danh mục mới, phải là chuỗi không rỗng',
        required: true,
        in: 'body',
      },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer <token>' },
      body: { name: 'Danh mục cập nhật' },
    },
    response: {
      status: 200,
      description: 'Cập nhật danh mục thành công',
      example: {
        message: 'Cập nhật danh mục thành công',
        category: {
          _id: '60d5f8e9b1a2b4f8e8f9e2b3',
          name: 'Danh mục cập nhật',
          status: 'show',
          createdAt: '2025-07-17T18:11:00.000Z',
        },
      },
    },
    errorResponses: [
      { status: 400, description: 'ID danh mục không hợp lệ hoặc tên danh mục không hợp lệ' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Không có quyền admin' },
      { status: 404, description: 'Không tìm thấy danh mục để cập nhật' },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database' },
    ],
  },
  {
    method: 'DELETE',
    path: '/api/categories/:id',
    description: 'Xóa danh mục',
    fullDescription:
      'Xóa một danh mục dựa trên ID và đặt trạng thái `active` của các sản phẩm liên quan thành `false`. Yêu cầu quyền admin thông qua token JWT.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của admin được yêu cầu trong header.',
    },
    parameters: [
      {
        name: 'id',
        type: 'string',
        description: 'ObjectId của danh mục',
        required: true,
        in: 'path',
      },
    ],
    response: {
      status: 200,
      description: 'Xóa danh mục thành công',
      example: { message: 'Xóa danh mục thành công' },
    },
    errorResponses: [
      { status: 400, description: 'ID danh mục không hợp lệ' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Không có quyền admin' },
      { status: 404, description: 'Không tìm thấy danh mục để xóa' },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database' },
    ],
  },
  {
    method: 'PUT',
    path: '/api/categories/:id/toggle-visibility',
    description: 'Chuyển đổi hiển thị danh mục',
    fullDescription:
      'Chuyển đổi trạng thái hiển thị của danh mục giữa `show` và `hidden`. Đồng thời cập nhật trường `active` của các sản phẩm liên quan (`true` nếu `show`, `false` nếu `hidden`). Không cho phép ẩn danh mục nếu còn sản phẩm có tồn kho. Yêu cầu quyền admin thông qua token JWT.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của admin được yêu cầu trong header.',
    },
    parameters: [
      {
        name: 'id',
        type: 'string',
        description: 'ObjectId của danh mục',
        required: true,
        in: 'path',
      },
    ],
    response: {
      status: 200,
      description: 'Chuyển đổi trạng thái hiển thị thành công',
      example: {
        message: 'Danh mục đã được hiển thị',
        category: {
          _id: '60d5f8e9b1a2b4f8e8f9e2b3',
          name: 'Danh mục 1',
          status: 'show',
          createdAt: '2025-07-17T18:11:00.000Z',
        },
      },
    },
    errorResponses: [
      { status: 400, description: 'ID danh mục không hợp lệ hoặc không thể ẩn danh mục do sản phẩm còn tồn kho' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Không có quyền admin' },
      { status: 404, description: 'Không tìm thấy danh mục' },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database' },
    ],
  },
  {
    method: 'GET',
    path: '/api/categories/:id/products',
    description: 'Lấy danh sách sản phẩm theo danh mục',
    fullDescription:
      'Trả về danh sách các sản phẩm thuộc danh mục được chỉ định bởi ID. Yêu cầu quyền admin thông qua token JWT.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của admin được yêu cầu trong header.',
    },
    parameters: [
      {
        name: 'id',
        type: 'string',
        description: 'ObjectId của danh mục',
        required: true,
        in: 'path',
      },
    ],
    response: {
      status: 200,
      description: 'Danh sách sản phẩm theo danh mục',
      example: [
        {
          _id: '60d5f8e9b1a2b4f8e8f9e2b5',
          name: 'Sản phẩm 1',
          id_category: '60d5f8e9b1a2b4f8e8f9e2b3',
          active: true,
          option: [{ stock: 10, price: 100 }],
        },
      ],
    },
    errorResponses: [
      { status: 400, description: 'ID danh mục không hợp lệ' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Không có quyền admin' },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database' },
    ],
  },
];

export default categoryEndpoints;