const commentEndpoints = [
  {
    method: 'POST',
    path: '/api/comments',
    description: 'Tạo bình luận mới',
    fullDescription: 'Tạo một bình luận mới cho sản phẩm với thông tin người dùng, sản phẩm, và nội dung bình luận. Trạng thái bình luận mặc định là `show`. Yêu cầu xác thực thông qua token JWT.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của người dùng được yêu cầu trong header, lấy từ endpoint `/api/auth/login`.'
    },
    parameters: [
      { name: 'userId', type: 'string', description: 'ObjectId của người dùng', required: true },
      { name: 'productId', type: 'string', description: 'ObjectId của sản phẩm', required: true },
      { name: 'content', type: 'string', description: 'Nội dung bình luận', required: true }
    ],
    requestExample: {
      headers: { 'Authorization': 'Bearer <token>' },
      body: {
        userId: '60d5f8e9b1a2b4f8e8f9e2b0',
        productId: '60d5f8e9b1a2b4f8e8f9e2b1',
        content: 'Sản phẩm rất tốt!'
      }
    },
    response: {
      status: 201,
      description: 'Tạo bình luận thành công',
      example: {
        message: 'Tạo bình luận thành công',
        comment: {
          _id: '60d5f8e9b1a2b4f8e8f9e2c4',
          user: {
            _id: '60d5f8e9b1a2b4f8e8f9e2b0',
            username: 'user1',
            email: 'user1@example.com'
          },
          product: {
            _id: '60d5f8e9b1a2b4f8e8f9e2b1',
            name: 'Sản phẩm A',
            price: 100000,
            images: ['image1.jpg']
          },
          content: 'Sản phẩm rất tốt!',
          status: 'show',
          createdAt: '2025-07-09T00:00:00Z',
          updatedAt: '2025-07-09T00:00:00Z'
        }
      }
    },
    errorResponses: [
      { status: 400, description: 'Thiếu thông tin bắt buộc: userId, productId hoặc content' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 404, description: 'Người dùng hoặc sản phẩm không tồn tại' },
      { status: 500, description: 'Lỗi máy chủ' }
    ]
  },
  {
    method: 'GET',
    path: '/api/comments',
    description: 'Lấy tất cả bình luận (admin)',
    fullDescription: 'Trả về danh sách tất cả bình luận trong hệ thống (bao gồm cả trạng thái `show` và `hidden`), với thông tin người dùng và sản phẩm được populate. Yêu cầu quyền admin thông qua token JWT.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của admin được yêu cầu trong header.'
    },
    parameters: [],
    response: {
      status: 200,
      description: 'Danh sách tất cả bình luận',
      example: [
        {
          _id: '60d5f8e9b1a2b4f8e8f9e2c4',
          user: {
            _id: '60d5f8e9b1a2b4f8e8f9e2b0',
            username: 'user1',
            email: 'user1@example.com'
          },
          product: {
            _id: '60d5f8e9b1a2b4f8e8f9e2b1',
            name: 'Sản phẩm A',
            price: 100000,
            images: ['image1.jpg']
          },
          content: 'Sản phẩm rất tốt!',
          status: 'show',
          createdAt: '2025-07-09T00:00:00Z',
          updatedAt: '2025-07-09T00:00:00Z'
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
    path: '/api/comments/product/:productId',
    description: 'Lấy bình luận theo sản phẩm',
    fullDescription: 'Trả về danh sách các bình luận có trạng thái `show` liên quan đến một sản phẩm cụ thể. Không yêu cầu xác thực, có thể truy cập công khai.',
    auth: {
      required: false,
      description: 'Không yêu cầu token. Endpoint này có thể truy cập công khai.'
    },
    parameters: [
      { name: 'productId', type: 'string', description: 'ObjectId của sản phẩm', required: true }
    ],
    response: {
      status: 200,
      description: 'Danh sách bình luận của sản phẩm',
      example: [
        {
          _id: '60d5f8e9b1a2b4f8e8f9e2c4',
          user: {
            _id: '60d5f8e9b1a2b4f8e8f9e2b0',
            username: 'user1',
            email: 'user1@example.com'
          },
          product: {
            _id: '60d5f8e9b1a2b4f8e8f9e2b1',
            name: 'Sản phẩm A',
            price: 100000,
            images: ['image1.jpg']
          },
          content: 'Sản phẩm rất tốt!',
          status: 'show',
          createdAt: '2025-07-09T00:00:00Z',
          updatedAt: '2025-07-09T00:00:00Z'
        }
      ]
    },
    errorResponses: [
      { status: 400, description: 'Thiếu productId trong yêu cầu' },
      { status: 500, description: 'Lỗi máy chủ' }
    ]
  },
  {
    method: 'PUT',
    path: '/api/comments/:commentId',
    description: 'Cập nhật bình luận',
    fullDescription: 'Cập nhật nội dung của một bình luận dựa trên ID. Chỉ người tạo bình luận hoặc admin có thể thực hiện. Yêu cầu xác thực thông qua token JWT.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của người dùng được yêu cầu trong header.'
    },
    parameters: [
      { name: 'commentId', type: 'string', description: 'ObjectId của bình luận', required: true },
      { name: 'userId', type: 'string', description: 'ObjectId của người dùng', required: true },
      { name: 'content', type: 'string', description: 'Nội dung bình luận mới', required: true }
    ],
    requestExample: {
      headers: { 'Authorization': 'Bearer <token>' },
      body: {
        userId: '60d5f8e9b1a2b4f8e8f92b0',
        content: 'Sản phẩm tuyệt vời, chất lượng cao!'
      }
    },
    response: {
      status: 200,
      description: 'Cập nhật bình luận thành công',
      example: {
        message: 'Cập nhật bình luận thành công',
        comment: {
          _id: '60d5f8e9b1a2b4f8e8f9e2c4',
          user: {
            _id: '60d5f8e9b1a2b4f8e8f9e2b0',
            username: 'user1',
            email: 'user1@example.com'
          },
          product: {
            _id: '60d5f8e9b1a2b4f8e8f9e2b1',
            name: 'Sản phẩm A',
            price: 100000,
            images: ['image1.jpg']
          },
          content: 'Sản phẩm tuyệt vời, chất lượng cao!',
          status: 'show',
          createdAt: '2025-07-09T00:00:00Z',
          updatedAt: '2025-07-09T01:00:00Z'
        }
      }
    },
    errorResponses: [
      { status: 400, description: 'Thiếu thông tin bắt buộc: userId, commentId hoặc content' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Không có quyền chỉnh sửa bình luận' },
      { status: 404, description: 'Người dùng hoặc bình luận không tồn tại' },
      { status: 500, description: 'Lỗi máy chủ' }
    ]
  },
  {
    method: 'PUT',
    path: '/api/comments/toggle-visibility/:commentId',
    description: 'Chuyển đổi trạng thái hiển thị bình luận',
    fullDescription: 'Chuyển đổi trạng thái của bình luận giữa `show` và `hidden`. Chỉ admin có thể thực hiện. Yêu cầu xác thực thông qua token JWT.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của admin được yêu cầu trong header.'
    },
    parameters: [
      { name: 'commentId', type: 'string', description: 'ObjectId của bình luận', required: true },
      { name: 'status', type: 'string', description: 'Trạng thái mới của bình luận (`show` hoặc `hidden`)', required: true }
    ],
    requestExample: {
      headers: { 'Authorization': 'Bearer <token>' },
      body: {
        status: 'hidden'
      }
    },
    response: {
      status: 200,
      description: 'Cập nhật trạng thái bình luận thành công',
      example: {
        message: 'Cập nhật trạng thái bình luận thành hidden',
        comment: {
          _id: '60d5f8e9b1a2b4f8e8f9e2c4',
          user: {
            _id: '60d5f8e9b1a2b4f8e8f9e2b0',
            username: 'user1',
            email: 'user1@example.com'
          },
          product: {
            _id: '60d5f8e9b1a2b4f8e8f9e2b1',
            name: 'Sản phẩm A',
            price: 100000,
            images: ['image1.jpg']
          },
          content: 'Sản phẩm rất tốt!',
          status: 'hidden',
          createdAt: '2025-07-09T00:00:00Z',
          updatedAt: '2025-07-09T01:00:00Z'
        }
      }
    },
    errorResponses: [
      { status: 400, description: 'Thiếu thông tin bắt buộc hoặc trạng thái không hợp lệ' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Không có quyền admin' },
      { status: 404, description: 'Bình luận không tồn tại' },
      { status: 500, description: 'Lỗi máy chủ' }
    ]
  },
  {
    method: 'DELETE',
    path: '/api/comments/:commentId',
    description: 'Xóa bình luận',
    fullDescription: 'Xóa một bình luận dựa trên ID. Chỉ người tạo bình luận hoặc admin có thể thực hiện. Yêu cầu xác thực thông qua token JWT.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của người dùng được yêu cầu trong header.'
    },
    parameters: [
      { name: 'commentId', type: 'string', description: 'ObjectId của bình luận', required: true },
      { name: 'userId', type: 'string', description: 'ObjectId của người dùng, gửi qua query hoặc body', required: true }
    ],
    response: {
      status: 200,
      description: 'Xóa bình luận thành polymorphic',
      example: {
        message: 'Xóa bình luận thành công'
      }
    },
    errorResponses: [
      { status: 400, description: 'Thiếu thông tin bắt buộc: userId hoặc commentId' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Không có quyền xóa bình luận' },
      { status: 404, description: 'Người dùng hoặc bình luận không tồn tại' },
      { status: 500, description: 'Lỗi máy chủ' }
    ]
  }
];

export default commentEndpoints;