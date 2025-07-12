const newsEndpoints = [
  {
    method: 'GET',
    path: '/api/news',
    description: 'Lấy danh sách tất cả tin tức',
    fullDescription: 'Trả về danh sách tất cả tin tức, sắp xếp theo ngày xuất bản giảm dần (`publishedAt`). Không yêu cầu xác thực, có thể truy cập công khai.',
    auth: {
      required: false,
      description: 'Không yêu cầu token. Endpoint này có thể truy cập công khai.'
    },
    parameters: [],
    response: {
      status: 200,
      description: 'Danh sách tin tức',
      example: [
        {
          _id: '60d5f8e9b1a2b4f8e8f9e2c6',
          title: 'Tin tức mới nhất về Pure-Botanica',
          slug: 'tin-tuc-moi-nhat-ve-pure-botanica',
          thumbnailUrl: '/images/thumbnail1.jpg',
          thumbnailCaption: 'Hình ảnh tin tức',
          publishedAt: '2025-07-09T00:00:00Z',
          views: 100,
          status: 'show',
          content: '<p>Nội dung chi tiết về tin tức...</p><img src="/images/123e4567-e89b-12d3-a456-426614174000.jpg" alt="skincare">',
          createdAt: '2025-07-09T00:00:00Z',
          updatedAt: '2025-07-09T00:00:00Z'
        }
      ]
    },
    errorResponses: [
      { status: 404, description: 'Không tìm thấy tin tức nào' },
      { status: 500, description: 'Lỗi máy chủ' }
    ]
  },
  {
    method: 'GET',
    path: '/api/news/:identifier',
    description: 'Lấy chi tiết tin tức',
    fullDescription: 'Lấy chi tiết một tin tức dựa trên ID hoặc slug. Nếu không có header Authorization (người dùng thường), lượt xem (`views`) sẽ tăng lên. Admin truy cập không tăng lượt xem. Không yêu cầu xác thực cho người dùng thường.',
    auth: {
      required: false,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT tùy chọn. Nếu có token admin, lượt xem không tăng. Nếu không có token, lượt xem tăng lên.'
    },
    parameters: [
      { name: 'identifier', type: 'string', description: 'ObjectId hoặc slug của tin tức', required: true }
    ],
    response: {
      status: 200,
      description: 'Chi tiết tin tức',
      example: {
        _id: '60d5f8e9b1a2b4f8e8f9e2c6',
        title: 'Tin tức mới nhất về Pure-Botanica',
        slug: 'tin-tuc-moi-nhat-ve-pure-botanica',
        thumbnailUrl: '/images/thumbnail1.jpg',
        thumbnailCaption: 'Hình ảnh tin tức',
        publishedAt: '2025-07-09T00:00:00Z',
        views: 101,
        status: 'show',
        content: '<p>Nội dung chi tiết về tin tức...</p><img src="/images/123e4567-e89b-12d3-a456-426614174000.jpg" alt="skincare">',
        createdAt: '2025-07-09T00:00:00Z',
        updatedAt: '2025-07-09T00:00:00Z'
      }
    },
    errorResponses: [
      { status: 404, description: 'Không tìm thấy tin tức' },
      { status: 500, description: 'Lỗi máy chủ' }
    ]
  },
  {
    method: 'GET',
    path: '/api/news/hottest',
    description: 'Lấy danh sách tin tức hot',
    fullDescription: 'Trả về danh sách tin tức có trạng thái `show`, sắp xếp theo lượt xem (`views`) giảm dần. Hỗ trợ query `limit` để giới hạn số lượng tin tức. Không yêu cầu xác thực, có thể truy cập công khai.',
    auth: {
      required: false,
      description: 'Không yêu cầu token. Endpoint này có thể truy cập công khai.'
    },
    parameters: [
      { name: 'limit', type: 'number', description: 'Số lượng tin tức tối đa trả về (mặc định: tất cả)', required: false }
    ],
    response: {
      status: 200,
      description: 'Danh sách tin tức hot',
      example: {
        message: 'Lấy danh sách bài đăng hot thành công',
        news: [
          {
            _id: '60d5f8e9b1a2b4f8e8f9e2c6',
            title: 'Tin tức mới nhất về Pure-Botanica',
            slug: 'tin-tuc-moi-nhat-ve-pure-botanica',
            thumbnailUrl: '/images/thumbnail1.jpg',
            thumbnailCaption: 'Hình ảnh tin tức',
            publishedAt: '2025-07-09T00:00:00Z',
            views: 100,
            status: 'show',
            content: '<p>Nội dung chi tiết về tin tức...</p><img src="/images/123e4567-e89b-12d3-a456-426614174000.jpg" alt="skincare">',
            createdAt: '2025-07-09T00:00:00Z',
            updatedAt: '2025-07-09T00:00:00Z'
          }
        ]
      }
    },
    errorResponses: [
      { status: 404, description: 'Không tìm thấy bài đăng nào' },
      { status: 500, description: 'Lỗi máy chủ' }
    ]
  },
  {
    method: 'POST',
    path: '/api/news',
    description: 'Tạo tin tức mới',
    fullDescription: 'Tạo một tin tức mới với tiêu đề, nội dung (HTML có thể chứa hình ảnh Data URL), và thumbnail bắt buộc. Hình ảnh Data URL trong `content` (ví dụ: `<img src="data:image/jpeg;base64,...">`) sẽ được lưu vào `public/images` và cập nhật `src` thành `/images/filename`. Slug được tự động tạo nếu không cung cấp. Yêu cầu quyền admin thông qua token JWT.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của admin được yêu cầu trong header.'
    },
    parameters: [
      { name: 'title', type: 'string', description: 'Tiêu đề tin tức', required: true },
      { name: 'content', type: 'string', description: 'Nội dung tin tức (HTML, hỗ trợ `<img>` với Data URLs `data:image/jpeg;base64,...` hoặc `data:image/png;base64,...`)', required: true },
      { name: 'thumbnail', type: 'file', description: 'File hình ảnh thumbnail (jpg, png, gif, webp)', required: true },
      { name: 'slug', type: 'string', description: 'Slug của tin tức (tùy chọn, tự động tạo nếu không cung cấp)', required: false },
      { name: 'thumbnailCaption', type: 'string', description: 'Chú thích cho thumbnail (tùy chọn)', required: false },
      { name: 'publishedAt', type: 'string', description: 'Ngày xuất bản (định dạng ISO, mặc định: hiện tại)', required: false },
      { name: 'views', type: 'number', description: 'Số lượt xem ban đầu (mặc định: 0)', required: false },
      { name: 'status', type: 'string', description: 'Trạng thái tin tức (`show` hoặc `hidden`, mặc định: `show`)', required: false }
    ],
    requestExample: {
      headers: { 'Authorization': 'Bearer <token>' },
      body: {
        title: 'Tin tức mới nhất về Pure-Botanica',
        content: '<p>Nội dung chi tiết về tin tức...</p><img src="data:image/jpeg;base64,/9j/4AAQSkZ..." alt="skincare">',
        slug: 'tin-tuc-moi-nhat',
        thumbnailCaption: 'Hình ảnh tin tức',
        publishedAt: '2025-07-09T00:00:00Z',
        views: 0,
        status: 'show'
      },
      files: {
        thumbnail: 'thumbnail1.jpg'
      }
    },
    response: {
      status: 201,
      description: 'Tạo tin tức thành công',
      example: {
        message: 'Tạo tin tức thành công',
        news: {
          _id: '60d5f8e9b1a2b4f8e8f9e2c6',
          title: 'Tin tức mới nhất về Pure-Botanica',
          slug: 'tin-tuc-moi-nhat',
          thumbnailUrl: '/images/thumbnail1.jpg',
          thumbnailCaption: 'Hình ảnh tin tức',
          publishedAt: '2025-07-09T00:00:00Z',
          views: 0,
          status: 'show',
          content: '<p>Nội dung chi tiết về tin tức...</p><img src="/images/123e4567-e89b-12d3-a456-426614174000.jpg" alt="skincare">',
          createdAt: '2025-07-09T00:00:00Z',
          updatedAt: '2025-07-09T00:00:00Z'
        }
      }
    },
    errorResponses: [
      { status: 400, description: 'Thiếu các trường bắt buộc: title, content, hoặc thumbnail' },
      { status: 400, description: 'Slug đã tồn tại' },
      { status: 400, description: 'Nội dung HTML không hợp lệ' },
      { status: 400, description: 'Data URL không hợp lệ hoặc loại hình ảnh không được hỗ trợ (chỉ hỗ trợ jpeg, png, gif, webp)' },
      { status: 400, description: 'Kích thước hình ảnh Data URL vượt quá 20MB' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Không có quyền admin' },
      { status: 500, description: 'Lỗi máy chủ' }
    ]
  },
  {
    method: 'PUT',
    path: '/api/news/:identifier',
    description: 'Cập nhật tin tức',
    fullDescription: 'Cập nhật thông tin tin tức dựa trên ID hoặc slug. Hỗ trợ cập nhật thumbnail và nội dung (HTML có thể chứa hình ảnh Data URL). Hình ảnh Data URL trong `content` sẽ được lưu vào `public/images` và cập nhật `src` thành `/images/filename`. Thumbnail cũ sẽ được xóa nếu gửi thumbnail mới. Slug được tự động tạo nếu cung cấp giá trị mới. Yêu cầu quyền admin thông qua token JWT.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của admin được yêu cầu trong header.'
    },
    parameters: [
      { name: 'identifier', type: 'string', description: 'ObjectId hoặc slug của tin tức', required: true },
      { name: 'title', type: 'string', description: 'Tiêu đề tin tức mới', required: false },
      { name: 'content', type: 'string', description: 'Nội dung tin tức mới (HTML, hỗ trợ `<img>` với Data URLs `data:image/jpeg;base64,...` hoặc `data:image/png;base64,...`)', required: false },
      { name: 'thumbnail', type: 'file', description: 'File hình ảnh thumbnail mới (jpg, png, gif, webp)', required: false },
      { name: 'slug', type: 'string', description: 'Slug mới (tùy chọn, tự động tạo nếu cung cấp)', required: false },
      { name: 'thumbnailCaption', type: 'string', description: 'Chú thích mới cho thumbnail', required: false },
      { name: 'publishedAt', type: 'string', description: 'Ngày xuất bản mới (định dạng ISO)', required: false },
      { name: 'views', type: 'number', description: 'Số lượt xem mới', required: false },
      { name: 'status', type: 'string', description: 'Trạng thái mới (`show` hoặc `hidden`)', required: false }
    ],
    requestExample: {
      headers: { 'Authorization': 'Bearer <token>' },
      body: {
        title: 'Tin tức cập nhật về Pure-Botanica',
        content: '<p>Nội dung cập nhật...</p><img src="data:image/jpeg;base64,/9j/4AAQSkZ..." alt="skincare">',
        slug: 'tin-tuc-cap-nhat',
        thumbnailCaption: 'Hình ảnh mới',
        status: 'hidden'
      },
      files: {
        thumbnail: 'thumbnail2.jpg'
      }
    },
    response: {
      status: 200,
      description: 'Cập nhật tin tức thành công',
      example: {
        message: 'Cập nhật tin tức thành công',
        news: {
          _id: '60d5f8e9b1a2b4f8e8f9e2c6',
          title: 'Tin tức cập nhật về Pure-Botanica',
          slug: 'tin-tuc-cap-nhat',
          thumbnailUrl: '/images/thumbnail2.jpg',
          thumbnailCaption: 'Hình ảnh mới',
          publishedAt: '2025-07-09T00:00:00Z',
          views: 100,
          status: 'hidden',
          content: '<p>Nội dung cập nhật...</p><img src="/images/123e4567-e89b-12d3-a456-426614174001.jpg" alt="skincare">',
          createdAt: '2025-07-09T00:00:00Z',
          updatedAt: '2025-07-09T01:00:00Z'
        }
      }
    },
    errorResponses: [
      { status: 400, description: 'Slug đã tồn tại' },
      { status: 400, description: 'Nội dung HTML không hợp lệ' },
      { status: 400, description: 'Data URL không hợp lệ hoặc loại hình ảnh không được hỗ trợ (chỉ hỗ trợ jpeg, png, gif, webp)' },
      { status: 400, description: 'Kích thước hình ảnh Data URL vượt quá 20MB' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Không có quyền admin' },
      { status: 404, description: 'Không tìm thấy tin tức để cập nhật' },
      { status: 500, description: 'Lỗi máy chủ' }
    ]
  },
  {
    method: 'DELETE',
    path: '/api/news/:identifier',
    description: 'Xóa tin tức',
    fullDescription: 'Xóa một tin tức dựa trên ID hoặc slug, đồng thời xóa thumbnail và các hình ảnh trong content (nếu có `src` bắt đầu bằng `/images/`). Yêu cầu quyền admin thông qua token JWT.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của admin được yêu cầu trong header.'
    },
    parameters: [
      { name: 'identifier', type: 'string', description: 'ObjectId hoặc slug của tin tức', required: true }
    ],
    response: {
      status: 200,
      description: 'Xóa tin tức thành công',
      example: {
        message: 'Xóa tin tức thành công'
      }
    },
    errorResponses: [
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Không có quyền admin' },
      { status: 404, description: 'Không tìm thấy tin tức để xóa' },
      { status: 500, description: 'Lỗi máy chủ' }
    ]
  },
  {
    method: 'PUT',
    path: '/api/news/:identifier/toggle-visibility',
    description: 'Chuyển đổi trạng thái hiển thị tin tức',
    fullDescription: 'Chuyển đổi trạng thái của tin tức giữa `show` và `hidden` dựa trên ID hoặc slug. Yêu cầu quyền admin thông qua token JWT.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của admin được yêu cầu trong header.'
    },
    parameters: [
      { name: 'identifier', type: 'string', description: 'ObjectId hoặc slug của tin tức', required: true }
    ],
    response: {
      status: 200,
      description: 'Chuyển đổi trạng thái hiển thị thành công',
      example: {
        message: 'Tin tức đã được ẩn',
        news: {
          _id: '60d5f8e9b1a2b4f8e8f9e2c6',
          title: 'Tin tức mới nhất về Pure-Botanica',
          slug: 'tin-tuc-moi-nhat',
          thumbnailUrl: '/images/thumbnail1.jpg',
          thumbnailCaption: 'Hình ảnh tin tức',
          publishedAt: '2025-07-09T00:00:00Z',
          views: 100,
          status: 'hidden',
          content: '<p>Nội dung chi tiết về tin tức...</p><img src="/images/123e4567-e89b-12d3-a456-426614174000.jpg" alt="skincare">',
          createdAt: '2025-07-09T00:00:00Z',
          updatedAt: '2025-07-09T01:00:00Z'
        }
      }
    },
    errorResponses: [
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Không có quyền admin' },
      { status: 404, description: 'Không tìm thấy tin tức' },
      { status: 500, description: 'Lỗi máy chủ' }
    ]
  }
];

export default newsEndpoints;