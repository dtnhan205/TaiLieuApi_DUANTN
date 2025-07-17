const contactEndpoints = [
  {
    method: 'POST',
    path: '/api/contacts',
    description: 'Gửi thông tin liên hệ mới',
    fullDescription:
      'Tạo một thông tin liên hệ mới với các thông tin được cung cấp. Không yêu cầu quyền admin, endpoint này công khai. Dữ liệu gửi qua `application/json`.',
    auth: {
      required: false,
      description: 'Không yêu cầu token. Endpoint này có thể truy cập công khai.',
    },
    parameters: [
      {
        name: 'fullName',
        type: 'string',
        description: 'Họ và tên của người liên hệ',
        required: true,
        in: 'body',
      },
      {
        name: 'email',
        type: 'string',
        description: 'Địa chỉ email của người liên hệ, phải đúng định dạng email',
        required: true,
        in: 'body',
      },
      {
        name: 'phone',
        type: 'string',
        description: 'Số điện thoại của người liên hệ (tùy chọn)',
        required: false,
        in: 'body',
      },
      {
        name: 'message',
        type: 'string',
        description: 'Nội dung tin nhắn của người liên hệ (tùy chọn)',
        required: false,
        in: 'body',
      },
    ],
    requestExample: {
      headers: { 'Content-Type': 'application/json' },
      body: {
        fullName: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        phone: '0123456789',
        message: 'Tôi cần hỗ trợ về sản phẩm.',
      },
    },
    response: {
      status: 201,
      description: 'Gửi thông tin liên hệ thành công',
      example: {
        message: 'Gửi liên hệ thành công',
        contact: {
          _id: '60d5f8e9b1a2b4f8e8f9e2c1',
          fullName: 'Nguyễn Văn A',
          email: 'nguyenvana@example.com',
          phone: '0123456789',
          message: 'Tôi cần hỗ trợ về sản phẩm.',
          status: 'Chưa xử lý',
          createdAt: '2025-07-17T19:19:00.000Z',
        },
      },
    },
    errorResponses: [
      { status: 400, description: 'Thiếu các trường bắt buộc: fullName hoặc email' },
      { status: 400, description: 'Email không hợp lệ' },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database' },
    ],
  },
  {
    method: 'GET',
    path: '/api/contacts',
    description: 'Lấy tất cả thông tin liên hệ (chỉ admin)',
    fullDescription:
      'Trả về danh sách tất cả các thông tin liên hệ, sắp xếp theo thời gian tạo giảm dần. Yêu cầu quyền admin thông qua token JWT.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description:
        'Token JWT của admin được yêu cầu trong header. Token được cấp sau khi đăng nhập qua endpoint `/api/users/login`.',
    },
    parameters: [],
    response: {
      status: 200,
      description: 'Danh sách tất cả thông tin liên hệ',
      example: {
        contacts: [
          {
            _id: '60d5f8e9b1a2b4f8e8f9e2c1',
            fullName: 'Nguyễn Văn A',
            email: 'nguyenvana@example.com',
            phone: '0123456789',
            message: 'Tôi cần hỗ trợ về sản phẩm.',
            status: 'Chưa xử lý',
            createdAt: '2025-07-17T19:19:00.000Z',
          },
        ],
        totalPages: 1,
      },
    },
    errorResponses: [
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Không có quyền admin' },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database' },
    ],
  },
  {
    method: 'GET',
    path: '/api/contacts/:id',
    description: 'Lấy thông tin liên hệ theo ID (chỉ admin)',
    fullDescription:
      'Trả về thông tin chi tiết của một liên hệ dựa trên ID. Yêu cầu quyền admin thông qua token JWT.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description:
        'Token JWT của admin được yêu cầu trong header. Token được cấp sau khi đăng nhập qua endpoint `/api/users/login`.',
    },
    parameters: [
      {
        name: 'id',
        type: 'string',
        description: 'ObjectId của thông tin liên hệ',
        required: true,
        in: 'path',
      },
    ],
    response: {
      status: 200,
      description: 'Chi tiết thông tin liên hệ',
      example: {
        _id: '60d5f8e9b1a2b4f8e8f9e2c1',
        fullName: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        phone: '0123456789',
        message: 'Tôi cần hỗ trợ về sản phẩm.',
        status: 'Chưa xử lý',
        createdAt: '2025-07-17T19:19:00.000Z',
      },
    },
    errorResponses: [
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Không có quyền admin' },
      { status: 404, description: 'Liên hệ không tồn tại' },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database' },
    ],
  },
  {
    method: 'PUT',
    path: '/api/contacts/:id',
    description: 'Cập nhật trạng thái liên hệ (chỉ admin)',
    fullDescription:
      'Cập nhật trạng thái của một thông tin liên hệ dựa trên ID, chỉ cho phép chuyển từ "Chưa xử lý" sang "Đã xử lý". Yêu cầu quyền admin thông qua token JWT. Dữ liệu gửi qua `application/json`.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description:
        'Token JWT của admin được yêu cầu trong header. Token được cấp sau khi đăng nhập qua endpoint `/api/users/login`.',
    },
    parameters: [
      {
        name: 'id',
        type: 'string',
        description: 'ObjectId của thông tin liên hệ',
        required: true,
        in: 'path',
      },
      {
        name: 'status',
        type: 'string',
        description: 'Trạng thái mới (`Chưa xử lý` hoặc `Đã xử lý`)',
        required: true,
        in: 'body',
      },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer <token>', 'Content-Type': 'application/json' },
      body: {
        status: 'Đã xử lý',
      },
    },
    response: {
      status: 200,
      description: 'Cập nhật trạng thái liên hệ thành công',
      example: {
        message: 'Cập nhật trạng thái thành công',
        contact: {
          _id: '60d5f8e9b1a2b4f8e8f9e2c1',
          fullName: 'Nguyễn Văn A',
          email: 'nguyenvana@example.com',
          phone: '0123456789',
          message: 'Tôi cần hỗ trợ về sản phẩm.',
          status: 'Đã xử lý',
          createdAt: '2025-07-17T19:19:00.000Z',
        },
      },
    },
    errorResponses: [
      { status: 400, description: 'Trạng thái không hợp lệ. Chỉ cho phép "Chưa xử lý" hoặc "Đã xử lý"' },
      { status: 400, description: 'Liên hệ đã được xử lý, không thể cập nhật lại trạng thái' },
      { status: 400, description: 'Chỉ có thể cập nhật trạng thái từ "Chưa xử lý" thành "Đã xử lý"' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Không có quyền admin' },
      { status: 404, description: 'Liên hệ không tồn tại' },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database' },
    ],
  },
  {
    method: 'DELETE',
    path: '/api/contacts/:id',
    description: 'Xóa thông tin liên hệ (chỉ admin)',
    fullDescription:
      'Xóa một thông tin liên hệ dựa trên ID. Yêu cầu quyền admin thông qua token JWT.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description:
        'Token JWT của admin được yêu cầu trong header. Token được cấp sau khi đăng nhập qua endpoint `/api/users/login`.',
    },
    parameters: [
      {
        name: 'id',
        type: 'string',
        description: 'ObjectId của thông tin liên hệ',
        required: true,
        in: 'path',
      },
    ],
    response: {
      status: 200,
      description: 'Xóa thông tin liên hệ thành công',
      example: { message: 'Xóa liên hệ thành công' },
    },
    errorResponses: [
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Không có quyền admin' },
      { status: 404, description: 'Liên hệ không tồn tại' },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database' },
    ],
  },
];

export default contactEndpoints;