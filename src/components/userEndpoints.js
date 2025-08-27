const userEndpoints = [
  {
    method: 'POST',
    path: '/api/users/register',
    description: 'Đăng ký người dùng mới',
    fullDescription:
      'Tạo tài khoản người dùng mới với các trường bắt buộc: username, phone, email, và password. Các trường address, birthday, và listOrder là tùy chọn. Mật khẩu được mã hóa bằng bcrypt trước khi lưu trữ. Gửi email chào mừng với mã giảm giá 10% sau khi đăng ký thành công. Không yêu cầu xác thực.',
    auth: {
      required: false,
      description: 'Không yêu cầu token. Endpoint này công khai.',
    },
    parameters: [
      { name: 'username', type: 'string', description: 'Tên người dùng (ít nhất 1 ký tự)', required: true, in: 'body' },
      { name: 'phone', type: 'string', description: 'Số điện thoại Việt Nam (bắt đầu bằng 0, 10 chữ số, ví dụ: 0987654321)', required: true, in: 'body' },
      { name: 'email', type: 'string', description: 'Địa chỉ email hợp lệ, duy nhất trong hệ thống (ví dụ: user@example.com)', required: true, in: 'body' },
      { name: 'password', type: 'string', description: 'Mật khẩu (tối thiểu 8 ký tự)', required: true, in: 'body' },
      { name: 'address', type: 'string', description: 'Địa chỉ người dùng (tùy chọn)', required: false, in: 'body' },
      { name: 'birthday', type: 'string', description: 'Ngày sinh định dạng ISO (YYYY-MM-DD, tùy chọn)', required: false, in: 'body' },
      { name: 'listOrder', type: 'array', description: 'Mảng các ObjectId liên kết đến đơn hàng (tùy chọn, mặc định rỗng)', required: false, in: 'body' },
    ],
    requestExample: {
      body: {
        username: 'john_doe',
        phone: '0987654321',
        email: 'john.doe@example.com',
        password: 'securepassword123',
        address: '123 Đường Láng, Hà Nội',
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
          address: '123 Đường Láng, Hà Nội',
          birthday: '1990-01-01T00:00:00.000Z',
          listOrder: [],
          favoriteProducts: [],
          status: 'active',
          role: 'user',
          createdAt: '2025-08-28T05:36:00.000Z',
          temporaryAddress1: { addressLine: '', ward: '', district: '', cityOrProvince: '' },
          temporaryAddress2: { addressLine: '', ward: '', district: '', cityOrProvince: '' },
        },
      },
    },
    errorResponses: [
      { status: 400, description: 'Thiếu trường bắt buộc hoặc mật khẩu dưới 8 ký tự', example: { message: 'Tất cả các trường username, phone, email, password đều bắt buộc' } },
      { status: 409, description: 'Email đã được sử dụng', example: { message: 'Email đã tồn tại' } },
      { status: 500, description: 'Lỗi server, có thể do kết nối database hoặc gửi email thất bại', example: { message: 'Lỗi server', error: 'Database connection failed' } },
    ],
  },
  {
    method: 'POST',
    path: '/api/users/login',
    description: 'Đăng nhập người dùng',
    fullDescription:
      'Xác thực người dùng bằng email và mật khẩu, trả về token JWT (hiệu lực 8 giờ). Kiểm tra trạng thái tài khoản (phải là active). Không yêu cầu xác thực.',
    auth: {
      required: false,
      description: 'Không yêu cầu token. Endpoint này công khai.',
    },
    parameters: [
      { name: 'email', type: 'string', description: 'Email người dùng (ví dụ: user@example.com)', required: true, in: 'body' },
      { name: 'password', type: 'string', description: 'Mật khẩu người dùng (tối thiểu 8 ký tự)', required: true, in: 'body' },
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
      { status: 400, description: 'Thiếu email hoặc mật khẩu', example: { message: 'Email và mật khẩu là bắt buộc' } },
      { status: 401, description: 'Email không tồn tại hoặc mật khẩu không đúng', example: { message: 'Mật khẩu không đúng' } },
      { status: 403, description: 'Tài khoản không hoạt động', example: { message: 'Tài khoản không hoạt động. Vui lòng liên hệ hỗ trợ.' } },
      { status: 500, description: 'Lỗi server, có thể do kết nối database', example: { message: 'Lỗi server', error: 'Database connection failed' } },
    ],
  },
  {
    method: 'POST',
    path: '/api/users/forgot-password',
    description: 'Yêu cầu đặt lại mật khẩu',
    fullDescription:
      'Gửi email chứa link đặt lại mật khẩu với token JWT (hiệu lực 8 giờ) đến email người dùng. Kiểm tra định dạng email trước khi gửi. Không yêu cầu xác thực.',
    auth: {
      required: false,
      description: 'Không yêu cầu token. Endpoint này công khai.',
    },
    parameters: [
      { name: 'email', type: 'string', description: 'Email người dùng (hợp lệ, ví dụ: user@example.com)', required: true, in: 'body' },
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
      { status: 400, description: 'Thiếu hoặc email không hợp lệ (không đúng định dạng)', example: { message: 'Email không hợp lệ' } },
      { status: 404, description: 'Email không tồn tại trong hệ thống', example: { message: 'Email không tồn tại' } },
      { status: 500, description: 'Lỗi server, có thể do gửi email thất bại', example: { message: 'Lỗi khi gửi email đặt lại mật khẩu' } },
    ],
  },
  {
    method: 'POST',
    path: '/api/users/reset-password/:token',
    description: 'Đặt lại mật khẩu',
    fullDescription:
      'Đặt lại mật khẩu sử dụng token JWT từ email. Mật khẩu mới phải có ít nhất 8 ký tự và được mã hóa bằng bcrypt trước khi lưu. Gửi email xác nhận sau khi đặt lại thành công. Không yêu cầu xác thực.',
    auth: {
      required: false,
      description: 'Không yêu cầu token. Endpoint này công khai.',
    },
    parameters: [
      { name: 'token', type: 'string', description: 'Token JWT từ email đặt lại mật khẩu', required: true, in: 'path' },
      { name: 'newPassword', type: 'string', description: 'Mật khẩu mới (tối thiểu 8 ký tự)', required: true, in: 'body' },
    ],
    requestExample: {
      params: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
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
      { status: 400, description: 'Thiếu mật khẩu mới, mật khẩu dưới 8 ký tự, hoặc token không hợp lệ/đã hết hạn', example: { message: 'Token không hợp lệ hoặc đã hết hạn' } },
      { status: 404, description: 'Token không khớp hoặc người dùng không tồn tại', example: { message: 'Token không khớp hoặc người dùng không tồn tại' } },
      { status: 500, description: 'Lỗi server, có thể do gửi email thất bại hoặc kết nối database', example: { message: 'Lỗi server', error: 'Failed to send email' } },
    ],
  },
  {
    method: 'PUT',
    path: '/api/users/change-password/:id',
    description: 'Đổi mật khẩu người dùng',
    fullDescription:
      'Đổi mật khẩu người dùng sau khi xác minh mật khẩu cũ. Mật khẩu mới phải có ít nhất 8 ký tự và được mã hóa bằng bcrypt. Gửi email xác nhận sau khi đổi thành công. Chỉ người dùng sở hữu tài khoản hoặc admin được phép thực hiện. Yêu cầu token JWT hợp lệ.',
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
      headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
      params: { id: '60d5f8e9b1a2b4f8e8f9e2b0' },
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
      { status: 400, description: 'Thiếu oldPassword/newPassword hoặc mật khẩu mới dưới 8 ký tự', example: { message: 'Mật khẩu mới phải có ít nhất 8 ký tự' } },
      { status: 401, description: 'Mật khẩu cũ không đúng', example: { message: 'Mật khẩu cũ không đúng' } },
      { status: 403, description: 'Người dùng không có quyền đổi mật khẩu này', example: { message: 'Bạn không có quyền đổi mật khẩu' } },
      { status: 404, description: 'Không tìm thấy người dùng', example: { message: 'Không tìm thấy người dùng' } },
      { status: 500, description: 'Lỗi server, có thể do gửi email thất bại hoặc kết nối database', example: { message: 'Lỗi server', error: 'Failed to send email' } },
    ],
  },
  {
    method: 'GET',
    path: '/api/users/userinfo',
    description: 'Lấy thông tin người dùng đã xác thực',
    fullDescription:
      'Trả về thông tin chi tiết của người dùng hiện tại dựa trên token JWT (loại bỏ password, passwordResetToken, emailVerificationToken). Yêu cầu token JWT hợp lệ.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Yêu cầu token JWT của người dùng trong header Authorization.',
    },
    parameters: [
      { name: 'id', type: 'string', description: 'ObjectId của người dùng (phải khớp với userId trong token)', required: true, in: 'query' },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
      query: { id: '60d5f8e9b1a2b4f8e8f9e2b0' },
    },
    response: {
      status: 200,
      description: 'Thông tin người dùng',
      example: {
        _id: '60d5f8e9b1a2b4f8e8f9e2b0',
        username: 'john_doe',
        phone: '0987654321',
        email: 'john.doe@example.com',
        address: '123 Đường Láng, Hà Nội',
        birthday: '1990-01-01T00:00:00.000Z',
        listOrder: [],
        favoriteProducts: [],
        status: 'active',
        role: 'user',
        createdAt: '2025-08-28T05:36:00.000Z',
        temporaryAddress1: { addressLine: '', ward: '', district: '', cityOrProvince: '' },
        temporaryAddress2: { addressLine: '', ward: '', district: '', cityOrProvince: '' },
      },
    },
    errorResponses: [
      { status: 400, description: 'Thiếu tham số id trong query', example: { message: 'Thiếu tham số userId' } },
      { status: 401, description: 'Không có token, token không hợp lệ, hoặc đã hết hạn', example: { message: 'Token không hợp lệ' } },
      { status: 404, description: 'Không tìm thấy người dùng', example: { message: 'Không tìm thấy người dùng' } },
      { status: 500, description: 'Lỗi server, có thể do kết nối database', example: { message: 'Lỗi server', error: 'Database connection failed' } },
    ],
  },
  {
    method: 'GET',
    path: '/api/users/temporary-addresses',
    description: 'Lấy địa chỉ tạm thời của người dùng',
    fullDescription:
      'Trả về địa chỉ tạm thời (temporaryAddress1 và temporaryAddress2) của người dùng hiện tại dựa trên token JWT. Yêu cầu token JWT hợp lệ.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Yêu cầu token JWT của người dùng trong header Authorization.',
    },
    parameters: [],
    requestExample: {
      headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
    },
    response: {
      status: 200,
      description: 'Danh sách địa chỉ tạm thời',
      example: {
        temporaryAddress1: {
          addressLine: '456 Lê Lợi',
          ward: 'Phường 1',
          district: 'Quận 1',
          cityOrProvince: 'TP Hồ Chí Minh',
        },
        temporaryAddress2: {
          addressLine: '',
          ward: '',
          district: '',
          cityOrProvince: '',
        },
      },
    },
    errorResponses: [
      { status: 401, description: 'Không có token, token không hợp lệ, hoặc đã hết hạn', example: { message: 'Token không hợp lệ' } },
      { status: 404, description: 'Không tìm thấy người dùng', example: { message: 'Không tìm thấy người dùng' } },
      { status: 500, description: 'Lỗi server, có thể do kết nối database', example: { message: 'Lỗi server', error: 'Database connection failed' } },
    ],
  },
  {
    method: 'GET',
    path: '/api/users',
    description: 'Lấy danh sách tất cả người dùng',
    fullDescription:
      'Trả về danh sách tất cả người dùng trong hệ thống (loại bỏ password, passwordResetToken, emailVerificationToken). Chỉ admin được phép truy cập. Yêu cầu token JWT hợp lệ với vai trò admin.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Yêu cầu token JWT của admin trong header Authorization.',
    },
    parameters: [],
    requestExample: {
      headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
    },
    response: {
      status: 200,
      description: 'Danh sách tất cả người dùng',
      example: [
        {
          _id: '60d5f8e9b1a2b4f8e8f9e2b0',
          username: 'john_doe',
          phone: '0987654321',
          email: 'john.doe@example.com',
          address: '123 Đường Láng, Hà Nội',
          birthday: '1990-01-01T00:00:00.000Z',
          listOrder: [],
          favoriteProducts: [],
          status: 'active',
          role: 'user',
          createdAt: '2025-08-28T05:36:00.000Z',
          temporaryAddress1: { addressLine: '', ward: '', district: '', cityOrProvince: '' },
          temporaryAddress2: { addressLine: '', ward: '', district: '', cityOrProvince: '' },
        },
        {
          _id: '60d5f8e9b1a2b4f8e8f9e2b1',
          username: 'jane_doe',
          phone: '0912345678',
          email: 'jane.doe@example.com',
          address: '789 Nguyễn Trãi, TP HCM',
          birthday: '1992-02-02T00:00:00.000Z',
          listOrder: [],
          favoriteProducts: [],
          status: 'active',
          role: 'admin',
          createdAt: '2025-08-28T05:36:00.000Z',
          temporaryAddress1: { addressLine: '', ward: '', district: '', cityOrProvince: '' },
          temporaryAddress2: { addressLine: '', ward: '', district: '', cityOrProvince: '' },
        },
      ],
    },
    errorResponses: [
      { status: 401, description: 'Không có token, token không hợp lệ, hoặc đã hết hạn', example: { message: 'Token không hợp lệ' } },
      { status: 403, description: 'Không có quyền admin', example: { message: 'Bạn không có quyền truy cập' } },
      { status: 404, description: 'Không tìm thấy người dùng nào', example: { message: 'Không có người dùng' } },
      { status: 500, description: 'Lỗi server, có thể do kết nối database', example: { message: 'Lỗi server', error: 'Database connection failed' } },
    ],
  },
  {
    method: 'GET',
    path: '/api/users/:id',
    description: 'Lấy thông tin người dùng theo ID',
    fullDescription:
      'Trả về chi tiết một người dùng theo ID (loại bỏ password, passwordResetToken, emailVerificationToken). Chỉ admin được phép truy cập. Yêu cầu token JWT hợp lệ với vai trò admin.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Yêu cầu token JWT của admin trong header Authorization.',
    },
    parameters: [
      { name: 'id', type: 'string', description: 'ObjectId của người dùng', required: true, in: 'path' },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
      params: { id: '60d5f8e9b1a2b4f8e8f9e2b0' },
    },
    response: {
      status: 200,
      description: 'Chi tiết người dùng',
      example: {
        _id: '60d5f8e9b1a2b4f8e8f9e2b0',
        username: 'john_doe',
        phone: '0987654321',
        email: 'john.doe@example.com',
        address: '123 Đường Láng, Hà Nội',
        birthday: '1990-01-01T00:00:00.000Z',
        listOrder: [],
        favoriteProducts: [],
        status: 'active',
        role: 'user',
        createdAt: '2025-08-28T05:36:00.000Z',
        temporaryAddress1: { addressLine: '', ward: '', district: '', cityOrProvince: '' },
        temporaryAddress2: { addressLine: '', ward: '', district: '', cityOrProvince: '' },
      },
    },
    errorResponses: [
      { status: 401, description: 'Không có token, token không hợp lệ, hoặc đã hết hạn', example: { message: 'Token không hợp lệ' } },
      { status: 403, description: 'Không có quyền admin', example: { message: 'Bạn không có quyền truy cập' } },
      { status: 404, description: 'Không tìm thấy người dùng', example: { message: 'Người dùng không tồn tại' } },
      { status: 500, description: 'Lỗi server, có thể do kết nối database', example: { message: 'Lỗi server', error: 'Database connection failed' } },
    ],
  },
  {
    method: 'POST',
    path: '/api/users/favorite-products',
    description: 'Thêm sản phẩm vào danh sách yêu thích',
    fullDescription:
      'Thêm một sản phẩm vào danh sách yêu thích (favoriteProducts) của người dùng hiện tại. Nếu sản phẩm đã có trong danh sách, không thêm lại. Yêu cầu token JWT hợp lệ.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Yêu cầu token JWT của người dùng trong header Authorization.',
    },
    parameters: [
      { name: 'productId', type: 'string', description: 'ObjectId của sản phẩm', required: true, in: 'body' },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
      body: {
        productId: '60d5f8e9b1a2b4f8e8f9e2b1',
      },
    },
    response: {
      status: 200,
      description: 'Thêm sản phẩm yêu thích thành công',
      example: {
        message: 'Thêm sản phẩm yêu thích thành công',
        favoriteProducts: ['60d5f8e9b1a2b4f8e8f9e2b1'],
      },
    },
    errorResponses: [
      { status: 400, description: 'ProductId không hợp lệ hoặc thiếu', example: { message: 'ProductId không hợp lệ' } },
      { status: 401, description: 'Không có token, token không hợp lệ, hoặc đã hết hạn', example: { message: 'Token không hợp lệ' } },
      { status: 404, description: 'Không tìm thấy người dùng', example: { message: 'Không tìm thấy người dùng' } },
      { status: 500, description: 'Lỗi server, có thể do kết nối database', example: { message: 'Lỗi server', error: 'Database connection failed' } },
    ],
  },
  {
    method: 'DELETE',
    path: '/api/users/favorite-products/:productId',
    description: 'Xóa sản phẩm khỏi danh sách yêu thích',
    fullDescription:
      'Xóa một sản phẩm khỏi danh sách yêu thích (favoriteProducts) của người dùng hiện tại. Yêu cầu token JWT hợp lệ.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Yêu cầu token JWT của người dùng trong header Authorization.',
    },
    parameters: [
      { name: 'productId', type: 'string', description: 'ObjectId của sản phẩm', required: true, in: 'path' },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
      params: { productId: '60d5f8e9b1a2b4f8e8f9e2b1' },
    },
    response: {
      status: 200,
      description: 'Xóa sản phẩm yêu thích thành công',
      example: {
        message: 'Xóa sản phẩm yêu thích thành công',
        favoriteProducts: [],
      },
    },
    errorResponses: [
      { status: 400, description: 'ProductId không hợp lệ hoặc thiếu', example: { message: 'ProductId không hợp lệ' } },
      { status: 401, description: 'Không có token, token không hợp lệ, hoặc đã hết hạn', example: { message: 'Token không hợp lệ' } },
      { status: 404, description: 'Không tìm thấy người dùng', example: { message: 'Không tìm thấy người dùng' } },
      { status: 500, description: 'Lỗi server, có thể do kết nối database', example: { message: 'Lỗi server', error: 'Database connection failed' } },
    ],
  },
  {
    method: 'GET',
    path: '/api/users/favorite-products',
    description: 'Lấy danh sách sản phẩm yêu thích',
    fullDescription:
      'Trả về danh sách sản phẩm yêu thích của người dùng hiện tại, bao gồm thông tin chi tiết của sản phẩm (name, images, active) và trạng thái danh mục (id_category.status). Yêu cầu token JWT hợp lệ.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Yêu cầu token JWT của người dùng trong header Authorization.',
    },
    parameters: [],
    requestExample: {
      headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
    },
    response: {
      status: 200,
      description: 'Danh sách sản phẩm yêu thích',
      example: {
        favoriteProducts: [
          {
            _id: '60d5f8e9b1a2b4f8e8f9e2b1',
            name: 'Sản phẩm A',
            images: ['https://res.cloudinary.com/your_cloud_name/image/upload/product1.jpg'],
            active: true,
            isActive: true,
            id_category: { status: 'active' },
          },
        ],
      },
    },
    errorResponses: [
      { status: 400, description: 'User ID không hợp lệ', example: { message: 'User ID không hợp lệ', received: 'invalid_id' } },
      { status: 401, description: 'Không có token, token không hợp lệ, hoặc đã hết hạn', example: { message: 'Người dùng không được xác thực' } },
      { status: 404, description: 'Không tìm thấy người dùng', example: { message: 'Không tìm thấy người dùng' } },
      { status: 500, description: 'Lỗi server, có thể do kết nối database hoặc lỗi populate', example: { message: 'Lỗi server', error: 'Database connection failed' } },
    ],
  },
  {
    method: 'PUT',
    path: '/api/users/update/:id',
    description: 'Cập nhật thông tin người dùng',
    fullDescription:
      'Cập nhật thông tin người dùng (username, phone, email, address, birthday, status, role). Người dùng chỉ có thể cập nhật thông tin của mình, admin có thể cập nhật bất kỳ người dùng nào. Chỉ admin được phép cập nhật status và role. Gửi email thông báo nếu trạng thái tài khoản thay đổi (active → inactive hoặc ngược lại). Yêu cầu token JWT hợp lệ.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Yêu cầu token JWT của người dùng hoặc admin trong header Authorization.',
    },
    parameters: [
      { name: 'id', type: 'string', description: 'ObjectId của người dùng', required: true, in: 'path' },
      { name: 'username', type: 'string', description: 'Tên người dùng mới (ít nhất 1 ký tự)', required: false, in: 'body' },
      { name: 'phone', type: 'string', description: 'Số điện thoại mới (bắt đầu bằng 0, 10 chữ số, ví dụ: 0987654321)', required: false, in: 'body' },
      { name: 'email', type: 'string', description: 'Email mới (hợp lệ, duy nhất)', required: false, in: 'body' },
      { name: 'address', type: 'string', description: 'Địa chỉ mới', required: false, in: 'body' },
      { name: 'birthday', type: 'string', description: 'Ngày sinh mới (ISO YYYY-MM-DD)', required: false, in: 'body' },
      { name: 'status', type: 'string', description: 'Trạng thái mới (active, inactive, chỉ admin)', required: false, in: 'body' },
      { name: 'role', type: 'string', description: 'Vai trò mới (user, admin, chỉ admin)', required: false, in: 'body' },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
      params: { id: '60d5f8e9b1a2b4f8e8f9e2b0' },
      body: {
        username: 'john_doe_updated',
        phone: '0912345678',
        email: 'john.doe.new@example.com',
        address: '456 Nguyễn Trãi, Hà Nội',
        birthday: '1990-01-02',
        status: 'inactive', // Chỉ admin
        role: 'user', // Chỉ admin
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
          address: '456 Nguyễn Trãi, Hà Nội',
          birthday: '1990-01-02T00:00:00.000Z',
          listOrder: [],
          favoriteProducts: [],
          status: 'inactive',
          role: 'user',
          createdAt: '2025-08-28T05:36:00.000Z',
          temporaryAddress1: { addressLine: '', ward: '', district: '', cityOrProvince: '' },
          temporaryAddress2: { addressLine: '', ward: '', district: '', cityOrProvince: '' },
        },
      },
    },
    errorResponses: [
      { status: 400, description: 'Dữ liệu không hợp lệ (phone, email, birthday không đúng định dạng)', example: { message: 'Dữ liệu không hợp lệ', errors: 'Số điện thoại không hợp lệ' } },
      { status: 401, description: 'Không có token, token không hợp lệ, hoặc đã hết hạn', example: { message: 'Token không hợp lệ' } },
      { status: 403, description: 'Người dùng không có quyền cập nhật thông tin này', example: { message: 'Bạn không có quyền cập nhật người dùng này' } },
      { status: 404, description: 'Không tìm thấy người dùng', example: { message: 'Không tìm thấy người dùng' } },
      { status: 409, description: 'Email mới đã được sử dụng', example: { message: 'Email đã tồn tại' } },
      { status: 500, description: 'Lỗi server, có thể do kết nối database hoặc gửi email thất bại', example: { message: 'Lỗi server', error: 'Failed to send email' } },
    ],
  },
  {
    method: 'DELETE',
    path: '/api/users/:id',
    description: 'Xóa người dùng',
    fullDescription:
      'Xóa một người dùng theo ID. Chỉ người dùng sở hữu tài khoản hoặc admin được phép thực hiện. Yêu cầu token JWT hợp lệ.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Yêu cầu token JWT của người dùng hoặc admin trong header Authorization.',
    },
    parameters: [
      { name: 'id', type: 'string', description: 'ObjectId của người dùng', required: true, in: 'path' },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
      params: { id: '60d5f8e9b1a2b4f8e8f9e2b0' },
    },
    response: {
      status: 200,
      description: 'Xóa người dùng thành công',
      example: {
        message: 'Xóa người dùng thành công',
      },
    },
    errorResponses: [
      { status: 401, description: 'Không có token, token không hợp lệ, hoặc đã hết hạn', example: { message: 'Token không hợp lệ' } },
      { status: 403, description: 'Người dùng không có quyền xóa tài khoản này', example: { message: 'Bạn không có quyền xóa người dùng này' } },
      { status: 404, description: 'Không tìm thấy người dùng', example: { message: 'Người dùng không tồn tại' } },
      { status: 500, description: 'Lỗi server, có thể do kết nối database', example: { message: 'Lỗi server', error: 'Database connection failed' } },
    ],
  },
];

export default userEndpoints;