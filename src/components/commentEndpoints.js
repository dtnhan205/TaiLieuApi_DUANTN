const commentEndpoints = [
  {
    method: 'POST',
    path: '/api/comments',
    description: 'Tạo bình luận mới',
    fullDescription: 'Tạo một bình luận mới cho sản phẩm với thông tin người dùng, sản phẩm, nội dung, và đánh giá sao. Người dùng phải có đơn hàng hoàn tất (đã thanh toán và giao hàng thành công) để được bình luận. Hỗ trợ tải lên hình ảnh và video. Trạng thái bình luận mặc định là `show`. Yêu cầu xác thực thông qua token JWT.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của người dùng được yêu cầu trong header, lấy từ endpoint `/api/auth/login`.'
    },
    parameters: [
      { name: 'userId', type: 'string', description: 'ObjectId của người dùng', required: true, in: 'body' },
      { name: 'productId', type: 'string', description: 'ObjectId của sản phẩm', required: true, in: 'body' },
      { name: 'content', type: 'string', description: 'Nội dung bình luận (tối đa 500 ký tự)', required: true, in: 'body' },
      { name: 'rating', type: 'number', description: 'Đánh giá sao (số nguyên từ 1 đến 5)', required: true, in: 'body' },
      { name: 'images', type: 'file', description: 'Hình ảnh đính kèm (multipart/form-data)', required: false, in: 'formData' },
      { name: 'commentVideo', type: 'file', description: 'Video đính kèm (multipart/form-data)', required: false, in: 'formData' }
    ],
    requestExample: {
      headers: { 'Authorization': 'Bearer <token>', 'Content-Type': 'multipart/form-data' },
      body: {
        userId: '60d5f8e9b1a2b4f8e8f9e2b0',
        productId: '60d5f8e9b1a2b4f8e8f9e2b1',
        content: 'Sản phẩm rất tốt!',
        rating: 5,
        images: ['<file>'],
        commentVideo: ['<file>']
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
            email: 'user1@example.com',
            role: 'user'
          },
          product: {
            _id: '60d5f8e9b1a2b4f8e8f9e2b1',
            name: 'Sản phẩm A',
            price: 100000,
            images: ['image1.jpg']
          },
          content: 'Sản phẩm rất tốt!',
          rating: 5,
          images: [{ url: 'image1.jpg', public_id: 'image1' }],
          videos: [],
          status: 'show',
          createdAt: '2025-07-09T00:00:00Z',
          updatedAt: '2025-07-09T00:00:00Z'
        }
      }
    },
    errorResponses: [
      { status: 400, description: 'Thiếu thông tin bắt buộc: userId, productId, content, hoặc rating' },
      { status: 400, description: 'Đánh giá sao phải là số nguyên từ 1 đến 5' },
      { status: 400, description: 'Lỗi tải tệp (images hoặc videos)' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Bạn đã bình luận cho sản phẩm này rồi' },
      { status: 403, description: 'Bạn chỉ có thể đánh giá sản phẩm sau khi mua, thanh toán và nhận hàng thành công' },
      { status: 404, description: 'Người dùng hoặc sản phẩm không tồn tại' },
      { status: 500, description: 'Lỗi máy chủ' }
    ]
  },
  {
    method: 'GET',
    path: '/api/comments',
    description: 'Lấy tất cả bình luận (admin)',
    fullDescription: 'Trả về danh sách tất cả bình luận trong hệ thống (bao gồm cả trạng thái `show` và `hidden`), với thông tin người dùng, sản phẩm, và phản hồi admin được populate. Yêu cầu quyền admin thông qua token JWT.',
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
            email: 'user1@example.com',
            role: 'user'
          },
          product: {
            _id: '60d5f8e9b1a2b4f8e8f9e2b1',
            name: 'Sản phẩm A',
            price: 100000,
            images: ['image1.jpg']
          },
          content: 'Sản phẩm rất tốt!',
          rating: 5,
          status: 'show',
          createdAt: '2025-07-09T00:00:00Z',
          updatedAt: '2025-07-09T00:00:00Z',
          adminReply: null
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
    fullDescription: 'Trả về danh sách các bình luận có trạng thái `show` liên quan đến một sản phẩm cụ thể, với thông tin người dùng, sản phẩm, và phản hồi admin được populate. Không yêu cầu xác thực, có thể truy cập công khai.',
    auth: {
      required: false,
      description: 'Không yêu cầu token. Endpoint này có thể truy cập công khai.'
    },
    parameters: [
      { name: 'productId', type: 'string', description: 'ObjectId của sản phẩm', required: true, in: 'path' }
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
            email: 'user1@example.com',
            role: 'user'
          },
          product: {
            _id: '60d5f8e9b1a2b4f8e8f9e2b1',
            name: 'Sản phẩm A',
            price: 100000,
            images: ['image1.jpg']
          },
          content: 'Sản phẩm rất tốt!',
          rating: 5,
          status: 'show',
          createdAt: '2025-07-09T00:00:00Z',
          updatedAt: '2025-07-09T00:00:00Z',
          adminReply: null
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
    fullDescription: 'Cập nhật nội dung, đánh giá sao, hình ảnh, hoặc video của một bình luận dựa trên ID. Chỉ người tạo bình luận hoặc admin có thể thực hiện. Yêu cầu xác thực thông qua token JWT.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của người dùng được yêu cầu trong header.'
    },
    parameters: [
      { name: 'commentId', type: 'string', description: 'ObjectId của bình luận', required: true, in: 'path' },
      { name: 'userId', type: 'string', description: 'ObjectId của người dùng', required: true, in: 'body' },
      { name: 'content', type: 'string', description: 'Nội dung bình luận mới (tối đa 500 ký tự)', required: true, in: 'body' },
      { name: 'rating', type: 'number', description: 'Đánh giá sao mới (số nguyên từ 1 đến 5)', required: true, in: 'body' },
      { name: 'images', type: 'file', description: 'Hình ảnh đính kèm mới (multipart/form-data)', required: false, in: 'formData' },
      { name: 'commentVideo', type: 'file', description: 'Video đính kèm mới (multipart/form-data)', required: false, in: 'formData' }
    ],
    requestExample: {
      headers: { 'Authorization': 'Bearer <token>', 'Content-Type': 'multipart/form-data' },
      body: {
        userId: '60d5f8e9b1a2b4f8e8f9e2b0',
        content: 'Sản phẩm tuyệt vời, chất lượng cao!',
        rating: 4,
        images: ['<file>'],
        commentVideo: ['<file>']
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
            email: 'user1@example.com',
            role: 'user'
          },
          product: {
            _id: '60d5f8e9b1a2b4f8e8f9e2b1',
            name: 'Sản phẩm A',
            price: 100000,
            images: ['image1.jpg']
          },
          content: 'Sản phẩm tuyệt vời, chất lượng cao!',
          rating: 4,
          images: [{ url: 'image2.jpg', public_id: 'image2' }],
          videos: [],
          status: 'show',
          createdAt: '2025-07-09T00:00:00Z',
          updatedAt: '2025-07-09T01:00:00Z'
        }
      }
    },
    errorResponses: [
      { status: 400, description: 'Thiếu thông tin bắt buộc: userId, commentId, content, hoặc rating' },
      { status: 400, description: 'Đánh giá sao phải là số nguyên từ 1 đến 5' },
      { status: 400, description: 'Lỗi tải tệp (images hoặc videos)' },
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
      { name: 'commentId', type: 'string', description: 'ObjectId của bình luận', required: true, in: 'path' },
      { name: 'status', type: 'string', description: 'Trạng thái mới của bình luận (`show` hoặc `hidden`)', required: true, in: 'body' }
    ],
    requestExample: {
      headers: { 'Authorization': 'Bearer <token>' },
      body: { status: 'hidden' }
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
            email: 'user1@example.com',
            role: 'user'
          },
          product: {
            _id: '60d5f8e9b1a2b4f8e8f9e2b1',
            name: 'Sản phẩm A',
            price: 100000,
            images: ['image1.jpg']
          },
          content: 'Sản phẩm rất tốt!',
          rating: 5,
          status: 'hidden',
          createdAt: '2025-07-09T00:00:00Z',
          updatedAt: '2025-07-09T01:00:00Z'
        }
      }
    },
    errorResponses: [
      { status: 400, description: 'Thiếu thông tin bắt buộc hoặc trạng thái không hợp lệ (phải là "show" hoặc "hidden")' },
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
      { name: 'commentId', type: 'string', description: 'ObjectId của bình luận', required: true, in: 'path' },
      { name: 'userId', type: 'string', description: 'ObjectId của người dùng, gửi qua query hoặc body', required: true, in: 'body' }
    ],
    response: {
      status: 200,
      description: 'Xóa bình luận thành công',
      example: { message: 'Xóa bình luận thành công' }
    },
    errorResponses: [
      { status: 400, description: 'Thiếu thông tin bắt buộc: userId hoặc commentId' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Không có quyền xóa bình luận' },
      { status: 404, description: 'Người dùng hoặc bình luận không tồn tại' },
      { status: 500, description: 'Lỗi máy chủ' }
    ]
  },
  {
    method: 'POST',
    path: '/api/comments/:commentId/reply',
    description: 'Thêm phản hồi admin',
    fullDescription: 'Thêm phản hồi từ admin cho một bình luận dựa trên ID. Chỉ admin có thể thực hiện. Yêu cầu xác thực thông qua token JWT.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của admin được yêu cầu trong header.'
    },
    parameters: [
      { name: 'commentId', type: 'string', description: 'ObjectId của bình luận', required: true, in: 'path' },
      { name: 'content', type: 'string', description: 'Nội dung phản hồi (tối đa 500 ký tự)', required: true, in: 'body' }
    ],
    requestExample: {
      headers: { 'Authorization': 'Bearer <token>' },
      body: { content: 'Cảm ơn bạn đã đánh giá! Chúng tôi sẽ cải thiện dịch vụ.' }
    },
    response: {
      status: 200,
      description: 'Phản hồi từ admin đã được gửi',
      example: {
        message: 'Phản hồi từ admin đã được gửi',
        comment: {
          _id: '60d5f8e9b1a2b4f8e8f9e2c4',
          user: {
            _id: '60d5f8e9b1a2b4f8e8f9e2b0',
            username: 'user1',
            email: 'user1@example.com',
            role: 'user'
          },
          product: {
            _id: '60d5f8e9b1a2b4f8e8f9e2b1',
            name: 'Sản phẩm A',
            price: 100000,
            images: ['image1.jpg']
          },
          content: 'Sản phẩm rất tốt!',
          rating: 5,
          status: 'show',
          createdAt: '2025-07-09T00:00:00Z',
          updatedAt: '2025-07-09T01:00:00Z',
          adminReply: {
            user: {
              _id: '60d5f8e9b1a2b4f8e8f9e2b2',
              username: 'admin1',
              email: 'admin1@example.com',
              role: 'admin'
            },
            content: 'Cảm ơn bạn đã đánh giá! Chúng tôi sẽ cải thiện dịch vụ.',
            createdAt: '2025-07-09T01:00:00Z'
          }
        }
      }
    },
    errorResponses: [
      { status: 400, description: 'Thiếu thông tin bắt buộc: commentId hoặc content' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Không có quyền admin' },
      { status: 403, description: 'Bình luận này đã có phản hồi từ admin' },
      { status: 404, description: 'Bình luận không tồn tại' },
      { status: 500, description: 'Lỗi máy chủ' }
    ]
  },
  {
    method: 'PUT',
    path: '/api/comments/reply/:commentId',
    description: 'Cập nhật phản hồi admin',
    fullDescription: 'Cập nhật nội dung phản hồi từ admin cho một bình luận dựa trên ID. Chỉ admin có thể thực hiện. Yêu cầu xác thực thông qua token JWT.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của admin được yêu cầu trong header.'
    },
    parameters: [
      { name: 'commentId', type: 'string', description: 'ObjectId của bình luận', required: true, in: 'path' },
      { name: 'content', type: 'string', description: 'Nội dung phản hồi mới (tối đa 500 ký tự)', required: true, in: 'body' }
    ],
    requestExample: {
      headers: { 'Authorization': 'Bearer <token>' },
      body: { content: 'Cảm ơn bạn đã đánh giá! Chúng tôi đã cập nhật thông tin.' }
    },
    response: {
      status: 200,
      description: 'Cập nhật phản hồi admin thành công',
      example: {
        message: 'Cập nhật phản hồi admin thành công',
        comment: {
          _id: '60d5f8e9b1a2b4f8e8f9e2c4',
          user: {
            _id: '60d5f8e9b1a2b4f8e8f9e2b0',
            username: 'user1',
            email: 'user1@example.com',
            role: 'user'
          },
          product: {
            _id: '60d5f8e9b1a2b4f8e8f9e2b1',
            name: 'Sản phẩm A',
            price: 100000,
            images: ['image1.jpg']
          },
          content: 'Sản phẩm rất tốt!',
          rating: 5,
          status: 'show',
          createdAt: '2025-07-09T00:00:00Z',
          updatedAt: '2025-07-09T01:00:00Z',
          adminReply: {
            user: {
              _id: '60d5f8e9b1a2b4f8e8f9e2b2',
              username: 'admin1',
              email: 'admin1@example.com',
              role: 'admin'
            },
            content: 'Cảm ơn bạn đã đánh giá! Chúng tôi đã cập nhật thông tin.',
            createdAt: '2025-07-09T01:00:00Z',
            updatedAt: '2025-07-09T02:00:00Z'
          }
        }
      }
    },
    errorResponses: [
      { status: 400, description: 'Thiếu thông tin bắt buộc: commentId hoặc content' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Không có quyền admin' },
      { status: 404, description: 'Bình luận hoặc phản hồi admin không tồn tại' },
      { status: 500, description: 'Lỗi máy chủ' }
    ]
  }
];

export default commentEndpoints;