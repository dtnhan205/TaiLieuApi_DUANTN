const userEndpoints = [
  {
    method: 'POST',
    path: '/api/users/register',
    description: 'Đăng ký người dùng mới',
    fullDescription:
      'Tạo tài khoản người dùng mới với các trường bắt buộc: username, phone, email, và password. Gửi email chào mừng với mã giảm giá 10%. Mật khẩu được mã hóa bằng bcrypt trước khi lưu trữ. Không yêu cầu xác thực.',
    auth: {
      required: false,
      description: 'Không yêu cầu token. Endpoint này công khai.',
    },
    parameters: [
      { name: 'username', type: 'string', description: 'Tên người dùng (ít nhất 1 ký tự)', required: true },
      { name: 'phone', type: 'string', description: 'Số điện thoại Việt Nam (bắt đầu bằng 0, 10 chữ số)', required: true },
      { name: 'email', type: 'string', description: 'Địa chỉ email hợp lệ, duy nhất trong hệ thống', required: true },
      { name: 'password', type: 'string', description: 'Mật khẩu (tối thiểu 8 ký tự)', required: true },
      { name: 'address', type: 'string', description: 'Địa chỉ người dùng (tùy chọn)', required: false },
      { name: 'birthday', type: 'string', description: 'Ngày sinh định dạng ISO (YYYY-MM-DD)', required: false },
      { name: 'listOrder', type: 'array', description: 'Mảng các ObjectId liên kết đến đơn hàng', required: false },
    ],
    requestExample: {
      body: {
        username: 'john_doe',
        phone: '0987654321',
        email: 'john.doe@example.com',
        password: 'securepassword123',
        address: '123 Main St, Hanoi',
        birthday: '1990-01-01',
        listOrder: [],
      },
    },
    response: {
      status: 201,
      description: 'Đăng ký người dùng thành công',
      example: {
        message: 'Đăng ký thành công! Bạn có thể đăng nhập.',
        user: {
          _id: '60d5f8e9b1a2b4f8e8f9e2b0',
          username: 'john_doe',
          phone: '0987654321',
          email: 'john.doe@example.com',
          address: '123 Main St, Hanoi',
          birthday: '1990-01-01T00:00:00.000Z',
          listOrder: [],
          status: 'active',
          role: 'user',
          createdAt: '2025-07-13T05:25:00.000Z', // Cập nhật ngày hiện tại
        },
      },
    },
    errorResponses: [
      { status: 400, description: 'Thiếu trường bắt buộc, phone không đúng định dạng (0xxxxxxxxx), email không hợp lệ, hoặc mật khẩu dưới 8 ký tự' },
      { status: 409, description: 'Email đã được sử dụng' },
      { status: 500, description: 'Lỗi server, có thể do kết nối database hoặc gửi email thất bại' },
    ],
  },
  {
    method: 'POST',
    path: '/api/users/login',
    description: 'Đăng nhập người dùng',
    fullDescription:
      'Xác thực người dùng bằng email và mật khẩu, trả về token JWT (hiệu lực 1 giờ). Kiểm tra trạng thái tài khoản (phải là active). Không yêu cầu xác thực.',
    auth: {
      required: false,
      description: 'Không yêu cầu token. Endpoint này công khai.',
    },
    parameters: [
      { name: 'email', type: 'string', description: 'Email người dùng', required: true },
      { name: 'password', type: 'string', description: 'Mật khẩu người dùng (tối thiểu 8 ký tự)', required: true },
    ],
    requestExample: {
      body: {
        email: 'john.doe@example.com',
        password: 'securepassword123',
      },
    },
    response: {
      status: 200,
      description: 'Đăng nhập thành công',
      example: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        message: 'Đăng nhập thành công',
        user: {
          id: '60d5f8e9b1a2b4f8e8f9e2b0',
          email: 'john.doe@example.com',
          username: 'john_doe',
          role: 'user',
        },
      },
    },
    errorResponses: [
      { status: 400, description: 'Thiếu email hoặc mật khẩu' },
      { status: 401, description: 'Email không tồn tại hoặc mật khẩu không đúng' },
      { status: 403, description: 'Tài khoản không hoạt động hoặc bị cấm' },
      { status: 500, description: 'Lỗi server, có thể do kết nối database' },
    ],
  },
  {
    method: 'POST',
    path: '/api/users/forgot-password',
    description: 'Yêu cầu đặt lại mật khẩu',
    fullDescription:
      'Gửi email chứa link đặt lại mật khẩu với token JWT (hiệu lực 1 giờ) đến email người dùng. Không yêu cầu xác thực.',
    auth: {
      required: false,
      description: 'Không yêu cầu token. Endpoint này công khai.',
    },
    parameters: [
      { name: 'email', type: 'string', description: 'Email người dùng (hợp lệ)', required: true },
    ],
    requestExample: {
      body: {
        email: 'john.doe@example.com',
      },
    },
    response: {
      status: 200,
      description: 'Email đặt lại mật khẩu đã được gửi',
      example: {
        message: 'Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư của bạn.',
      },
    },
    errorResponses: [
      { status: 400, description: 'Thiếu hoặc email không hợp lệ (không đúng định dạng)' },
      { status: 404, description: 'Email không tồn tại trong hệ thống' },
      { status: 500, description: 'Lỗi server, có thể do gửi email thất bại' },
    ],
  },
  {
    method: 'POST',
    path: '/api/users/reset-password/:token',
    description: 'Đặt lại mật khẩu',
    fullDescription:
      'Đặt lại mật khẩu sử dụng token JWT từ email. Mật khẩu mới được mã hóa trước khi lưu. Gửi email xác nhận. Không yêu cầu xác thực.',
    auth: {
      required: false,
      description: 'Không yêu cầu token. Endpoint này công khai.',
    },
    parameters: [
      { name: 'token', type: 'string', description: 'Token JWT từ email đặt lại mật khẩu', required: true, in: 'path' },
      { name: 'newPassword', type: 'string', description: 'Mật khẩu mới (tối thiểu 8 ký tự)', required: true, in: 'body' },
    ],
    requestExample: {
      body: {
        newPassword: 'newpassword123',
      },
    },
    response: {
      status: 200,
      description: 'Đặt lại mật khẩu thành công',
      example: {
        message: 'Đặt lại mật khẩu thành công!',
      },
    },
    errorResponses: [
      { status: 400, description: 'Thiếu mật khẩu mới, mật khẩu dưới 8 ký tự, hoặc token không hợp lệ/đã hết hạn' },
      { status: 404, description: 'Token không khớp hoặc người dùng không tồn tại' },
      { status: 500, description: 'Lỗi server, có thể do gửi email thất bại' },
    ],
  },
  {
    method: 'GET',
    path: '/api/users/userinfo',
    description: 'Lấy thông tin người dùng đã xác thực',
    fullDescription:
      'Trả về thông tin người dùng hiện tại (loại bỏ password và passwordResetToken). Yêu cầu token JWT hợp lệ trong header.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Yêu cầu token JWT của người dùng trong header Authorization.',
    },
    parameters: [
      { name: 'id', type: 'string', description: 'ObjectId của người dùng', required: true, in: 'query' },
    ],
    response: {
      status: 200,
      description: 'Thông tin người dùng',
      example: {
        _id: '60d5f8e9b1a2b4f8e8f9e2b0',
        username: 'john_doe',
        phone: '0987654321',
        email: 'john.doe@example.com',
        address: '123 Main St, Hanoi',
        birthday: '1990-01-01T00:00:00.000Z',
        listOrder: [],
        status: 'active',
        role: 'user',
        createdAt: '2025-07-13T05:25:00.000Z',
      },
    },
    errorResponses: [
      { status: 400, description: 'Thiếu tham số id trong query' },
      { status: 401, description: 'Không có token, token không hợp lệ, hoặc đã hết hạn' },
      { status: 404, description: 'Không tìm thấy người dùng với id cung cấp' },
      { status: 500, description: 'Lỗi server, có thể do kết nối database' },
    ],
  },
  {
    method: 'GET',
    path: '/api/users',
    description: 'Lấy danh sách tất cả người dùng',
    fullDescription:
      'Trả về danh sách tất cả người dùng (loại bỏ password và passwordResetToken). Chỉ admin được phép truy cập. Yêu cầu token JWT hợp lệ.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Yêu cầu token JWT của admin trong header Authorization.',
    },
    parameters: [],
    response: {
      status: 200,
      description: 'Danh sách tất cả người dùng',
      example: [
        {
          _id: '60d5f8e9b1a2b4f8e8f9e2b0',
          username: 'john_doe',
          phone: '0987654321',
          email: 'john.doe@example.com',
          address: '123 Main St, Hanoi',
          birthday: '1990-01-01T00:00:00.000Z',
          listOrder: [],
          status: 'active',
          role: 'user',
          createdAt: '2025-07-13T05:25:00.000Z',
        },
      ],
    },
    errorResponses: [
      { status: 401, description: 'Không có token, token không hợp lệ, hoặc đã hết hạn' },
      { status: 403, description: 'Người dùng không có quyền admin' },
      { status: 404, description: 'Không tìm thấy người dùng nào' },
      { status: 500, description: 'Lỗi server, có thể do kết nối database' },
    ],
  },
  {
    method: 'GET',
    path: '/api/users/:id',
    description: 'Lấy thông tin người dùng theo ID',
    fullDescription:
      'Trả về chi tiết một người dùng theo ID (loại bỏ password và passwordResetToken). Chỉ admin được phép truy cập. Yêu cầu token JWT hợp lệ.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Yêu cầu token JWT của admin trong header Authorization.',
    },
    parameters: [
      { name: 'id', type: 'string', description: 'ObjectId của người dùng', required: true, in: 'path' },
    ],
    response: {
      status: 200,
      description: 'Chi tiết người dùng',
      example: {
        _id: '60d5f8e9b1a2b4f8e8f9e2b0',
        username: 'john_doe',
        phone: '0987654321',
        email: 'john.doe@example.com',
        address: '123 Main St, Hanoi',
        birthday: '1990-01-01T00:00:00.000Z',
        listOrder: [],
        status: 'active',
        role: 'user',
        createdAt: '2025-07-13T05:25:00.000Z',
      },
    },
    errorResponses: [
      { status: 401, description: 'Không có token, token không hợp lệ, hoặc đã hết hạn' },
      { status: 403, description: 'Người dùng không có quyền admin' },
      { status: 404, description: 'Không tìm thấy người dùng với id cung cấp' },
      { status: 500, description: 'Lỗi server, có thể do kết nối database' },
    ],
  },
  {
    method: 'PUT',
    path: '/api/users/update/:id',
    description: 'Cập nhật thông tin người dùng',
    fullDescription:
      'Cập nhật thông tin người dùng (username, phone, email, address, birthday, status, role). Người dùng chỉ có thể cập nhật thông tin của mình, admin có thể cập nhật bất kỳ người dùng nào. Chỉ admin được phép cập nhật status và role. Yêu cầu token JWT hợp lệ.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Yêu cầu token JWT của người dùng hoặc admin trong header Authorization.',
    },
    parameters: [
      { name: 'id', type: 'string', description: 'ObjectId của người dùng', required: true, in: 'path' },
      { name: 'username', type: 'string', description: 'Tên người dùng mới', required: false, in: 'body' },
      { name: 'phone', type: 'string', description: 'Số điện thoại mới (0xxxxxxxxx)', required: false, in: 'body' },
      { name: 'email', type: 'string', description: 'Email mới (hợp lệ, duy nhất)', required: false, in: 'body' },
      { name: 'address', type: 'string', description: 'Địa chỉ mới', required: false, in: 'body' },
      { name: 'birthday', type: 'string', description: 'Ngày sinh mới (ISO YYYY-MM-DD)', required: false, in: 'body' },
      { name: 'status', type: 'string', description: 'Trạng thái mới (active, inactive, banned, chỉ admin)', required: false, in: 'body' },
      { name: 'role', type: 'string', description: 'Vai trò mới (user, admin, chỉ admin)', required: false, in: 'body' },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer <token>' },
      body: {
        username: 'john_doe_updated',
        phone: '0912345678',
        email: 'john.doe.new@example.com',
        address: '456 New St, Hanoi',
        birthday: '1990-01-02',
        status: 'active',
        role: 'user',
      },
    },
    response: {
      status: 200,
      description: 'Cập nhật người dùng thành công',
      example: {
        message: 'Cập nhật thành công',
        user: {
          _id: '60d5f8e9b1a2b4f8e8f9e2b0',
          username: 'john_doe_updated',
          phone: '0912345678',
          email: 'john.doe.new@example.com',
          address: '456 New St, Hanoi',
          birthday: '1990-01-02T00:00:00.000Z',
          listOrder: [],
          status: 'active',
          role: 'user',
          createdAt: '2025-07-13T05:25:00.000Z',
        },
      },
    },
    errorResponses: [
      { status: 400, description: 'Dữ liệu không hợp lệ (phone, email, birthday không đúng định dạng)' },
      { status: 401, description: 'Không có token, token không hợp lệ, hoặc đã hết hạn' },
      { status: 403, description: 'Người dùng không có quyền cập nhật thông tin này' },
      { status: 404, description: 'Không tìm thấy người dùng với id cung cấp' },
      { status: 409, description: 'Email mới đã được sử dụng' },
      { status: 500, description: 'Lỗi server, có thể do kết nối database' },
    ],
  },
  {
    method: 'DELETE',
    path: '/api/users/:id',
    description: 'Xóa người dùng',
    fullDescription:
      'Xóa người dùng theo ID. Chỉ admin hoặc chính người dùng được phép xóa. Yêu cầu token JWT hợp lệ.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Yêu cầu token JWT của người dùng hoặc admin trong header Authorization.',
    },
    parameters: [
      { name: 'id', type: 'string', description: 'ObjectId của người dùng', required: true, in: 'path' },
    ],
    response: {
      status: 200,
      description: 'Xóa người dùng thành công',
      example: {
        message: 'Xóa người dùng thành công',
      },
    },
    errorResponses: [
      { status: 401, description: 'Không có token, token không hợp lệ, hoặc đã hết hạn' },
      { status: 403, description: 'Người dùng không có quyền xóa tài khoản này' },
      { status: 404, description: 'Không tìm thấy người dùng với id cung cấp' },
      { status: 500, description: 'Lỗi server, có thể do kết nối database' },
    ],
  },
  {
    method: 'PUT',
    path: '/api/users/change-password/:id',
    description: 'Đổi mật khẩu người dùng',
    fullDescription:
      'Đổi mật khẩu người dùng sau khi xác minh mật khẩu cũ. Gửi email xác nhận. Chỉ chính người dùng hoặc admin được phép thực hiện. Yêu cầu token JWT hợp lệ.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Yêu cầu token JWT của người dùng hoặc admin trong header Authorization.',
    },
    parameters: [
      { name: 'id', type: 'string', description: 'ObjectId của người dùng', required: true, in: 'path' },
      { name: 'oldPassword', type: 'string', description: 'Mật khẩu hiện tại', required: true, in: 'body' },
      { name: 'newPassword', type: 'string', description: 'Mật khẩu mới (tối thiểu 8 ký tự)', required: true, in: 'body' },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer <token>' },
      body: {
        oldPassword: 'securepassword123',
        newPassword: 'newpassword123',
      },
    },
    response: {
      status: 200,
      description: 'Đổi mật khẩu thành công',
      example: {
        message: 'Đổi mật khẩu thành công',
      },
    },
    errorResponses: [
      { status: 400, description: 'Thiếu oldPassword/newPassword hoặc mật khẩu mới dưới 8 ký tự' },
      { status: 401, description: 'Mật khẩu cũ không đúng' },
      { status: 403, description: 'Người dùng không có quyền đổi mật khẩu này' },
      { status: 404, description: 'Không tìm thấy người dùng với id cung cấp' },
      { status: 500, description: 'Lỗi server, có thể do gửi email thất bại' },
    ],
  },
  {
    method: 'GET',
    path: '/api/users/google',
    description: 'Bắt đầu đăng nhập bằng Google OAuth',
    fullDescription:
      'Chuyển hướng người dùng đến trang ủy quyền OAuth 2.0 của Google để xác thực. Yêu cầu scope: profile, email. Không yêu cầu xác thực.',
    auth: {
      required: false,
      description: 'Không yêu cầu token. Endpoint này công khai.',
    },
    parameters: [],
    response: {
      status: 302,
      description: 'Chuyển hướng đến trang OAuth của Google',
      example: {
        redirect: 'https://accounts.google.com/o/oauth2/auth?client_id=...&redirect_uri=...&scope=profile%20email&response_type=code',
      },
    },
    errorResponses: [
      { status: 500, description: 'Lỗi server, có thể do cấu hình Google OAuth không đúng' },
    ],
  },
  {
    method: 'GET',
    path: '/api/users/google/callback',
    description: 'Xử lý callback từ Google OAuth',
    fullDescription:
      'Xử lý mã ủy quyền từ Google, xác thực người dùng, và trả về token JWT hoặc chuyển hướng đến frontend. Không yêu cầu xác thực.',
    auth: {
      required: false,
      description: 'Không yêu cầu token. Endpoint này công khai.',
    },
    parameters: [
      { name: 'code', type: 'string', description: 'Mã ủy quyền từ Google', required: true, in: 'query' },
    ],
    response: {
      status: 302,
      description: 'Chuyển hướng đến frontend với token hoặc trang thành công',
      example: {
        redirect: 'https://purebotanica.com/auth/success?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
    errorResponses: [
      { status: 400, description: 'Mã ủy quyền không hợp lệ hoặc thiếu' },
      { status: 500, description: 'Lỗi server, có thể do xác thực Google thất bại' },
    ],
  },
];

export default userEndpoints;