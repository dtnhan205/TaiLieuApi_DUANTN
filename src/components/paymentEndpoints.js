const paymentEndpoints = [
  {
    method: 'POST',
    path: '/api/payments/create',
    description: 'Tạo thanh toán mới',
    fullDescription: 'Tạo một thanh toán mới cho một đơn hàng với mã thanh toán tự động sinh (định dạng `thanhtoanXXXXX`). Thanh toán có trạng thái mặc định là `pending` và sẽ hết hạn sau 24 giờ nếu không được xác minh. Yêu cầu xác thực thông qua token JWT. Người dùng phải là chủ sở hữu đơn hàng hoặc admin.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của người dùng được yêu cầu trong header, lấy từ endpoint `/api/users/login`.'
    },
    parameters: [
      { name: 'amount', type: 'number', description: 'Số tiền thanh toán (số dương)', required: true, in: 'body' },
      { name: 'orderId', type: 'string', description: 'ObjectId của đơn hàng', required: true, in: 'body' }
    ],
    requestExample: {
      headers: { 'Authorization': 'Bearer <token>', 'Content-Type': 'application/json' },
      body: {
        amount: 200000,
        orderId: '60d5f8e9b1a2b4f8e8f9e2c7'
      }
    },
    response: {
      status: 201,
      description: 'Tạo thanh toán thành công',
      example: {
        status: 'success',
        message: 'Tạo thanh toán thành công',
        data: {
          paymentCode: 'thanhtoan12345',
          amount: 200000,
          orderId: '60d5f8e9b1a2b4f8e8f9e2c7',
          createdAt: '2025-07-09T10:18:00Z'
        }
      }
    },
    errorResponses: [
      { status: 400, description: 'Thiếu amount/orderId, amount không phải số dương, hoặc orderId không hợp lệ' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Người dùng không có quyền tạo thanh toán cho đơn hàng này' },
      { status: 404, description: 'Không tìm thấy đơn hàng' },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database' }
    ]
  },
  {
    method: 'POST',
    path: '/api/payments/check-payment',
    description: 'Kiểm tra trạng thái thanh toán',
    fullDescription: 'Kiểm tra trạng thái của một thanh toán dựa trên mã thanh toán và số tiền. Nếu thanh toán còn `pending` và chưa hết hạn (24 giờ), hệ thống sẽ kiểm tra giao dịch ngân hàng để xác minh. Nếu khớp, cập nhật trạng thái thanh toán thành `success` và đơn hàng thành `completed`. Nếu không tìm thấy giao dịch khớp, trả về trạng thái hiện tại của thanh toán. Yêu cầu xác thực thông qua token JWT. Người dùng phải là chủ sở hữu đơn hàng hoặc admin.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của người dùng được yêu cầu trong header, lấy từ endpoint `/api/users/login`.'
    },
    parameters: [
      { name: 'paymentCode', type: 'string', description: 'Mã thanh toán (định dạng `thanhtoanXXXXX`)', required: true, in: 'body' },
      { name: 'amount', type: 'number', description: 'Số tiền thanh toán (số dương)', required: true, in: 'body' }
    ],
    requestExample: {
      headers: { 'Authorization': 'Bearer <token>', 'Content-Type': 'application/json' },
      body: {
        paymentCode: 'thanhtoan12345',
        amount: 200000
      }
    },
    response: {
      status: 200,
      description: 'Kiểm tra trạng thái thanh toán thành công',
      example: {
        status: 'success',
        message: 'Xác minh thanh toán thành công',
        data: {
          paymentCode: 'thanhtoan12345',
          status: 'success',
          transactionId: 'TX123456789',
          description: 'Thanh toán cho đơn hàng',
          orderId: '60d5f8e9b1a2b4f8e8f9e2c7',
          paymentStatus: 'completed',
          shippingStatus: 'pending',
          createdAt: '2025-07-09T10:18:00Z',
          transactionDate: '09/07/2025 10:20:00'
        }
      }
    },
    errorResponses: [
      { status: 400, description: 'Thiếu paymentCode/amount, paymentCode không hợp lệ, amount không khớp, hoặc thanh toán đã hết hạn' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Người dùng không có quyền kiểm tra thanh toán này' },
      { status: 404, description: 'Thanh toán không tồn tại hoặc không tìm thấy đơn hàng liên quan' },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database hoặc lỗi API ngân hàng' }
    ]
  },
  {
    method: 'POST',
    path: '/api/payments/get-by-user',
    description: 'Lấy danh sách thanh toán theo người dùng',
    fullDescription: 'Trả về danh sách tất cả thanh toán liên quan đến các đơn hàng của một người dùng dựa trên userId. Người dùng chỉ có thể lấy danh sách thanh toán của chính mình, trừ khi là admin. Bao gồm thông tin chi tiết như mã thanh toán, số tiền, trạng thái, và giao dịch ngân hàng. Yêu cầu xác thực thông qua token JWT.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của người dùng được yêu cầu trong header, lấy từ endpoint `/api/users/login`.'
    },
    parameters: [
      { name: 'userId', type: 'string', description: 'ObjectId của người dùng (phải khớp với userId trong token nếu không phải admin)', required: true, in: 'body' }
    ],
    requestExample: {
      headers: { 'Authorization': 'Bearer <token>', 'Content-Type': 'application/json' },
      body: {
        userId: '60d5f8e9b1a2b4f8e8f9e2b0'
      }
    },
    response: {
      status: 200,
      description: 'Lấy danh sách thanh toán thành công',
      example: {
        status: 'success',
        message: 'Lấy thông tin thanh toán thành công',
        data: [
          {
            paymentCode: 'thanhtoan12345',
            amount: 200000,
            status: 'success',
            transactionId: 'TX123456789',
            orderId: '60d5f8e9b1a2b4f8e8f9e2c7',
            description: 'Thanh toán cho đơn hàng',
            createdAt: '2025-07-09T10:18:00Z',
            transactionDate: '09/07/2025 10:20:00'
          }
        ]
      }
    },
    errorResponses: [
      { status: 400, description: 'Thiếu userId hoặc userId không hợp lệ' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Người dùng không có quyền lấy danh sách thanh toán này' },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database' }
    ]
  },
  {
    method: 'POST',
    path: '/api/payments/get-payments',
    description: 'Lấy tất cả thông tin thanh toán',
    fullDescription: 'Trả về danh sách tất cả thanh toán trong hệ thống, có thể lọc theo userId hoặc orderId. Bao gồm thông tin chi tiết như mã thanh toán, số tiền, thời gian giao dịch, tên người chuyển khoản (từ username của user hoặc nội dung giao dịch), mô tả, trạng thái, và ID đơn hàng. Yêu cầu xác thực và quyền admin thông qua token JWT.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của người dùng với vai trò admin được yêu cầu trong header, lấy từ endpoint `/api/users/login`.'
    },
    parameters: [
      { name: 'userId', type: 'string', description: 'ObjectId của người dùng (tùy chọn, dùng để lọc theo người dùng)', required: false, in: 'body' },
      { name: 'orderId', type: 'string', description: 'ObjectId của đơn hàng (tùy chọn, dùng để lọc theo đơn hàng)', required: false, in: 'body' }
    ],
    requestExample: {
      headers: { 'Authorization': 'Bearer <admin-token>', 'Content-Type': 'application/json' },
      body: {
        userId: '60d5f8e9b1a2b4f8e8f9e2b0', // Tùy chọn
        orderId: '60d5f8e9b1a2b4f8e8f9e2c7' // Tùy chọn
      }
    },
    response: {
      status: 200,
      description: 'Lấy tất cả thông tin thanh toán thành công',
      example: {
        status: 'success',
        message: 'Lấy thông tin thanh toán thành công',
        data: [
          {
            paymentCode: 'thanhtoan12345',
            amount: 200000,
            transactionDate: '09/07/2025 10:20:00',
            bankUserName: 'Nguyen Van A',
            description: 'Thanh toán cho đơn hàng',
            status: 'success',
            orderId: '60d5f8e9b1a2b4f8e8f9e2c7',
            createdAt: '2025-07-09T10:18:00Z'
          }
        ]
      }
    },
    errorResponses: [
      { status: 400, description: 'userId hoặc orderId không hợp lệ nếu được cung cấp' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Không có quyền admin' },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database' }
    ]
  }
];

export default paymentEndpoints;