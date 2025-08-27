const chatEndpoints = [
  {
    method: 'POST',
    path: '/api/chat/session',
    description: 'Tạo hoặc lấy phiên chat',
    fullDescription:
      'Tạo một phiên chat mới với sessionId duy nhất (nếu không cung cấp, hệ thống tạo bằng UUID v4) hoặc lấy phiên chat hiện có dựa trên sessionId. Nếu phiên mới, lưu tin nhắn chào mặc định từ bot. Không yêu cầu xác thực, endpoint công khai. Dữ liệu gửi qua `application/json`.',
    auth: {
      required: false,
      description: 'Không yêu cầu token. Endpoint này công khai.',
    },
    parameters: [
      {
        name: 'sessionId',
        type: 'string',
        description: 'ID của phiên chat (tùy chọn, nếu không cung cấp, hệ thống tạo mới bằng UUID v4)',
        required: false,
        in: 'body',
      },
    ],
    requestExample: {
      headers: { 'Content-Type': 'application/json' },
      body: {
        sessionId: 'abc123',
      },
    },
    response: {
      status: 200,
      description: 'Tạo hoặc lấy phiên chat thành công',
      example: {
        sessionId: 'abc123',
      },
    },
    errorResponses: [
      {
        status: 500,
        description: 'Lỗi máy chủ, có thể do kết nối database',
        example: { error: 'Lỗi server' },
      },
    ],
  },
  {
    method: 'GET',
    path: '/api/chat/history/:sessionId',
    description: 'Lấy lịch sử chat của phiên',
    fullDescription:
      'Trả về danh sách tin nhắn của một phiên chat dựa trên sessionId. Mỗi tin nhắn bao gồm vai trò (user/model), nội dung, thời gian, và dữ liệu bổ sung (hình ảnh, sản phẩm, mã giảm giá, tin tức, thương hiệu, danh mục). Không yêu cầu xác thực, endpoint công khai.',
    auth: {
      required: false,
      description: 'Không yêu cầu token. Endpoint này công khai.',
    },
    parameters: [
      {
        name: 'sessionId',
        type: 'string',
        description: 'ID của phiên chat',
        required: true,
        in: 'path',
      },
    ],
    requestExample: {
      params: { sessionId: 'abc123' },
    },
    response: {
      status: 200,
      description: 'Lấy lịch sử chat thành công',
      example: {
        messages: [
          {
            role: 'model',
            content: 'Pure Botanica xin chào! Tôi có thể giúp gì cho bạn?',
            timestamp: '2025-08-28T05:45:00Z',
            products: [],
            coupons: [],
            news: [],
            brands: [],
            categories: [],
          },
        ],
      },
    },
    errorResponses: [
      {
        status: 400,
        description: 'Thiếu sessionId',
        example: { error: 'Session ID là bắt buộc' },
      },
      {
        status: 404,
        description: 'Phiên chat không tồn tại',
        example: { error: 'Session không tồn tại' },
      },
      {
        status: 500,
        description: 'Lỗi máy chủ, có thể do kết nối database',
        example: { error: 'Lỗi server' },
      },
    ],
  },
  {
    method: 'DELETE',
    path: '/api/chat/session/:sessionId',
    description: 'Xóa phiên chat',
    fullDescription:
      'Xóa một phiên chat và toàn bộ lịch sử tin nhắn dựa trên sessionId. Yêu cầu quyền admin thông qua token JWT. Sử dụng giao dịch MongoDB để đảm bảo tính toàn vẹn dữ liệu.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của admin được yêu cầu trong header, lấy từ endpoint `/api/users/login`.',
    },
    parameters: [
      {
        name: 'sessionId',
        type: 'string',
        description: 'ID của phiên chat',
        required: true,
        in: 'path',
      },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer <token>' },
      params: { sessionId: 'abc123' },
    },
    response: {
      status: 200,
      description: 'Xóa phiên chat thành công',
      example: {
        message: 'Xóa session thành công',
      },
    },
    errorResponses: [
      {
        status: 400,
        description: 'Thiếu sessionId',
        example: { error: 'Session ID là bắt buộc' },
      },
      {
        status: 401,
        description: 'Không có token hoặc token không hợp lệ',
        example: { error: 'Token không hợp lệ' },
      },
      {
        status: 403,
        description: 'Không có quyền admin',
        example: { error: 'Bạn không có quyền truy cập' },
      },
      {
        status: 500,
        description: 'Lỗi máy chủ, có thể do kết nối database',
        example: { error: 'Lỗi server' },
      },
    ],
  },
  {
    method: 'POST',
    path: '/api/chat/analyze-skin',
    description: 'Phân tích da và gợi ý sản phẩm',
    fullDescription:
      'Phân tích tình trạng da dựa trên hình ảnh (JPG/PNG, tối đa 10MB) hoặc tin nhắn văn bản. Trả lời bằng cách gợi ý sản phẩm, mã giảm giá, tin tức, thương hiệu, hoặc danh mục dựa trên FAQ hoặc Gemini API. Lưu tin nhắn vào phiên chat (tối đa 200 tin nhắn). Không yêu cầu xác thực, endpoint công khai. Dữ liệu gửi qua `multipart/form-data` nếu có hình ảnh, hoặc `application/json` nếu chỉ có tin nhắn.',
    auth: {
      required: false,
      description: 'Không yêu cầu token. Endpoint này công khai.',
    },
    parameters: [
      {
        name: 'sessionId',
        type: 'string',
        description: 'ID của phiên chat (bắt buộc để lưu tin nhắn)',
        required: true,
        in: 'formData',
      },
      {
        name: 'image',
        type: 'file',
        description: 'Hình ảnh da để phân tích (JPG/PNG, tối đa 10MB, tùy chọn)',
        required: false,
        in: 'formData',
      },
      {
        name: 'message',
        type: 'string',
        description: 'Tin nhắn mô tả tình trạng da hoặc câu hỏi (tối đa 5000 ký tự, tùy chọn)',
        required: false,
        in: 'formData',
      },
    ],
    requestExample: {
      headers: { 'Content-Type': 'multipart/form-data' },
      body: {
        sessionId: 'abc123',
        image: '<file: skin.jpg>',
        message: 'Da tôi bị nám, gợi ý sản phẩm phù hợp.',
      },
    },
    response: {
      status: 200,
      description: 'Phân tích da và gợi ý thành công',
      example: {
        message: 'Tôi gợi ý một số sản phẩm phù hợp với tình trạng nám.',
        products: [
          {
            name: 'Serum Sáng Da Mờ Nám Sơ-ri Vitamin C',
            price: 250000,
            images: ['https://example.com/images/serum.jpg'],
            short_description: 'Serum giúp làm sáng da và giảm nám',
            slug: 'serum-sang-da',
          },
        ],
        coupons: [
          {
            code: 'DISCOUNT10',
            discountType: 'percentage',
            discountValue: 10,
            minOrderValue: 100000,
            expiryDate: '2025-12-31T23:59:59Z',
            description: 'Giảm 10% cho đơn hàng từ 100,000 VNĐ',
          },
        ],
        news: [],
        brands: [],
        categories: [],
      },
    },
    errorResponses: [
      {
        status: 400,
        description: 'Thiếu sessionId',
        example: { error: 'Session ID là bắt buộc' },
      },
      {
        status: 400,
        description: 'Phải cung cấp ít nhất hình ảnh hoặc tin nhắn',
        example: { error: 'Phải cung cấp ít nhất hình ảnh hoặc tin nhắn' },
      },
      {
        status: 400,
        description: 'Tin nhắn vượt quá 5000 ký tự',
        example: { error: 'Tin nhắn không được vượt quá 5000 ký tự' },
      },
      {
        status: 400,
        description: 'File không phải JPG hoặc PNG',
        example: { error: 'Chỉ chấp nhận file JPG hoặc PNG!' },
      },
      {
        status: 413,
        description: 'Hình ảnh quá lớn (tối đa 10MB)',
        example: { error: 'Hình ảnh quá lớn, tối đa 10MB' },
      },
      {
        status: 500,
        description: 'Lỗi máy chủ, có thể do kết nối database hoặc Gemini API',
        example: { error: 'Lỗi server', details: 'Database connection failed' },
      },
    ],
  },
];

export default chatEndpoints;