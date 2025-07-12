const mbBankEndpoints = [
  {
    method: 'GET',
    path: '/api/mbbankv3',
    description: 'Lấy giao dịch MB Bank',
    fullDescription: 'Trả về lịch sử giao dịch của tài khoản MB Bank dựa trên thông tin xác thực được cung cấp.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của người dùng được yêu cầu trong header.'
    },
    parameters: [
      { name: 'key', type: 'string', description: 'Khóa API để xác thực', required: true },
      { name: 'username', type: 'string', description: 'Tài khoản MB Bank', required: true },
      { name: 'password', type: 'string', description: 'Mật khẩu MB Bank', required: true },
      { name: 'accountNo', type: 'string', description: 'Số tài khoản để lấy lịch sử', required: true }
    ],
    exampleUrl: 'https://apicanhan.com/api/mbbankv3?key={<span style={{ color: "red" }}>{key}</span>}&username={<span style={{ color: "red" }}>{username}</span>}&password={<span style={{ color: "red" }}>{password}</span>}&accountNo={<span style={{ color: "red" }}>{accountNo}</span>}',
    response: {
      status: 200,
      description: 'Lịch sử giao dịch MB Bank',
      example: {
        status: 'success',
        message: 'Thành công',
        transactions: [
          {
            transactionID: 'FT25190344823293',
            amount: '50000',
            description: 'CUSTOMER AEQN4S. TU: HUYNH HUY HOANG',
            transactionDate: '2025-07-09T00:40:03Z',
            type: 'IN'
          }
        ]
      }
    },
    errorResponses: [
      { status: 400, description: 'Dữ liệu không hợp lệ hoặc thông tin xác thực sai' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 500, description: 'Lỗi máy chủ' }
    ]
  }
];

export default mbBankEndpoints;