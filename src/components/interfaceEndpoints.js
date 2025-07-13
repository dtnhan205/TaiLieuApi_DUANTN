const interfaceEndpoints = [
  {
    method: 'POST',
    path: '/api/interface/logo-shop',
    description: 'Cập nhật logo cửa hàng',
    fullDescription:
      'Cập nhật logo cửa hàng bằng cách tải lên một file hình ảnh. Hình ảnh cũ sẽ bị xóa. Yêu cầu quyền admin và token JWT hợp lệ. Hình ảnh được lưu trong thư mục public/images.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Yêu cầu token JWT của admin trong header Authorization.',
    },
    parameters: [
      {
        name: 'logo',
        type: 'file',
        description: 'File hình ảnh logo (định dạng: jpg, png, v.v.)',
        required: true,
        in: 'formData',
      },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer <token>' },
      files: {
        logo: 'logo.png',
      },
    },
    response: {
      status: 200,
      description: 'Cập nhật logo thành công',
      example: {
        message: 'Cập nhật logo thành công',
        paths: ['images/logo.png'],
      },
    },
    errorResponses: [
      { status: 400, description: 'Không có file logo được tải lên' },
      { status: 401, description: 'Không có token, token không hợp lệ, hoặc đã hết hạn' },
      { status: 403, description: 'Người dùng không có quyền admin' },
      { status: 500, description: 'Lỗi server, có thể do lỗi lưu file hoặc kết nối database' },
    ],
  },
  {
    method: 'POST',
    path: '/api/interface/favicon',
    description: 'Cập nhật favicon',
    fullDescription:
      'Cập nhật favicon bằng cách tải lên một file hình ảnh. Hình ảnh cũ sẽ bị xóa. Yêu cầu quyền admin và token JWT hợp lệ. Hình ảnh được lưu trong thư mục public/images.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Yêu cầu token JWT của admin trong header Authorization.',
    },
    parameters: [
      {
        name: 'favicon',
        type: 'file',
        description: 'File hình ảnh favicon (định dạng: ico, png, v.v.)',
        required: true,
        in: 'formData',
      },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer <token>' },
      files: {
        favicon: 'favicon.ico',
      },
    },
    response: {
      status: 200,
      description: 'Cập nhật favicon thành công',
      example: {
        message: 'Cập nhật favicon thành công',
        paths: ['images/favicon.ico'],
      },
    },
    errorResponses: [
      { status: 400, description: 'Không có file favicon được tải lên' },
      { status: 401, description: 'Không có token, token không hợp lệ, hoặc đã hết hạn' },
      { status: 403, description: 'Người dùng không có quyền admin' },
      { status: 500, description: 'Lỗi server, có thể do lỗi lưu file hoặc kết nối database' },
    ],
  },
  {
    method: 'POST',
    path: '/api/interface/banner1',
    description: 'Cập nhật banner1',
    fullDescription:
      'Cập nhật banner1 bằng cách tải lên tối đa 5 file hình ảnh. Hình ảnh cũ sẽ bị xóa. Yêu cầu quyền admin và token JWT hợp lệ. Hình ảnh được lưu trong thư mục public/images.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Yêu cầu token JWT của admin trong header Authorization.',
    },
    parameters: [
      {
        name: 'banner1',
        type: 'file',
        description: 'File hình ảnh banner1 (tối đa 5 file, định dạng: jpg, png, v.v.)',
        required: true,
        in: 'formData',
      },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer <token>' },
      files: {
        banner1: ['banner1_1.jpg', 'banner1_2.jpg'],
      },
    },
    response: {
      status: 200,
      description: 'Cập nhật banner1 thành công',
      example: {
        message: 'Cập nhật banner1 thành công',
        paths: ['images/banner1_1.jpg', 'images/banner1_2.jpg'],
      },
    },
    errorResponses: [
      { status: 400, description: 'Không có file banner1 được tải lên' },
      { status: 401, description: 'Không có token, token không hợp lệ, hoặc đã hết hạn' },
      { status: 403, description: 'Người dùng không có quyền admin' },
      { status: 500, description: 'Lỗi server, có thể do lỗi lưu file hoặc kết nối database' },
    ],
  },
  {
    method: 'POST',
    path: '/api/interface/banner2',
    description: 'Cập nhật banner2',
    fullDescription:
      'Cập nhật banner2 bằng cách tải lên một file hình ảnh. Hình ảnh cũ sẽ bị xóa. Yêu cầu quyền admin và token JWT hợp lệ. Hình ảnh được lưu trong thư mục public/images.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Yêu cầu token JWT của admin trong header Authorization.',
    },
    parameters: [
      {
        name: 'banner2',
        type: 'file',
        description: 'File hình ảnh banner2 (định dạng: jpg, png, v.v.)',
        required: true,
        in: 'formData',
      },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer <token>' },
      files: {
        banner2: 'banner2.jpg',
      },
    },
    response: {
      status: 200,
      description: 'Cập nhật banner2 thành công',
      example: {
        message: 'Cập nhật banner2 thành công',
        paths: ['images/banner2.jpg'],
      },
    },
    errorResponses: [
      { status: 400, description: 'Không có file banner2 được tải lên' },
      { status: 401, description: 'Không có token, token không hợp lệ, hoặc đã hết hạn' },
      { status: 403, description: 'Người dùng không có quyền admin' },
      { status: 500, description: 'Lỗi server, có thể do lỗi lưu file hoặc kết nối database' },
    ],
  },
  {
    method: 'POST',
    path: '/api/interface/decor-images',
    description: 'Cập nhật hình ảnh decor',
    fullDescription:
      'Cập nhật hình ảnh decor bằng cách tải lên tối đa 2 file hình ảnh. Hình ảnh cũ sẽ bị xóa. Yêu cầu quyền admin và token JWT hợp lệ. Hình ảnh được lưu trong thư mục public/images.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Yêu cầu token JWT của admin trong header Authorization.',
    },
    parameters: [
      {
        name: 'decor',
        type: 'file',
        description: 'File hình ảnh decor (tối đa 2 file, định dạng: jpg, png, v.v.)',
        required: true,
        in: 'formData',
      },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer <token>' },
      files: {
        decor: ['decor1.jpg', 'decor2.jpg'],
      },
    },
    response: {
      status: 200,
      description: 'Cập nhật hình ảnh decor thành công',
      example: {
        message: 'Cập nhật decor thành công',
        paths: ['images/decor1.jpg', 'images/decor2.jpg'],
      },
    },
    errorResponses: [
      { status: 400, description: 'Không có file decor được tải lên' },
      { status: 401, description: 'Không có token, token không hợp lệ, hoặc đã hết hạn' },
      { status: 403, description: 'Người dùng không có quyền admin' },
      { status: 500, description: 'Lỗi server, có thể do lỗi lưu file hoặc kết nối database' },
    ],
  },
  {
    method: 'POST',
    path: '/api/interface/banner3',
    description: 'Cập nhật banner3',
    fullDescription:
      'Cập nhật banner3 bằng cách tải lên một file hình ảnh. Hình ảnh cũ sẽ bị xóa. Yêu cầu quyền admin và token JWT hợp lệ. Hình ảnh được lưu trong thư mục public/images.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Yêu cầu token JWT của admin trong header Authorization.',
    },
    parameters: [
      {
        name: 'banner3',
        type: 'file',
        description: 'File hình ảnh banner3 (định dạng: jpg, png, v.v.)',
        required: true,
        in: 'formData',
      },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer <token>' },
      files: {
        banner3: 'banner3.jpg',
      },
    },
    response: {
      status: 200,
      description: 'Cập nhật banner3 thành công',
      example: {
        message: 'Cập nhật banner3 thành công',
        paths: ['images/banner3.jpg'],
      },
    },
    errorResponses: [
      { status: 400, description: 'Không có file banner3 được tải lên' },
      { status: 401, description: 'Không có token, token không hợp lệ, hoặc đã hết hạn' },
      { status: 403, description: 'Người dùng không có quyền admin' },
      { status: 500, description: 'Lỗi server, có thể do lỗi lưu file hoặc kết nối database' },
    ],
  },
  {
    method: 'POST',
    path: '/api/interface/banner-about',
    description: 'Cập nhật banner trang About',
    fullDescription:
      'Cập nhật banner cho trang About bằng cách tải lên một file hình ảnh. Hình ảnh cũ sẽ bị xóa. Yêu cầu quyền admin và token JWT hợp lệ. Hình ảnh được lưu trong thư mục public/images.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Yêu cầu token JWT của admin trong header Authorization.',
    },
    parameters: [
      {
        name: 'bannerAbout',
        type: 'file',
        description: 'File hình ảnh bannerAbout (định dạng: jpg, png, v.v.)',
        required: true,
        in: 'formData',
      },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer <token>' },
      files: {
        bannerAbout: 'bannerAbout.jpg',
      },
    },
    response: {
      status: 200,
      description: 'Cập nhật bannerAbout thành công',
      example: {
        message: 'Cập nhật bannerAbout thành công',
        paths: ['images/bannerAbout.jpg'],
      },
    },
    errorResponses: [
      { status: 400, description: 'Không có file bannerAbout được tải lên' },
      { status: 401, description: 'Không có token, token không hợp lệ, hoặc đã hết hạn' },
      { status: 403, description: 'Người dùng không có quyền admin' },
      { status: 500, description: 'Lỗi server, có thể do lỗi lưu file hoặc kết nối database' },
    ],
  },
  {
    method: 'POST',
    path: '/api/interface/banner-news',
    description: 'Cập nhật banner trang News',
    fullDescription:
      'Cập nhật banner cho trang News bằng cách tải lên một file hình ảnh. Hình ảnh cũ sẽ bị xóa. Yêu cầu quyền admin và token JWT hợp lệ. Hình ảnh được lưu trong thư mục public/images.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Yêu cầu token JWT của admin trong header Authorization.',
    },
    parameters: [
      {
        name: 'bannerNews',
        type: 'file',
        description: 'File hình ảnh bannerNews (định dạng: jpg, png, v.v.)',
        required: true,
        in: 'formData',
      },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer <token>' },
      files: {
        bannerNews: 'bannerNews.jpg',
      },
    },
    response: {
      status: 200,
      description: 'Cập nhật bannerNews thành công',
      example: {
        message: 'Cập nhật bannerNews thành công',
        paths: ['images/bannerNews.jpg'],
      },
    },
    errorResponses: [
      { status: 400, description: 'Không có file bannerNews được tải lên' },
      { status: 401, description: 'Không có token, token không hợp lệ, hoặc đã hết hạn' },
      { status: 403, description: 'Người dùng không có quyền admin' },
      { status: 500, description: 'Lỗi server, có thể do lỗi lưu file hoặc kết nối database' },
    ],
  },
  {
    method: 'GET',
    path: '/api/interface/logo-shop',
    description: 'Lấy đường dẫn logo cửa hàng',
    fullDescription:
      'Trả về danh sách đường dẫn của logo cửa hàng từ collection Interface. Endpoint này công khai, không yêu cầu xác thực.',
    auth: {
      required: false,
      description: 'Không yêu cầu token. Endpoint này công khai.',
    },
    parameters: [],
    response: {
      status: 200,
      description: 'Lấy logo thành công',
      example: {
        type: 'logo',
        paths: ['images/logo.png'],
      },
    },
    errorResponses: [
      { status: 404, description: 'Không tìm thấy hình ảnh logo' },
      { status: 500, description: 'Lỗi server, có thể do kết nối database' },
    ],
  },
  {
    method: 'GET',
    path: '/api/interface/favicon',
    description: 'Lấy đường dẫn favicon',
    fullDescription:
      'Trả về danh sách đường dẫn của favicon từ collection Interface. Endpoint này công khai, không yêu cầu xác thực.',
    auth: {
      required: false,
      description: 'Không yêu cầu token. Endpoint này công khai.',
    },
    parameters: [],
    response: {
      status: 200,
      description: 'Lấy favicon thành công',
      example: {
        type: 'favicon',
        paths: ['images/favicon.ico'],
      },
    },
    errorResponses: [
      { status: 404, description: 'Không tìm thấy hình ảnh favicon' },
      { status: 500, description: 'Lỗi server, có thể do kết nối database' },
    ],
  },
  {
    method: 'GET',
    path: '/api/interface/banner1',
    description: 'Lấy đường dẫn banner1',
    fullDescription:
      'Trả về danh sách đường dẫn của banner1 từ collection Interface. Endpoint này công khai, không yêu cầu xác thực.',
    auth: {
      required: false,
      description: 'Không yêu cầu token. Endpoint này công khai.',
    },
    parameters: [],
    response: {
      status: 200,
      description: 'Lấy banner1 thành công',
      example: {
        type: 'banner1',
        paths: ['images/banner1_1.jpg', 'images/banner1_2.jpg'],
      },
    },
    errorResponses: [
      { status: 404, description: 'Không tìm thấy hình ảnh banner1' },
      { status: 500, description: 'Lỗi server, có thể do kết nối database' },
    ],
  },
  {
    method: 'GET',
    path: '/api/interface/banner2',
    description: 'Lấy đường dẫn banner2',
    fullDescription:
      'Trả về danh sách đường dẫn của banner2 từ collection Interface. Endpoint này công khai, không yêu cầu xác thực.',
    auth: {
      required: false,
      description: 'Không yêu cầu token. Endpoint này công khai.',
    },
    parameters: [],
    response: {
      status: 200,
      description: 'Lấy banner2 thành công',
      example: {
        type: 'banner2',
        paths: ['images/banner2.jpg'],
      },
    },
    errorResponses: [
      { status: 404, description: 'Không tìm thấy hình ảnh banner2' },
      { status: 500, description: 'Lỗi server, có thể do kết nối database' },
    ],
  },
  {
    method: 'GET',
    path: '/api/interface/decor-images',
    description: 'Lấy đường dẫn hình ảnh decor',
    fullDescription:
      'Trả về danh sách đường dẫn của hình ảnh decor từ collection Interface. Endpoint này công khai, không yêu cầu xác thực.',
    auth: {
      required: false,
      description: 'Không yêu cầu token. Endpoint này công khai.',
    },
    parameters: [],
    response: {
      status: 200,
      description: 'Lấy hình ảnh decor thành công',
      example: {
        type: 'decor',
        paths: ['images/decor1.jpg', 'images/decor2.jpg'],
      },
    },
    errorResponses: [
      { status: 404, description: 'Không tìm thấy hình ảnh decor' },
      { status: 500, description: 'Lỗi server, có thể do kết nối database' },
    ],
  },
  {
    method: 'GET',
    path: '/api/interface/banner3',
    description: 'Lấy đường dẫn banner3',
    fullDescription:
      'Trả về danh sách đường dẫn của banner3 từ collection Interface. Endpoint này công khai, không yêu cầu xác thực.',
    auth: {
      required: false,
      description: 'Không yêu cầu token. Endpoint này công khai.',
    },
    parameters: [],
    response: {
      status: 200,
      description: 'Lấy banner3 thành công',
      example: {
        type: 'banner3',
        paths: ['images/banner3.jpg'],
      },
    },
    errorResponses: [
      { status: 404, description: 'Không tìm thấy hình ảnh banner3' },
      { status: 500, description: 'Lỗi server, có thể do kết nối database' },
    ],
  },
  {
    method: 'GET',
    path: '/api/interface/banner-about',
    description: 'Lấy đường dẫn banner trang About',
    fullDescription:
      'Trả về danh sách đường dẫn của bannerAbout từ collection Interface. Endpoint này công khai, không yêu cầu xác thực.',
    auth: {
      required: false,
      description: 'Không yêu cầu token. Endpoint này công khai.',
    },
    parameters: [],
    response: {
      status: 200,
      description: 'Lấy bannerAbout thành công',
      example: {
        type: 'bannerAbout',
        paths: ['images/bannerAbout.jpg'],
      },
    },
    errorResponses: [
      { status: 404, description: 'Không tìm thấy hình ảnh bannerAbout' },
      { status: 500, description: 'Lỗi server, có thể do kết nối database' },
    ],
  },
  {
    method: 'GET',
    path: '/api/interface/banner-news',
    description: 'Lấy đường dẫn banner trang News',
    fullDescription:
      'Trả về danh sách đường dẫn của bannerNews từ collection Interface. Endpoint này công khai, không yêu cầu xác thực.',
    auth: {
      required: false,
      description: 'Không yêu cầu token. Endpoint này công khai.',
    },
    parameters: [],
    response: {
      status: 200,
      description: 'Lấy bannerNews thành công',
      example: {
        type: 'bannerNews',
        paths: ['images/bannerNews.jpg'],
      },
    },
    errorResponses: [
      { status: 404, description: 'Không tìm thấy hình ảnh bannerNews' },
      { status: 500, description: 'Lỗi server, có thể do kết nối database' },
    ],
  },
];

export default interfaceEndpoints;