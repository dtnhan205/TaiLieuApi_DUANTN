const vnpayEndpoints = [
  {
    method: 'POST',
    path: '/api/vnpay/create-payment',
    description: 'Tạo thanh toán mới với VNPay',
    fullDescription:
      'Tạo một URL thanh toán VNPay cho một đơn hàng cụ thể. Yêu cầu thông tin đơn hàng và số tiền thanh toán. Trả về URL thanh toán và mã thanh toán để người dùng thực hiện thanh toán. Không yêu cầu xác thực.',
    auth: {
      required: false,
      description: 'Không yêu cầu token. Endpoint này có thể truy cập công khai.',
    },
    parameters: [
      {
        name: 'amount',
        type: 'number',
        description: 'Số tiền thanh toán (phải là số dương)',
        required: true,
        in: 'body',
      },
      {
        name: 'orderId',
        type: 'string',
        description: 'ObjectId của đơn hàng',
        required: true,
        in: 'body',
      },
    ],
    requestExample: {
      headers: { 'Content-Type': 'application/json' },
      body: {
        amount: 100000,
        orderId: '60d5f8e9b1a2b4f8e8f9e2b7',
      },
    },
    response: {
      status: 201,
      description: 'Tạo thanh toán thành công',
      example: {
        status: 'success',
        message: 'Tạo thanh toán thành công',
        data: {
          paymentUrl: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?...',
          paymentCode: 'thanhtoan12345',
          amount: 100000,
          orderId: '60d5f8e9b1a2b4f8e8f9e2b7',
        },
      },
    },
    errorResponses: [
      { status: 400, description: 'Dữ liệu không hợp lệ (số tiền không phải số dương hoặc orderId không hợp lệ)' },
      { status: 404, description: 'Không tìm thấy đơn hàng' },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database hoặc xử lý thanh toán' },
    ],
  },
  {
    method: 'POST',
    path: '/api/vnpay/verify-payment',
    description: 'Xác minh thanh toán thủ công',
    fullDescription:
      'Xác minh thủ công một thanh toán VNPay dựa trên mã thanh toán và số tiền. Nếu thanh toán hợp lệ, trạng thái thanh toán được cập nhật thành `success`, và đơn hàng liên quan được cập nhật trạng thái thanh toán thành `completed` và trạng thái giao hàng thành `pending`. Không yêu cầu xác thực.',
    auth: {
      required: false,
      description: 'Không yêu cầu token. Endpoint này có thể truy cập công khai.',
    },
    parameters: [
      {
        name: 'paymentCode',
        type: 'string',
        description: 'Mã thanh toán (định dạng: thanhtoanXXXXX, với XXXXX là 5 chữ số)',
        required: true,
        in: 'body',
      },
      {
        name: 'amount',
        type: 'number',
        description: 'Số tiền thanh toán (phải là số dương)',
        required: true,
        in: 'body',
      },
    ],
    requestExample: {
      headers: { 'Content-Type': 'application/json' },
      body: {
        paymentCode: 'thanhtoan12345',
        amount: 100000,
      },
    },
    response: {
      status: 200,
      description: 'Xác minh thanh toán thành công (thủ công)',
      example: {
        status: 'success',
        message: 'Xác minh thanh toán thành công (thủ công)',
        data: {
          transactionId: 'manual_transaction_id',
          orderId: '60d5f8e9b1a2b4f8e8f9e2b7',
          paymentStatus: 'completed',
          shippingStatus: 'pending',
        },
      },
    },
    errorResponses: [
      { status: 400, description: 'Mã thanh toán không hợp lệ hoặc số tiền không khớp' },
      { status: 400, description: 'Thanh toán đã hết hạn' },
      { status: 404, description: 'Thanh toán không tồn tại hoặc không tìm thấy đơn hàng liên quan' },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database' },
    ],
  },
  {
    method: 'GET',
    path: '/api/vnpay/vnpay-return',
    description: 'Xử lý phản hồi từ VNPay',
    fullDescription:
      'Xử lý phản hồi từ VNPay sau khi người dùng hoàn tất thanh toán. Xác minh chữ ký và cập nhật trạng thái thanh toán thành `success` nếu hợp lệ, đồng thời cập nhật trạng thái đơn hàng thành `completed` và trạng thái giao hàng thành `pending`. Không yêu cầu xác thực, được gọi tự động bởi VNPay.',
    auth: {
      required: false,
      description: 'Không yêu cầu token. Endpoint này được VNPay gọi tự động.',
    },
    parameters: [
      {
        name: 'vnp_TxnRef',
        type: 'string',
        description: 'Mã thanh toán (thanhtoanXXXXX)',
        required: true,
        in: 'query',
      },
      {
        name: 'vnp_Amount',
        type: 'number',
        description: 'Số tiền thanh toán (đơn vị: VND * 100)',
        required: true,
        in: 'query',
      },
      {
        name: 'vnp_SecureHash',
        type: 'string',
        description: 'Chữ ký bảo mật để xác minh tính toàn vẹn của dữ liệu',
        required: true,
        in: 'query',
      },
      {
        name: 'vnp_ResponseCode',
        type: 'string',
        description: 'Mã phản hồi từ VNPay (00: thành công)',
        required: true,
        in: 'query',
      },
      {
        name: 'vnp_TransactionNo',
        type: 'string',
        description: 'Mã giao dịch từ VNPay',
        required: true,
        in: 'query',
      },
      {
        name: 'vnp_OrderInfo',
        type: 'string',
        description: 'Thông tin đơn hàng',
        required: true,
        in: 'query',
      },
      {
        name: 'vnp_PayDate',
        type: 'string',
        description: 'Ngày giao dịch (định dạng: YYYYMMDDHHmmss)',
        required: true,
        in: 'query',
      },
    ],
    response: {
      status: 200,
      description: 'Xác minh thanh toán từ VNPay thành công',
      example: {
        status: 'success',
        message: 'Xác minh thanh toán từ VNPay thành công',
        data: {
          transactionId: '123456789',
          orderId: '60d5f8e9b1a2b4f8e8f9e2b7',
          paymentStatus: 'completed',
          shippingStatus: 'pending',
        },
      },
    },
    errorResponses: [
      { status: 400, description: 'Xác minh chữ ký thất bại hoặc thanh toán đã hết hạn' },
      { status: 404, description: 'Thanh toán không tồn tại hoặc không tìm thấy đơn hàng liên quan' },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database' },
    ],
  },
  {
    method: 'POST',
    path: '/api/vnpay/check-payment-status',
    description: 'Kiểm tra trạng thái thanh toán',
    fullDescription:
      'Kiểm tra trạng thái của một thanh toán VNPay dựa trên mã thanh toán và số tiền. Trả về thông tin trạng thái thanh toán, mã giao dịch (nếu có), và trạng thái đơn hàng liên quan. Nếu thanh toán đã hết hạn, trạng thái được cập nhật thành `expired`. Không yêu cầu xác thực.',
    auth: {
      required: false,
      description: 'Không yêu cầu token. Endpoint này có thể truy cập công khai.',
    },
    parameters: [
      {
        name: 'paymentCode',
        type: 'string',
        description: 'Mã thanh toán (định dạng: thanhtoanXXXXX, với XXXXX là 5 chữ số)',
        required: true,
        in: 'body',
      },
      {
        name: 'amount',
        type: 'number',
        description: 'Số tiền thanh toán (phải là số dương)',
        required: true,
        in: 'body',
      },
    ],
    requestExample: {
      headers: { 'Content-Type': 'application/json' },
      body: {
        paymentCode: 'thanhtoan12345',
        amount: 100000,
      },
    },
    response: {
      status: 200,
      description: 'Kiểm tra trạng thái thanh toán thành công',
      example: {
        status: 'success',
        data: {
          paymentCode: 'thanhtoan12345',
          status: 'pending',
          transactionId: null,
        },
      },
    },
    errorResponses: [
      { status: 400, description: 'Mã thanh toán không hợp lệ hoặc số tiền không khớp' },
      { status: 404, description: 'Không tìm thấy thanh toán' },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database' },
    ],
  },
];

export default vnpayEndpoints;