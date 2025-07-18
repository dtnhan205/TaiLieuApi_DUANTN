const brandEndpoints = [
  {
    method: 'GET',
    path: '/api/brands',
    description: 'Lấy danh sách thương hiệu',
    fullDescription:
      'Trả về danh sách tất cả các thương hiệu, bao gồm cả trạng thái `show` và `hidden`. Không yêu cầu xác thực, có thể truy cập công khai.',
    auth: {
      required: false,
      description: 'Không yêu cầu token. Endpoint này có thể truy cập công khai.',
    },
    parameters: [],
    response: {
      status: 200,
      description: 'Danh sách thương hiệu',
      example: [
        {
          _id: '60d5f8e9b1a2b4f8e8f9e2b7',
          name: 'Thương hiệu A',
          status: 'show',
          logoImg: 'images/brandA-logo.png',
          createdAt: '2025-07-17T11:47:00.000Z',
        },
        {
          _id: '60d5f8e9b1a2b4f8e8f9e2b8',
          name: 'Thương hiệu B',
          status: 'hidden',
          logoImg: 'images/brandB-logo.png',
          createdAt: '2025-07-17T11:47:00.000Z',
        },
      ],
    },
    errorResponses: [
      { status: 404, description: 'Không tìm thấy thương hiệu nào' },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database' },
    ],
  },
  {
    method: 'GET',
    path: '/api/brands/:id',
    description: 'Lấy chi tiết thương hiệu',
    fullDescription:
      'Trả về thông tin chi tiết của một thương hiệu dựa trên ID. Không yêu cầu xác thực, có thể truy cập công khai.',
    auth: {
      required: false,
      description: 'Không yêu cầu token. Endpoint này có thể truy cập công khai.',
    },
    parameters: [
      {
        name: 'id',
        type: 'string',
        description: 'ObjectId của thương hiệu',
        required: true,
        in: 'path',
      },
    ],
    response: {
      status: 200,
      description: 'Chi tiết thương hiệu',
      example: {
        _id: '60d5f8e9b1a2b4f8e8f9e2b7',
        name: 'Thương hiệu A',
        status: 'show',
        logoImg: 'images/brandA-logo.png',
        createdAt: '2025-07-17T11:47:00.000Z',
      },
    },
    errorResponses: [
      { status: 400, description: 'ID thương hiệu không hợp lệ' },
      { status: 404, description: 'Không tìm thấy thương hiệu' },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database' },
    ],
  },
  {
    method: 'POST',
    path: '/api/brands',
    description: 'Tạo thương hiệu mới',
    fullDescription:
      'Tạo một thương hiệu mới với tên, trạng thái tùy chọn (mặc định là `show`), và hình ảnh logo (bắt buộc). Nếu trạng thái là `hidden`, các sản phẩm liên quan sẽ được đặt `active: false`, với cảnh báo nếu có sản phẩm còn tồn kho. Yêu cầu quyền admin thông qua token JWT. Dữ liệu được gửi dưới dạng `multipart/form-data`.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description:
        'Token JWT của admin được yêu cầu trong header. Token được cấp sau khi đăng nhập qua endpoint `/api/users/login`.',
    },
    parameters: [
      {
        name: 'name',
        type: 'string',
        description: 'Tên thương hiệu, phải duy nhất',
        required: true,
        in: 'formData',
      },
      {
        name: 'status',
        type: 'string',
        description: 'Trạng thái của thương hiệu (`show` hoặc `hidden`, mặc định là `show`)',
        required: false,
        in: 'formData',
      },
      {
        name: 'logoImg',
        type: 'file',
        description: 'Hình ảnh logo (jpg, jpeg, png, gif, webp, svg; tối đa 20MB)',
        required: true,
        in: 'formData',
      },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer <token>', 'Content-Type': 'multipart/form-data' },
      body: {
        name: 'Thương hiệu mới',
        status: 'show',
      },
      files: ['newbrand-logo.png'],
    },
    response: {
      status: 201,
      description: 'Tạo thương hiệu thành công',
      example: {
        message: 'Tạo thương hiệu thành công',
        brand: {
          _id: '60d5f8e9b1a2b4f8e8f9e2b9',
          name: 'Thương hiệu mới',
          status: 'show',
          logoImg: 'images/newbrand-logo.png',
          createdAt: '2025-07-17T11:47:00.000Z',
        },
        warning: 'Cảnh báo: Thương hiệu được ẩn mặc dù vẫn còn sản phẩm có tồn kho!' // Chỉ xuất hiện nếu status là hidden và có sản phẩm còn tồn kho
      },
    },
    errorResponses: [
      { status: 400, description: 'Tên thương hiệu đã tồn tại hoặc dữ liệu không hợp lệ' },
      { status: 400, description: 'Vui lòng upload hình ảnh logo' },
      { status: 400, description: 'Chỉ hỗ trợ file ảnh (jpg, jpeg, png, gif, webp, svg)' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Không có quyền admin' },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database hoặc xử lý file' },
    ],
  },
  {
    method: 'PUT',
    path: '/api/brands/:id',
    description: 'Cập nhật thương hiệu',
    fullDescription:
      'Cập nhật thông tin thương hiệu (tên, trạng thái, hoặc hình ảnh logo) dựa trên ID. Hình ảnh logo là tùy chọn. Nếu trạng thái được cập nhật thành `hidden`, các sản phẩm liên quan sẽ được đặt `active: false`, với cảnh báo nếu có sản phẩm còn tồn kho. Nếu trạng thái là `show`, sản phẩm chỉ được đặt `active: true` nếu danh mục tương ứng có trạng thái `show`; nếu không, sản phẩm được đặt `active: false`. Yêu cầu quyền admin thông qua token JWT. Dữ liệu được gửi dưới dạng `multipart/form-data`.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description:
        'Token JWT của admin được yêu cầu trong header. Token được cấp sau khi đăng nhập qua endpoint `/api/users/login`.',
    },
    parameters: [
      {
        name: 'id',
        type: 'string',
        description: 'ObjectId của thương hiệu',
        required: true,
        in: 'path',
      },
      {
        name: 'name',
        type: 'string',
        description: 'Tên thương hiệu mới, phải duy nhất',
        required: false,
        in: 'formData',
      },
      {
        name: 'status',
        type: 'string',
        description: 'Trạng thái mới của thương hiệu (`show` hoặc `hidden`)',
        required: false,
        in: 'formData',
      },
      {
        name: 'logoImg',
        type: 'file',
        description: 'Hình ảnh logo mới (jpg, jpeg, png, gif, webp, svg; tối đa 20MB)',
        required: false,
        in: 'formData',
      },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer <token>', 'Content-Type': 'multipart/form-data' },
      body: {
        name: 'Thương hiệu cập nhật',
        status: 'hidden',
      },
      files: ['updated-logo.png'],
    },
    response: {
      status: 200,
      description: 'Cập nhật thương hiệu thành công',
      example: {
        message: 'Cập nhật thương hiệu thành công',
        brand: {
          _id: '60d5f8e9b1a2b4f8e8f9e2b7',
          name: 'Thương hiệu cập nhật',
          status: 'hidden',
          logoImg: 'images/updated-logo.png',
          createdAt: '2025-07-17T11:47:00.000Z',
        },
        warning: 'Cảnh báo: Thương hiệu được ẩn mặc dù vẫn còn sản phẩm có tồn kho!' // Chỉ xuất hiện nếu status là hidden và có sản phẩm còn tồn kho
      },
    },
    errorResponses: [
      { status: 400, description: 'Tên thương hiệu đã tồn tại hoặc dữ liệu không hợp lệ' },
      { status: 400, description: 'ID thương hiệu không hợp lệ' },
      { status: 400, description: 'Chỉ hỗ trợ file ảnh (jpg, jpeg, png, gif, webp, svg)' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Không có quyền admin' },
      { status: 404, description: 'Không tìm thấy thương hiệu để cập nhật' },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database hoặc xử lý file' },
    ],
  },
  {
    method: 'DELETE',
    path: '/api/brands/:id',
    description: 'Xóa thương hiệu',
    fullDescription:
      'Xóa một thương hiệu dựa trên ID. Các sản phẩm liên quan sẽ được đặt `active: false`. Yêu cầu quyền admin thông qua token JWT.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description:
        'Token JWT của admin được yêu cầu trong header. Token được cấp sau khi đăng nhập qua endpoint `/api/users/login`.',
    },
    parameters: [
      {
        name: 'id',
        type: 'string',
        description: 'ObjectId của thương hiệu',
        required: true,
        in: 'path',
      },
    ],
    response: {
      status: 200,
      description: 'Xóa thương hiệu thành công',
      example: {
        message: 'Xóa thương hiệu thành công',
      },
    },
    errorResponses: [
      { status: 400, description: 'ID thương hiệu không hợp lệ' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Không có quyền admin' },
      { status: 404, description: 'Không tìm thấy thương hiệu để xóa' },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database' },
    ],
  },
  {
    method: 'PUT',
    path: '/api/brands/:id/toggle-visibility',
    description: 'Chuyển đổi hiển thị thương hiệu',
    fullDescription:
      'Chuyển đổi trạng thái hiển thị của thương hiệu giữa `show` và `hidden`. Khi chuyển sang `hidden`, kiểm tra sản phẩm liên quan có tồn kho và bao gồm cảnh báo nếu có; các sản phẩm liên quan được đặt `active: false`. Khi chuyển sang `show`, sản phẩm chỉ được đặt `active: true` nếu danh mục tương ứng có trạng thái `show`; nếu không, sản phẩm được đặt `active: false`. Yêu cầu quyền admin thông qua token JWT.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description:
        'Token JWT của admin được yêu cầu trong header. Token được cấp sau khi đăng nhập qua endpoint `/api/users/login`.',
    },
    parameters: [
      {
        name: 'id',
        type: 'string',
        description: 'ObjectId của thương hiệu',
        required: true,
        in: 'path',
      },
      {
        name: 'status',
        type: 'string',
        description: 'Trạng thái mới của thương hiệu (`show` hoặc `hidden`)',
        required: true,
        in: 'body',
      },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer <token>' },
      body: {
        status: 'hidden',
      },
    },
    response: {
      status: 200,
      description: 'Chuyển đổi trạng thái hiển thị thành công',
      example: {
        message: 'Thương hiệu đã được ẩn',
        brand: {
          _id: '60d5f8e9b1a2b4f8e8f9e2b7',
          name: 'Thương hiệu A',
          status: 'hidden',
          logoImg: 'images/brandA-logo.png',
          createdAt: '2025-07-17T11:47:00.000Z',
        },
        warning: 'Cảnh báo: Thương hiệu được ẩn mặc dù vẫn còn sản phẩm có tồn kho!',
      },
    },
    errorResponses: [
      { status: 400, description: 'ID thương hiệu không hợp lệ' },
      { status: 400, description: 'Trạng thái không hợp lệ, phải là "show" hoặc "hidden"' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Không có quyền admin' },
      { status: 404, description: 'Không tìm thấy thương hiệu' },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database' },
    ],
  },
];

export default brandEndpoints;