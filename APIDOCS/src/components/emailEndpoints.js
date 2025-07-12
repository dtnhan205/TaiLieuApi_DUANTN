const emailEndpoints = [
  {
    method: 'POST',
    path: '/api/email/sendEmail',
    description: 'Gửi email',
    fullDescription: 'Gửi email đến người dùng với nội dung tùy chỉnh hoặc mẫu chào mừng mặc định. Email được gửi từ "Pure-Botanica" sử dụng dịch vụ Gmail. Yêu cầu xác thực thông qua token JWT. Nếu không cung cấp tiêu đề hoặc nội dung HTML, hệ thống sẽ sử dụng mẫu chào mừng mặc định với mã giảm giá và logo.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của người dùng được yêu cầu trong header, lấy từ endpoint `/api/auth/login`.'
    },
    parameters: [
      { name: 'email', type: 'string', description: 'Địa chỉ email của người nhận (phải hợp lệ)', required: true },
      { name: 'username', type: 'string', description: 'Tên người dùng để cá nhân hóa email', required: true },
      { name: 'subject', type: 'string', description: 'Tiêu đề email (mặc định: "Chào mừng [username] đến với Pure-Botanica!")', required: false },
      { name: 'html', type: 'string', description: 'Nội dung HTML tùy chỉnh của email (mặc định: mẫu HTML chào mừng với mã giảm giá)', required: false }
    ],
    requestExample: {
      headers: { 'Authorization': 'Bearer <token>' },
      body: {
        email: 'user@example.com',
        username: 'user1',
        subject: 'Chào mừng bạn đến với Pure-Botanica!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1>Xin chào user1,</h1>
            <p>Cảm ơn bạn đã đăng ký! Đây là email tùy chỉnh.</p>
          </div>
        `
      }
    },
    response: {
      status: 200,
      description: 'Email đã được gửi thành công',
      example: {
        message: 'Email đã được gửi thành công!'
      }
    },
    errorResponses: [
      { status: 400, description: 'Email không hợp lệ hoặc thiếu username' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 500, description: 'Lỗi khi gửi email' }
    ]
  }
];

export default emailEndpoints;