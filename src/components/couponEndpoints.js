const couponEndpoints = [
  {
    method: 'POST',
    path: '/api/coupons',
    description: 'Tạo mã giảm giá mới',
    fullDescription: 'Tạo một mã giảm giá mới với các thông tin như mã, loại giảm giá, giá trị giảm, và các tùy chọn khác. Mã phải duy nhất, loại giảm giá chỉ được là `percentage` hoặc `fixed`, và giá trị giảm phải không âm. Yêu cầu quyền admin thông qua token JWT. Dữ liệu gửi qua `application/json`.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của admin được yêu cầu trong header, lấy từ endpoint `/api/auth/login`.'
    },
    parameters: [
      { name: 'code', type: 'string', description: 'Mã giảm giá, phải duy nhất', required: true, in: 'body' },
      { name: 'discountType', type: 'string', description: 'Loại giảm giá (`percentage` hoặc `fixed`)', required: true, in: 'body' },
      { name: 'discountValue', type: 'number', description: 'Giá trị giảm giá (phần trăm hoặc số tiền cố định, phải không âm)', required: true, in: 'body' },
      { name: 'minOrderValue', type: 'number', description: 'Giá trị đơn hàng tối thiểu để áp dụng mã (mặc định: 0)', required: false, in: 'body' },
      { name: 'expiryDate', type: 'string', description: 'Ngày hết hạn của mã (định dạng ISO, ví dụ: `2025-12-31T23:59:59Z`)', required: false, in: 'body' },
      { name: 'usageLimit', type: 'number', description: 'Số lần sử dụng tối đa của mã (null nếu không giới hạn)', required: false, in: 'body' },
      { name: 'isActive', type: 'boolean', description: 'Trạng thái kích hoạt của mã (mặc định: true)', required: false, in: 'body' },
      { name: 'userId', type: 'string', description: 'ObjectId của người dùng được liên kết với mã (null nếu áp dụng cho tất cả người dùng)', required: false, in: 'body' }
    ],
    requestExample: {
      headers: { 'Authorization': 'Bearer <token>', 'Content-Type': 'application/json' },
      body: {
        code: 'DISCOUNT10',
        discountType: 'percentage',
        discountValue: 10,
        minOrderValue: 100000,
        expiryDate: '2025-12-31T23:59:59Z',
        usageLimit: 100,
        isActive: true,
        userId: null
      }
    },
    response: {
      status: 201,
      description: 'Tạo mã giảm giá thành công',
      example: {
        message: 'Tạo mã giảm giá thành công',
        coupon: {
          _id: '60d5f8e9b1a2b4f8e8f9e2c5',
          code: 'DISCOUNT10',
          discountType: 'percentage',
          discountValue: 10,
          minOrderValue: 100000,
          expiryDate: '2025-12-31T23:59:59Z',
          usageLimit: 100,
          usedCount: 0,
          isActive: true,
          userId: null,
          createdAt: '2025-07-09T00:00:00Z',
          updatedAt: '2025-07-09T00:00:00Z'
        }
      }
    },
    errorResponses: [
      { status: 400, description: 'Thiếu thông tin bắt buộc: code, discountType, hoặc discountValue' },
      { status: 400, description: 'Mã giảm giá đã tồn tại' },
      { status: 400, description: 'Loại giảm giá không hợp lệ, chỉ được là `percentage` hoặc `fixed`' },
      { status: 400, description: 'Giá trị giảm giá phải không âm' },
      { status: 400, description: 'ID người dùng không hợp lệ' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Không có quyền admin' },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database' }
    ]
  },
  {
    method: 'PUT',
    path: '/api/coupons/:id',
    description: 'Cập nhật mã giảm giá',
    fullDescription: 'Cập nhật thông tin mã giảm giá dựa trên ID. Có thể cập nhật bất kỳ trường nào, nhưng mã mới (nếu thay đổi) phải duy nhất. Loại giảm giá chỉ được là `percentage` hoặc `fixed`, và giá trị giảm phải không âm. Yêu cầu quyền admin thông qua token JWT. Dữ liệu gửi qua `application/json`.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của admin được yêu cầu trong header.'
    },
    parameters: [
      { name: 'id', type: 'string', description: 'ObjectId của mã giảm giá', required: true, in: 'path' },
      { name: 'code', type: 'string', description: 'Mã giảm giá mới, phải duy nhất', required: false, in: 'body' },
      { name: 'discountType', type: 'string', description: 'Loại giảm giá mới (`percentage` hoặc `fixed`)', required: false, in: 'body' },
      { name: 'discountValue', type: 'number', description: 'Giá trị giảm giá mới (phải không âm)', required: false, in: 'body' },
      { name: 'minOrderValue', type: 'number', description: 'Giá trị đơn hàng tối thiểu mới', required: false, in: 'body' },
      { name: 'expiryDate', type: 'string', description: 'Ngày hết hạn mới (định dạng ISO)', required: false, in: 'body' },
      { name: 'usageLimit', type: 'number', description: 'Số lần sử dụng tối đa mới', required: false, in: 'body' },
      { name: 'isActive', type: 'boolean', description: 'Trạng thái kích hoạt mới', required: false, in: 'body' },
      { name: 'userId', type: 'string', description: 'ObjectId của người dùng được liên kết với mã (null nếu áp dụng cho tất cả người dùng)', required: false, in: 'body' }
    ],
    requestExample: {
      headers: { 'Authorization': 'Bearer <token>', 'Content-Type': 'application/json' },
      body: {
        code: 'DISCOUNT10',
        discountType: 'fixed',
        discountValue: 20000,
        isActive: false,
        userId: null
      }
    },
    response: {
      status: 200,
      description: 'Cập nhật mã giảm giá thành công',
      example: {
        message: 'Cập nhật mã giảm giá thành công',
        coupon: {
          _id: '60d5f8e9b1a2b4f8e8f9e2c5',
          code: 'DISCOUNT10',
          discountType: 'fixed',
          discountValue: 20000,
          minOrderValue: 100000,
          expiryDate: '2025-12-31T23:59:59Z',
          usageLimit: 100,
          usedCount: 0,
          isActive: false,
          userId: null,
          createdAt: '2025-07-09T00:00:00Z',
          updatedAt: '2025-07-09T01:00:00Z'
        }
      }
    },
    errorResponses: [
      { status: 400, description: 'ID mã giảm giá không hợp lệ' },
      { status: 400, description: 'Mã giảm giá mới đã tồn tại' },
      { status: 400, description: 'Loại giảm giá không hợp lệ, chỉ được là `percentage` hoặc `fixed`' },
      { status: 400, description: 'Giá trị giảm giá phải không âm' },
      { status: 400, description: 'ID người dùng không hợp lệ' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Không có quyền admin' },
      { status: 404, description: 'Mã giảm giá không tồn tại' },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database' }
    ]
  },
  {
    method: 'DELETE',
    path: '/api/coupons/:id',
    description: 'Xóa mã giảm giá',
    fullDescription: 'Xóa một mã giảm giá dựa trên ID. Yêu cầu quyền admin thông qua token JWT.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của admin được yêu cầu trong header.'
    },
    parameters: [
      { name: 'id', type: 'string', description: 'ObjectId của mã giảm giá', required: true, in: 'path' }
    ],
    response: {
      status: 200,
      description: 'Xóa mã giảm giá thành công',
      example: {
        message: 'Xóa mã giảm giá thành công'
      }
    },
    errorResponses: [
      { status: 400, description: 'ID mã giảm giá không hợp lệ' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Không có quyền admin' },
      { status: 404, description: 'Mã giảm giá không tồn tại' },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database' }
    ]
  },
  {
    method: 'GET',
    path: '/api/coupons',
    description: 'Lấy danh sách mã giảm giá',
    fullDescription: 'Trả về danh sách mã giảm giá với phân trang, không bao gồm trường `usedCount`. Hỗ trợ query `page`, `limit`, `code`, và `isActive`. Yêu cầu xác thực thông qua token JWT, có thể truy cập bởi bất kỳ người dùng đã đăng nhập, không yêu cầu quyền admin.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của người dùng được yêu cầu trong header, lấy từ endpoint `/api/auth/login`.'
    },
    parameters: [
      { name: 'page', type: 'number', description: 'Số trang (mặc định: 1)', required: false, in: 'query' },
      { name: 'limit', type: 'number', description: 'Số lượng mã mỗi trang (mặc định: 9)', required: false, in: 'query' },
      { name: 'code', type: 'string', description: 'Lọc theo mã giảm giá (không phân biệt hoa thường)', required: false, in: 'query' },
      { name: 'isActive', type: 'boolean', description: 'Lọc theo trạng thái kích hoạt (true hoặc false)', required: false, in: 'query' }
    ],
    response: {
      status: 200,
      description: 'Lấy danh sách mã giảm giá thành công',
      example: {
        coupons: [
          {
            _id: '60d5f8e9b1a2b4f8e8f9e2c5',
            code: 'DISCOUNT10',
            discountType: 'percentage',
            discountValue: 10,
            minOrderValue: 100000,
            expiryDate: '2025-12-31T23:59:59Z',
            usageLimit: 100,
            isActive: true,
            userId: null,
            createdAt: '2025-07-09T00:00:00Z',
            updatedAt: '2025-07-09T00:00:00Z'
          }
        ],
        pagination: {
          page: 1,
          limit: 9,
          total: 1,
          totalPages: 1
        }
      }
    },
    errorResponses: [
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database' }
    ]
  },
  {
    method: 'GET',
    path: '/api/coupons/:id',
    description: 'Lấy chi tiết mã giảm giá',
    fullDescription: 'Trả về chi tiết một mã giảm giá dựa trên ID, không bao gồm trường `usedCount`. Yêu cầu xác thực thông qua token JWT, có thể truy cập bởi bất kỳ người dùng đã đăng nhập, không yêu cầu quyền admin.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của người dùng được yêu cầu trong header, lấy từ endpoint `/api/auth/login`.'
    },
    parameters: [
      { name: 'id', type: 'string', description: 'ObjectId của mã giảm giá', required: true, in: 'path' }
    ],
    response: {
      status: 200,
      description: 'Lấy chi tiết mã giảm giá thành công',
      example: {
        coupon: {
          _id: '60d5f8e9b1a2b4f8e8f9e2c5',
          code: 'DISCOUNT10',
          discountType: 'percentage',
          discountValue: 10,
          minOrderValue: 100000,
          expiryDate: '2025-12-31T23:59:59Z',
          usageLimit: 100,
          isActive: true,
          userId: null,
          createdAt: '2025-07-09T00:00:00Z',
          updatedAt: '2025-07-09T00:00:00Z'
        }
      }
    },
    errorResponses: [
      { status: 400, description: 'ID mã giảm giá không hợp lệ' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 404, description: 'Mã giảm giá không tồn tại' },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database' }
    ]
  },
  {
    method: 'GET',
    path: '/api/coupons/user/:userId',
    description: 'Lấy danh sách mã giảm giá theo userId',
    fullDescription: 'Trả về danh sách mã giảm giá liên kết với một userId cụ thể, hỗ trợ phân trang và lọc theo trạng thái kích hoạt. Không bao gồm trường `usedCount`. Yêu cầu xác thực thông qua token JWT, có thể truy cập bởi bất kỳ người dùng đã đăng nhập, không yêu cầu quyền admin.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của người dùng được yêu cầu trong header, lấy từ endpoint `/api/auth/login`.'
    },
    parameters: [
      { name: 'userId', type: 'string', description: 'ObjectId của người dùng', required: true, in: 'path' },
      { name: 'page', type: 'number', description: 'Số trang (mặc định: 1)', required: false, in: 'query' },
      { name: 'limit', type: 'number', description: 'Số lượng mã mỗi trang (mặc định: 9)', required: false, in: 'query' },
      { name: 'isActive', type: 'boolean', description: 'Lọc theo trạng thái kích hoạt (true hoặc false)', required: false, in: 'query' }
    ],
    requestExample: {
      headers: { 'Authorization': 'Bearer <token>' },
      query: {
        page: 1,
        limit: 9,
        isActive: true
      }
    },
    response: {
      status: 200,
      description: 'Lấy danh sách mã giảm giá theo userId thành công',
      example: {
        coupons: [
          {
            _id: '60d5f8e9b1a2b4f8e8f9e2c6',
            code: 'USERDISCOUNT',
            discountType: 'fixed',
            discountValue: 50000,
            minOrderValue: 200000,
            expiryDate: '2025-12-31T23:59:59Z',
            usageLimit: 1,
            isActive: true,
            userId: {
              _id: '507f1f77bcf86cd799439011',
              email: 'user@example.com',
              username: 'username'
            },
            createdAt: '2025-07-09T00:00:00Z',
            updatedAt: '2025-07-09T00:00:00Z'
          }
        ],
        pagination: {
          page: 1,
          limit: 9,
          total: 1,
          totalPages: 1
        }
      }
    },
    errorResponses: [
      { status: 400, description: 'ID người dùng không hợp lệ' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 404, description: 'Người dùng không tồn tại' },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database' }
    ]
  },
  {
    method: 'POST',
    path: '/api/coupons/check/:code',
    description: 'Kiểm tra mã giảm giá',
    fullDescription: 'Kiểm tra tính hợp lệ của một mã giảm giá dựa trên mã và userId (nếu có). Mã phải đang hoạt động, chưa hết hạn, chưa vượt giới hạn sử dụng, và đáp ứng giá trị đơn hàng tối thiểu. Nếu mã có userId cụ thể, chỉ người dùng với userId khớp mới có thể sử dụng. Nếu mã không có userId, bất kỳ người dùng nào cũng có thể sử dụng. Yêu cầu xác thực thông qua token JWT, có thể truy cập bởi bất kỳ người dùng đã đăng nhập.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của người dùng được yêu cầu trong header, lấy từ endpoint `/api/auth/login`.'
    },
    parameters: [
      { name: 'code', type: 'string', description: 'Mã giảm giá cần kiểm tra', required: true, in: 'path' },
      { name: 'userId', type: 'string', description: 'ObjectId của người dùng (bắt buộc nếu mã giảm giá liên kết với một userId cụ thể, không bắt buộc nếu mã áp dụng cho tất cả người dùng)', required: false, in: 'body' },
      { name: 'orderValue', type: 'number', description: 'Giá trị đơn hàng để kiểm tra điều kiện minOrderValue (mặc định: 0)', required: false, in: 'body' }
    ],
    requestExample: {
      headers: { 'Authorization': 'Bearer <token>', 'Content-Type': 'application/json' },
      params: { code: 'DISCOUNT10' },
      body: {
        userId: '507f1f77bcf86cd799439011',
        orderValue: 150000
      }
    },
    response: {
      status: 200,
      description: 'Mã giảm giá hợp lệ',
      example: {
        message: 'Mã giảm giá hợp lệ',
        coupon: {
          code: 'DISCOUNT10',
          discountType: 'percentage',
          discountValue: 10,
          minOrderValue: 100000,
          expiryDate: '2025-12-31T23:59:59Z'
        }
      }
    },
    errorResponses: [
      { status: 400, description: 'Mã giảm giá là bắt buộc' },
      { status: 400, description: 'ID người dùng không hợp lệ' },
      { status: 400, description: 'Mã giảm giá này chỉ áp dụng cho người dùng cụ thể' },
      { status: 400, description: 'Mã giảm giá đã hết hạn' },
      { status: 400, description: 'Mã giảm giá đã đạt giới hạn sử dụng' },
      { status: 400, description: 'Đơn hàng phải đạt tối thiểu <minOrderValue> VNĐ' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Bạn không có quyền sử dụng mã giảm giá này' },
      { status: 404, description: 'Mã giảm giá không tồn tại hoặc không hoạt động' },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database' }
    ]
  }
];

export default couponEndpoints;