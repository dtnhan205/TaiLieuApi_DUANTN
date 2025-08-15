const googleAuthEndpoints = [
  {
    method: 'GET',
    path: '/auth/google',
    description: 'Khởi tạo đăng nhập bằng Google',
    fullDescription:
      'Chuyển hướng người dùng đến trang xác thực của Google để đăng nhập, yêu cầu quyền truy cập vào thông tin `profile` và `email`. Endpoint này sử dụng session để lưu trạng thái đăng nhập. Không yêu cầu xác thực trước.',
    auth: {
      required: false,
      description: 'Không yêu cầu xác thực trước. Endpoint này khởi tạo quy trình đăng nhập Google.',
    },
    parameters: [],
    response: {
      status: 302,
      description: 'Chuyển hướng đến trang đăng nhập Google',
      example: null, // Không có body trả về vì đây là chuyển hướng
    },
    errorResponses: [
      { status: 500, description: 'Lỗi máy chủ, có thể do cấu hình OAuth hoặc kết nối database' },
    ],
  },
  {
    method: 'GET',
    path: '/auth/google/callback',
    description: 'Xử lý callback đăng nhập Google',
    fullDescription:
      'Xử lý callback từ Google sau khi người dùng xác thực. Tạo token JWT chứa thông tin `id`, `email`, và `role` của người dùng, sau đó chuyển hướng đến URL frontend (mặc định là `/user/login` hoặc URL được cung cấp qua query `callback`) kèm token trong query string.',
    auth: {
      required: false,
      description: 'Không yêu cầu xác thực trước, nhưng Google sẽ yêu cầu người dùng đăng nhập. Endpoint này sử dụng session để xác thực.',
    },
    parameters: [
      {
        name: 'callback',
        type: 'string',
        description: 'URL tùy chọn để chuyển hướng sau khi đăng nhập thành công (mặc định: `http://localhost:3000/user/login`)',
        required: false,
        in: 'query',
      },
    ],
    response: {
      status: 302,
      description: 'Chuyển hướng đến URL frontend kèm token JWT trong query string',
      example: {
        redirect: 'http://purebotanica.online/user/login?token=<jwt_token>',
      },
    },
    errorResponses: [
      { status: 401, description: 'Lỗi xác thực, thông tin người dùng từ Google không hợp lệ' },
      { status: 500, description: 'Lỗi máy chủ, có thể do cấu hình OAuth hoặc kết nối database' },
    ],
  },
  {
    method: 'GET',
    path: '/logout',
    description: 'Đăng xuất người dùng',
    fullDescription:
      'Đăng xuất người dùng, xóa session hiện tại và chuyển hướng về URL gốc (mặc định: `http://purebotanica.online` hoặc giá trị `BASE_URL` trong biến môi trường).',
    auth: {
      required: false,
      description: 'Không yêu cầu xác thực trước, nhưng session phải tồn tại để đăng xuất.',
    },
    parameters: [],
    response: {
      status: 302,
      description: 'Chuyển hướng về URL gốc',
      example: {
        redirect: 'http://purebotanica.online',
      },
    },
    errorResponses: [
      { status: 500, description: 'Lỗi máy chủ, có thể do lỗi xóa session hoặc kết nối database' },
    ],
  },
];

export default googleAuthEndpoints;