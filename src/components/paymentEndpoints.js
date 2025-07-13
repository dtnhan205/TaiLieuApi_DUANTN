const paymentEndpoints = [
  {
    method: 'POST',
    path: '/api/payments/create',
    description: 'Tạo thanh toán mới',
    fullDescription: 'Tạo một thanh toán mới cho một đơn hàng với mã thanh toán tự động sinh (định dạng `thanhtoanXXXXX`). Yêu cầu xác thực thông qua token JWT. Thanh toán có trạng thái mặc định là `pending` và sẽ hết hạn sau 24 giờ.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của người dùng được yêu cầu trong header, lấy từ endpoint `/api/auth/login`.'
    },
    parameters: [
      { name: 'amount', type: 'number', description: 'Số tiền thanh toán (số dương)', required: true },
      { name: 'orderId', type: 'string', description: 'ObjectId của đơn hàng', required: true }
    ],
    requestExample: {
      headers: { 'Authorization': 'Bearer <token>' },
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
          orderId: '60d5f8e9b1a2b4f8e8f9e2c7'
        }
      }
    },
    errorResponses: [
      { status: 400, description: 'Thiếu amount/orderId, amount không phải số dương, hoặc orderId không hợp lệ' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 404, description: 'Không tìm thấy đơn hàng' },
      { status: 500, description: 'Lỗi máy chủ' }
    ]
  },
  {
    method: 'POST',
    path: '/api/payments/check-payment',
    description: 'Kiểm tra trạng thái thanh toán',
    fullDescription: 'Kiểm tra trạng thái của một thanh toán dựa trên mã thanh toán và số tiền. Nếu thanh toán còn `pending` và chưa hết hạn (24 giờ), hệ thống sẽ kiểm tra giao dịch ngân hàng để xác minh. Nếu khớp, cập nhật trạng thái thanh toán thành `success` và đơn hàng thành `completed`. Yêu cầu xác thực thông qua token JWT.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của người dùng được yêu cầu trong header.'
    },
    parameters: [
      { name: 'paymentCode', type: 'string', description: 'Mã thanh toán (định dạng `thanhtoanXXXXX`)', required: true },
      { name: 'amount', type: 'number', description: 'Số tiền thanh toán (số dương)', required: true }
    ],
    requestExample: {
      headers: { 'Authorization': 'Bearer <token>' },
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
          orderId: '60d5f8e9b1a2b4f8e8f9e2c7',
          paymentStatus: 'completed',
          shippingStatus: 'pending'
        }
      }
    },
    errorResponses: [
      { status: 400, description: 'Thiếu paymentCode/amount, paymentCode không hợp lệ, amount không khớp, hoặc thanh toán đã hết hạn' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 404, description: 'Thanh toán không tồn tại hoặc đã được xử lý' },
      { status: 500, description: 'Lỗi máy chủ' }
    ]
  },
  {
    method: 'POST',
    path: '/api/payments/get-by-user',
    description: 'Lấy danh sách thanh toán theo người dùng',
    fullDescription: 'Trả về danh sách tất cả thanh toán liên quan đến các đơn hàng của một người dùng dựa trên userId. Bao gồm thông tin chi tiết về thanh toán như mã, số tiền, trạng thái, và giao dịch ngân hàng. Yêu cầu xác thực thông qua token JWT.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của người dùng được yêu cầu trong header.'
    },
    parameters: [
      { name: 'userId', type: 'string', description: 'ObjectId của người dùng', required: true }
    ],
    requestExample: {
      headers: { 'Authorization': 'Bearer <token>' },
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
            transactionDate: '2025-07-09T10:20:00Z',
            createdAt: '2025-07-09T10:18:00Z'
          }
        ]
      }
    },
    errorResponses: [
      { status: 400, description: 'Thiếu userId hoặc userId không hợp lệ' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 500, description: 'Lỗi máy chủ' }
    ]
  }
];

export default paymentEndpoints;