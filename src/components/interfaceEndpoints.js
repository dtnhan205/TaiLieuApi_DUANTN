const interfaceEndpoints = [
  {
    method: 'PUT',
    path: '/api/interfaces/logo',
    description: 'Cập nhật logo cửa hàng',
    fullDescription:
      'Cập nhật logo cửa hàng bằng cách tải lên một file hình ảnh. Hình ảnh cũ sẽ bị xóa trong database. Yêu cầu quyền admin và token JWT hợp lệ. Hình ảnh được lưu trên Cloudinary.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description:
        'Token JWT của admin được yêu cầu trong header. Token được cấp sau khi đăng nhập qua endpoint `/api/users/login`.',
    },
    parameters: [
      {
        name: 'image',
        type: 'file',
        description: 'File hình ảnh logo (jpg, jpeg, png, gif, webp, svg; tối đa 20MB)',
        required: true,
        in: 'formData',
      },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer <token>', 'Content-Type': 'multipart/form-data' },
      files: ['logo.png'],
    },
    response: {
      status: 200,
      description: 'Cập nhật logo thành công',
      example: {
        message: 'Cập nhật logo thành công',
        paths: ['https://res.cloudinary.com/your_cloud_name/image/upload/logo.png'],
      },
    },
    errorResponses: [
      { status: 400, description: 'Không có file hình ảnh được tải lên' },
      { status: 400, description: 'Chỉ hỗ trợ file ảnh (jpg, jpeg, png, gif, webp, svg)' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Không có quyền admin' },
      { status: 500, description: 'Lỗi server, có thể do kết nối database hoặc Cloudinary' },
    ],
  },
  {
    method: 'PUT',
    path: '/api/interfaces/favicon',
    description: 'Cập nhật favicon',
    fullDescription:
      'Cập nhật favicon bằng cách tải lên một file hình ảnh. Hình ảnh cũ sẽ bị xóa trong database. Yêu cầu quyền admin và token JWT hợp lệ. Hình ảnh được lưu trên Cloudinary.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description:
        'Token JWT của admin được yêu cầu trong header. Token được cấp sau khi đăng nhập qua endpoint `/api/users/login`.',
    },
    parameters: [
      {
        name: 'image',
        type: 'file',
        description: 'File hình ảnh favicon (ico, jpg, jpeg, png, gif, webp, svg; tối đa 20MB)',
        required: true,
        in: 'formData',
      },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer <token>', 'Content-Type': 'multipart/form-data' },
      files: ['favicon.ico'],
    },
    response: {
      status: 200,
      description: 'Cập nhật favicon thành công',
      example: {
        message: 'Cập nhật favicon thành công',
        paths: ['https://res.cloudinary.com/your_cloud_name/image/upload/favicon.ico'],
      },
    },
    errorResponses: [
      { status: 400, description: 'Không có file hình ảnh được tải lên' },
      { status: 400, description: 'Chỉ hỗ trợ file ảnh (ico, jpg, jpeg, png, gif, webp, svg)' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Không có quyền admin' },
      { status: 500, description: 'Lỗi server, có thể do kết nối database hoặc Cloudinary' },
    ],
  },
  {
    method: 'PUT',
    path: '/api/interfaces/banner1',
    description: 'Cập nhật banner1',
    fullDescription:
      'Cập nhật banner1 bằng cách tải lên tối đa 5 file hình ảnh. Hình ảnh cũ sẽ bị xóa trong database. Yêu cầu quyền admin và token JWT hợp lệ. Hình ảnh được lưu trên Cloudinary.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description:
        'Token JWT của admin được yêu cầu trong header. Token được cấp sau khi đăng nhập qua endpoint `/api/users/login`.',
    },
    parameters: [
      {
        name: 'images',
        type: 'file',
        description: 'File hình ảnh banner1 (tối đa 5 file, jpg, jpeg, png, gif, webp, svg; tối đa 20MB)',
        required: true,
        in: 'formData',
      },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer <token>', 'Content-Type': 'multipart/form-data' },
      files: ['banner1_1.jpg', 'banner1_2.jpg'],
    },
    response: {
      status: 200,
      description: 'Cập nhật banner1 thành công',
      example: {
        message: 'Cập nhật banner1 thành công',
        paths: [
          'https://res.cloudinary.com/your_cloud_name/image/upload/banner1_1.jpg',
          'https://res.cloudinary.com/your_cloud_name/image/upload/banner1_2.jpg',
        ],
      },
    },
    errorResponses: [
      { status: 400, description: 'Không có file hình ảnh được tải lên' },
      { status: 400, description: 'Chỉ hỗ trợ file ảnh (jpg, jpeg, png, gif, webp, svg)' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Không có quyền admin' },
      { status: 500, description: 'Lỗi server, có thể do kết nối database hoặc Cloudinary' },
    ],
  },
  {
    method: 'PUT',
    path: '/api/interfaces/banner2',
    description: 'Cập nhật banner2',
    fullDescription:
      'Cập nhật banner2 bằng cách tải lên một file hình ảnh. Hình ảnh cũ sẽ bị xóa trong database. Yêu cầu quyền admin và token JWT hợp lệ. Hình ảnh được lưu trên Cloudinary.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description:
        'Token JWT của admin được yêu cầu trong header. Token được cấp sau khi đăng nhập qua endpoint `/api/users/login`.',
    },
    parameters: [
      {
        name: 'image',
        type: 'file',
        description: 'File hình ảnh banner2 (jpg, jpeg, png, gif, webp, svg; tối đa 20MB)',
        required: true,
        in: 'formData',
      },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer <token>', 'Content-Type': 'multipart/form-data' },
      files: ['banner2.jpg'],
    },
    response: {
      status: 200,
      description: 'Cập nhật banner2 thành công',
      example: {
        message: 'Cập nhật banner2 thành công',
        paths: ['https://res.cloudinary.com/your_cloud_name/image/upload/banner2.jpg'],
      },
    },
    errorResponses: [
      { status: 400, description: 'Không có file hình ảnh được tải lên' },
      { status: 400, description: 'Chỉ hỗ trợ file ảnh (jpg, jpeg, png, gif, webp, svg)' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Không có quyền admin' },
      { status: 500, description: 'Lỗi server, có thể do kết nối database hoặc Cloudinary' },
    ],
  },
  {
    method: 'PUT',
    path: '/api/interfaces/decor',
    description: 'Cập nhật hình ảnh decor',
    fullDescription:
      'Cập nhật hình ảnh decor bằng cách tải lên tối đa 2 file hình ảnh. Hình ảnh cũ sẽ bị xóa trong database. Yêu cầu quyền admin và token JWT hợp lệ. Hình ảnh được lưu trên Cloudinary.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description:
        'Token JWT của admin được yêu cầu trong header. Token được cấp sau khi đăng nhập qua endpoint `/api/users/login`.',
    },
    parameters: [
      {
        name: 'images',
        type: 'file',
        description: 'File hình ảnh decor (tối đa 2 file, jpg, jpeg, png, gif, webp, svg; tối đa 20MB)',
        required: true,
        in: 'formData',
      },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer <token>', 'Content-Type': 'multipart/form-data' },
      files: ['decor1.jpg', 'decor2.jpg'],
    },
    response: {
      status: 200,
      description: 'Cập nhật hình ảnh decor thành công',
      example: {
        message: 'Cập nhật decor thành công',
        paths: [
          'https://res.cloudinary.com/your_cloud_name/image/upload/decor1.jpg',
          'https://res.cloudinary.com/your_cloud_name/image/upload/decor2.jpg',
        ],
      },
    },
    errorResponses: [
      { status: 400, description: 'Không có file hình ảnh được tải lên' },
      { status: 400, description: 'Chỉ hỗ trợ file ảnh (jpg, jpeg, png, gif, webp, svg)' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Không có quyền admin' },
      { status: 500, description: 'Lỗi server, có thể do kết nối database hoặc Cloudinary' },
    ],
  },
  {
    method: 'PUT',
    path: '/api/interfaces/banner3',
    description: 'Cập nhật banner3',
    fullDescription:
      'Cập nhật banner3 bằng cách tải lên một file hình ảnh. Hình ảnh cũ sẽ bị xóa trong database. Yêu cầu quyền admin và token JWT hợp lệ. Hình ảnh được lưu trên Cloudinary.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description:
        'Token JWT của admin được yêu cầu trong header. Token được cấp sau khi đăng nhập qua endpoint `/api/users/login`.',
    },
    parameters: [
      {
        name: 'image',
        type: 'file',
        description: 'File hình ảnh banner3 (jpg, jpeg, png, gif, webp, svg; tối đa 20MB)',
        required: true,
        in: 'formData',
      },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer <token>', 'Content-Type': 'multipart/form-data' },
      files: ['banner3.jpg'],
    },
    response: {
      status: 200,
      description: 'Cập nhật banner3 thành công',
      example: {
        message: 'Cập nhật banner3 thành công',
        paths: ['https://res.cloudinary.com/your_cloud_name/image/upload/banner3.jpg'],
      },
    },
    errorResponses: [
      { status: 400, description: 'Không có file hình ảnh được tải lên' },
      { status: 400, description: 'Chỉ hỗ trợ file ảnh (jpg, jpeg, png, gif, webp, svg)' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Không có quyền admin' },
      { status: 500, description: 'Lỗi server, có thể do kết nối database hoặc Cloudinary' },
    ],
  },
  {
    method: 'PUT',
    path: '/api/interfaces/bannerAbout',
    description: 'Cập nhật banner trang About',
    fullDescription:
      'Cập nhật banner cho trang About bằng cách tải lên một file hình ảnh. Hình ảnh cũ sẽ bị xóa trong database. Yêu cầu quyền admin và token JWT hợp lệ. Hình ảnh được lưu trên Cloudinary.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description:
        'Token JWT của admin được yêu cầu trong header. Token được cấp sau khi đăng nhập qua endpoint `/api/users/login`.',
    },
    parameters: [
      {
        name: 'image',
        type: 'file',
        description: 'File hình ảnh bannerAbout (jpg, jpeg, png, gif, webp, svg; tối đa 20MB)',
        required: true,
        in: 'formData',
      },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer <token>', 'Content-Type': 'multipart/form-data' },
      files: ['bannerAbout.jpg'],
    },
    response: {
      status: 200,
      description: 'Cập nhật bannerAbout thành công',
      example: {
        message: 'Cập nhật bannerAbout thành công',
        paths: ['https://res.cloudinary.com/your_cloud_name/image/upload/bannerAbout.jpg'],
      },
    },
    errorResponses: [
      { status: 400, description: 'Không có file hình ảnh được tải lên' },
      { status: 400, description: 'Chỉ hỗ trợ file ảnh (jpg, jpeg, png, gif, webp, svg)' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Không có quyền admin' },
      { status: 500, description: 'Lỗi server, có thể do kết nối database hoặc Cloudinary' },
    ],
  },
  {
    method: 'PUT',
    path: '/api/interfaces/bannerNews',
    description: 'Cập nhật banner trang News',
    fullDescription:
      'Cập nhật banner cho trang News bằng cách tải lên một file hình ảnh. Hình ảnh cũ sẽ bị xóa trong database. Yêu cầu quyền admin và token JWT hợp lệ. Hình ảnh được lưu trên Cloudinary.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description:
        'Token JWT của admin được yêu cầu trong header. Token được cấp sau khi đăng nhập qua endpoint `/api/users/login`.',
    },
    parameters: [
      {
        name: 'image',
        type: 'file',
        description: 'File hình ảnh bannerNews (jpg, jpeg, png, gif, webp, svg; tối đa 20MB)',
        required: true,
        in: 'formData',
      },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer <token>', 'Content-Type': 'multipart/form-data' },
      files: ['bannerNews.jpg'],
    },
    response: {
      status: 200,
      description: 'Cập nhật bannerNews thành công',
      example: {
        message: 'Cập nhật bannerNews thành công',
        paths: ['https://res.cloudinary.com/your_cloud_name/image/upload/bannerNews.jpg'],
      },
    },
    errorResponses: [
      { status: 400, description: 'Không có file hình ảnh được tải lên' },
      { status: 400, description: 'Chỉ hỗ trợ file ảnh (jpg, jpeg, png, gif, webp, svg)' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Không có quyền admin' },
      { status: 500, description: 'Lỗi server, có thể do kết nối database hoặc Cloudinary' },
    ],
  },
  {
    method: 'GET',
    path: '/api/interfaces/logo',
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
        paths: ['https://res.cloudinary.com/your_cloud_name/image/upload/logo.png'],
      },
    },
    errorResponses: [
      { status: 404, description: 'Không tìm thấy hình ảnh logo' },
      { status: 500, description: 'Lỗi server, có thể do kết nối database' },
    ],
  },
  {
    method: 'GET',
    path: '/api/interfaces/favicon',
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
        paths: ['https://res.cloudinary.com/your_cloud_name/image/upload/favicon.ico'],
      },
    },
    errorResponses: [
      { status: 404, description: 'Không tìm thấy hình ảnh favicon' },
      { status: 500, description: 'Lỗi server, có thể do kết nối database' },
    ],
  },
  {
    method: 'GET',
    path: '/api/interfaces/banner1',
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
        paths: [
          'https://res.cloudinary.com/your_cloud_name/image/upload/banner1_1.jpg',
          'https://res.cloudinary.com/your_cloud_name/image/upload/banner1_2.jpg',
        ],
      },
    },
    errorResponses: [
      { status: 404, description: 'Không tìm thấy hình ảnh banner1' },
      { status: 500, description: 'Lỗi server, có thể do kết nối database' },
    ],
  },
  {
    method: 'GET',
    path: '/api/interfaces/banner2',
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
        paths: ['https://res.cloudinary.com/your_cloud_name/image/upload/banner2.jpg'],
      },
    },
    errorResponses: [
      { status: 404, description: 'Không tìm thấy hình ảnh banner2' },
      { status: 500, description: 'Lỗi server, có thể do kết nối database' },
    ],
  },
  {
    method: 'GET',
    path: '/api/interfaces/decor',
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
        paths: [
          'https://res.cloudinary.com/your_cloud_name/image/upload/decor1.jpg',
          'https://res.cloudinary.com/your_cloud_name/image/upload/decor2.jpg',
        ],
      },
    },
    errorResponses: [
      { status: 404, description: 'Không tìm thấy hình ảnh decor' },
      { status: 500, description: 'Lỗi server, có thể do kết nối database' },
    ],
  },
  {
    method: 'GET',
    path: '/api/interfaces/banner3',
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
        paths: ['https://res.cloudinary.com/your_cloud_name/image/upload/banner3.jpg'],
      },
    },
    errorResponses: [
      { status: 404, description: 'Không tìm thấy hình ảnh banner3' },
      { status: 500, description: 'Lỗi server, có thể do kết nối database' },
    ],
  },
  {
    method: 'GET',
    path: '/api/interfaces/bannerAbout',
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
        paths: ['https://res.cloudinary.com/your_cloud_name/image/upload/bannerAbout.jpg'],
      },
    },
    errorResponses: [
      { status: 404, description: 'Không tìm thấy hình ảnh bannerAbout' },
      { status: 500, description: 'Lỗi server, có thể do kết nối database' },
    ],
  },
  {
    method: 'GET',
    path: '/api/interfaces/bannerNews',
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
        paths: ['https://res.cloudinary.com/your_cloud_name/image/upload/bannerNews.jpg'],
      },
    },
    errorResponses: [
      { status: 404, description: 'Không tìm thấy hình ảnh bannerNews' },
      { status: 500, description: 'Lỗi server, có thể do kết nối database' },
    ],
  },
];

export default interfaceEndpoints;