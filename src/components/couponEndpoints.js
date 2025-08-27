const couponEndpoints = [
  {
    method: 'POST',
    path: '/api/coupons',
    description: 'Tạo mã giảm giá mới',
    fullDescription:
      'Tạo một mã giảm giá mới với các thông tin như mã, loại giảm giá, giá trị giảm, và các tùy chọn khác. Mã phải duy nhất, loại giảm giá chỉ được là `percentage` hoặc `fixed`, và giá trị giảm phải không âm. Sử dụng giao dịch MongoDB để đảm bảo tính toàn vẹn dữ liệu. Yêu cầu quyền admin thông qua token JWT. Dữ liệu gửi qua `application/json`.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của admin được yêu cầu trong header, lấy từ endpoint `/api/users/login`.',
    },
    parameters: [
      { name: 'code', type: 'string', description: 'Mã giảm giá, độ dài từ 3 đến 20 ký tự, phải duy nhất', required: true, in: 'body' },
      { name: 'discountType', type: 'string', description: 'Loại giảm giá (`percentage` hoặc `fixed`)', required: true, in: 'body' },
      { name: 'discountValue', type: 'number', description: 'Giá trị giảm giá (phần trăm hoặc số tiền cố định, phải không âm)', required: true, in: 'body' },
      { name: 'minOrderValue', type: 'number', description: 'Giá trị đơn hàng tối thiểu để áp dụng mã (mặc định: 0)', required: false, in: 'body' },
      { name: 'expiryDate', type: 'string', description: 'Ngày hết hạn của mã (định dạng ISO, ví dụ: `2025-12-31T23:59:59Z`, null nếu không có hạn)', required: false, in: 'body' },
      { name: 'usageLimit', type: 'number', description: 'Số lần sử dụng tối đa của mã (null nếu không giới hạn, tối thiểu 1)', required: false, in: 'body' },
      { name: 'isActive', type: 'boolean', description: 'Trạng thái kích hoạt của mã (mặc định: true)', required: false, in: 'body' },
      { name: 'description', type: 'string', description: 'Mô tả mã giảm giá (tối đa 200 ký tự, mặc định: rỗng)', required: false, in: 'body' },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer <token>', 'Content-Type': 'application/json' },
      body: {
        code: 'DISCOUNT10',
        discountType: 'percentage',
        discountValue: 10,
        minOrderValue: 100000,
        expiryDate: '2025-12-31T23:59:59Z',
        usageLimit: 100,
        isActive: true,
        description: 'Giảm giá 10% cho đơn hàng từ 100,000 VNĐ',
      },
    },
    response: {
      status: 201,
      description: 'Tạo mã giảm giá thành công',
      example: {
        message: 'Tạo mã giảm giá thành công',
        coupon: {
          _id: '60d5f8e9b1a2b4f8e8f9e2c5',
          code: 'DISCOUNT10',
          discountType: 'percentage',
          discountValue: 10,
          minOrderValue: 100000,
          expiryDate: '2025-12-31T23:59:59Z',
          usageLimit: 100,
          usedCount: 0,
          isActive: true,
          description: 'Giảm giá 10% cho đơn hàng từ 100,000 VNĐ',
          createdAt: '2025-08-28T05:41:00Z',
          updatedAt: '2025-08-28T05:41:00Z',
        },
      },
    },
    errorResponses: [
      { status: 400, description: 'Thiếu thông tin bắt buộc: code, discountType, hoặc discountValue', example: { error: 'code is required, discountType is required, discountValue is required' } },
      { status: 400, description: 'Mã giảm giá đã tồn tại', example: { error: 'Mã giảm giá đã tồn tại' } },
      { status: 400, description: 'Loại giảm giá không hợp lệ, chỉ được là `percentage` hoặc `fixed`', example: { error: '"discountType" must be one of [percentage, fixed]' } },
      { status: 400, description: 'Giá trị giảm giá phải không âm', example: { error: '"discountValue" must be greater than or equal to 0' } },
      { status: 400, description: 'Mã giảm giá phải từ 3 đến 20 ký tự', example: { error: '"code" length must be at least 3 characters long' } },
      { status: 401, description: 'Không có token hoặc token không hợp lệ', example: { error: 'Token không hợp lệ' } },
      { status: 403, description: 'Không có quyền admin', example: { error: 'Bạn không có quyền truy cập' } },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database', example: { error: 'Lỗi server khi tạo mã giảm giá', details: 'Database connection failed' } },
    ],
  },
  {
    method: 'POST',
    path: '/api/coupons/bulk',
    description: 'Tạo mã giảm giá hàng loạt',
    fullDescription:
      'Tạo nhiều mã giảm giá với các mã ngẫu nhiên duy nhất. Mỗi mã sẽ có cùng `discountType`, `discountValue`, `minOrderValue`, `usageLimit`, và `description`, với `expiryDate` được tính dựa trên số ngày hết hạn (`expiryDays`). Sử dụng giao dịch MongoDB để đảm bảo tính toàn vẹn dữ liệu. Yêu cầu quyền admin thông qua token JWT. Dữ liệu gửi qua `application/json`.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của admin được yêu cầu trong header, lấy từ endpoint `/api/users/login`.',
    },
    parameters: [
      { name: 'discountType', type: 'string', description: 'Loại giảm giá (`percentage` hoặc `fixed`)', required: true, in: 'body' },
      { name: 'discountValue', type: 'number', description: 'Giá trị giảm giá (phần trăm hoặc số tiền cố định, phải không âm)', required: true, in: 'body' },
      { name: 'minOrderValue', type: 'number', description: 'Giá trị đơn hàng tối thiểu để áp dụng mã (mặc định: 0)', required: false, in: 'body' },
      { name: 'expiryDays', type: 'number', description: 'Số ngày hiệu lực của mã (tối thiểu 1)', required: true, in: 'body' },
      { name: 'usageLimit', type: 'number', description: 'Số lần sử dụng tối đa của mỗi mã (null nếu không giới hạn, tối thiểu 1)', required: false, in: 'body' },
      { name: 'count', type: 'number', description: 'Số lượng mã cần tạo (tối thiểu 1)', required: true, in: 'body' },
      { name: 'description', type: 'string', description: 'Mô tả mã giảm giá (tối đa 200 ký tự, mặc định: rỗng)', required: false, in: 'body' },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer <token>', 'Content-Type': 'application/json' },
      body: {
        discountType: 'fixed',
        discountValue: 20000,
        minOrderValue: 100000,
        expiryDays: 30,
        usageLimit: 1,
        count: 10,
        description: 'Giảm giá 20,000 VNĐ cho đơn hàng từ 100,000 VNĐ',
      },
    },
    response: {
      status: 201,
      description: 'Tạo mã giảm giá hàng loạt thành công',
      example: {
        message: 'Tạo 10 mã giảm giá thành công',
        coupons: [
          {
            _id: '60d5f8e9b1a2b4f8e8f9e2c6',
            code: 'RANDOMCODE1',
            discountType: 'fixed',
            discountValue: 20000,
            minOrderValue: 100000,
            expiryDate: '2025-09-27T05:41:00Z',
            usageLimit: 1,
            usedCount: 0,
            isActive: true,
            description: 'Giảm giá 20,000 VNĐ cho đơn hàng từ 100,000 VNĐ',
            createdAt: '2025-08-28T05:41:00Z',
            updatedAt: '2025-08-28T05:41:00Z',
          },
          // ... 9 mã khác
        ],
      },
    },
    errorResponses: [
      { status: 400, description: 'Thiếu thông tin bắt buộc: discountType, discountValue, expiryDays, hoặc count', example: { error: 'discountType is required, expiryDays is required, count is required' } },
      { status: 400, description: 'Loại giảm giá không hợp lệ, chỉ được là `percentage` hoặc `fixed`', example: { error: '"discountType" must be one of [percentage, fixed]' } },
      { status: 400, description: 'Giá trị giảm giá phải không âm', example: { error: '"discountValue" must be greater than or equal to 0' } },
      { status: 400, description: 'Không thể tạo mã giảm giá duy nhất sau số lần thử tối đa', example: { error: 'Không thể tạo mã giảm giá duy nhất sau số lần thử tối đa' } },
      { status: 401, description: 'Không có token hoặc token không hợp lệ', example: { error: 'Token không hợp lệ' } },
      { status: 403, description: 'Không có quyền admin', example: { error: 'Bạn không có quyền truy cập' } },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database', example: { error: 'Lỗi server khi tạo mã giảm giá hàng loạt', details: 'Database connection failed' } },
    ],
  },
  {
    method: 'POST',
    path: '/api/coupons/auto-setup',
    description: 'Thiết lập tự động tạo mã giảm giá',
    fullDescription:
      'Thiết lập cấu hình để tự động tạo mã giảm giá cho các ngày đặc biệt (ví dụ: ngày lễ). Nếu ngày hiện tại là ngày đặc biệt, một mã giảm giá sẽ được tạo ngay lập tức. Yêu cầu quyền admin thông qua token JWT. Dữ liệu gửi qua `application/json`.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của admin được yêu cầu trong header, lấy từ endpoint `/api/users/login`.',
    },
    parameters: [
      { name: 'discountType', type: 'string', description: 'Loại giảm giá (`percentage` hoặc `fixed`)', required: true, in: 'body' },
      { name: 'discountValue', type: 'number', description: 'Giá trị giảm giá (phần trăm hoặc số tiền cố định, phải không âm)', required: true, in: 'body' },
      { name: 'minOrderValue', type: 'number', description: 'Giá trị đơn hàng tối thiểu để áp dụng mã (mặc định: 0)', required: false, in: 'body' },
      { name: 'expiryDays', type: 'number', description: 'Số ngày hiệu lực của mã (tối thiểu 1)', required: true, in: 'body' },
      { name: 'usageLimit', type: 'number', description: 'Số lần sử dụng tối đa của mỗi mã (null nếu không giới hạn, tối thiểu 1)', required: false, in: 'body' },
      { name: 'specialDays', type: 'array', description: 'Danh sách các ngày đặc biệt (mỗi ngày có `date` định dạng YYYY-MM-DD và `description` tùy chọn)', required: true, in: 'body' },
      { name: 'specialDays[].date', type: 'string', description: 'Ngày đặc biệt (định dạng YYYY-MM-DD)', required: true, in: 'body' },
      { name: 'specialDays[].description', type: 'string', description: 'Mô tả ngày đặc biệt (tối đa 200 ký tự, mặc định: rỗng)', required: false, in: 'body' },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer <token>', 'Content-Type': 'application/json' },
      body: {
        discountType: 'percentage',
        discountValue: 15,
        minOrderValue: 0,
        expiryDays: 7,
        usageLimit: null,
        specialDays: [
          { date: '2025-09-02', description: 'Ngày Quốc Khánh' },
          { date: '2026-01-01', description: 'Năm Mới' },
        ],
      },
    },
    response: {
      status: 200,
      description: 'Thiết lập tự động tạo mã giảm giá thành công',
      example: {
        message: 'Thiết lập tự động tạo mã giảm giá thành công',
      },
    },
    errorResponses: [
      { status: 400, description: 'Thiếu thông tin bắt buộc: discountType, discountValue, expiryDays, hoặc specialDays', example: { error: 'discountType is required, specialDays is required' } },
      { status: 400, description: 'Loại giảm giá không hợp lệ, chỉ được là `percentage` hoặc `fixed`', example: { error: '"discountType" must be one of [percentage, fixed]' } },
      { status: 400, description: 'Ngày đặc biệt không đúng định dạng (YYYY-MM-DD)', example: { error: '"specialDays[0].date" must match pattern "^\\d{4}-\\d{2}-\\d{2}$"' } },
      { status: 401, description: 'Không có token hoặc token không hợp lệ', example: { error: 'Token không hợp lệ' } },
      { status: 403, description: 'Không có quyền admin', example: { error: 'Bạn không có quyền truy cập' } },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database hoặc lỗi tạo mã', example: { error: 'Lỗi server khi thiết lập tự động', details: 'Database connection failed' } },
    ],
  },
  {
    method: 'GET',
    path: '/api/coupons/auto-setup',
    description: 'Lấy cấu hình tự động tạo mã giảm giá',
    fullDescription:
      'Trả về cấu hình hiện tại của hệ thống tự động tạo mã giảm giá cho các ngày đặc biệt. Nếu chưa có cấu hình, trả về cấu hình mặc định. Yêu cầu quyền admin thông qua token JWT.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của admin được yêu cầu trong header, lấy từ endpoint `/api/users/login`.',
    },
    parameters: [],
    requestExample: {
      headers: { Authorization: 'Bearer <token>' },
    },
    response: {
      status: 200,
      description: 'Lấy cấu hình tự động thành công',
      example: {
        success: true,
        config: {
          discountType: 'percentage',
          discountValue: 15,
          minOrderValue: 0,
          expiryDays: 7,
          usageLimit: null,
          specialDays: [
            { date: '2025-09-02', description: 'Ngày Quốc Khánh' },
            { date: '2026-01-01', description: 'Năm Mới' },
          ],
        },
      },
    },
    errorResponses: [
      { status: 401, description: 'Không có token hoặc token không hợp lệ', example: { error: 'Token không hợp lệ' } },
      { status: 403, description: 'Không có quyền admin', example: { error: 'Bạn không có quyền truy cập' } },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database', example: { error: 'Lỗi server khi lấy cấu hình tự động', details: 'Internal server error' } },
    ],
  },
  {
    method: 'PUT',
    path: '/api/coupons/:id',
    description: 'Cập nhật mã giảm giá',
    fullDescription:
      'Cập nhật thông tin mã giảm giá dựa trên ID. Có thể cập nhật bất kỳ trường nào, nhưng mã mới (nếu thay đổi) phải duy nhất. Loại giảm giá chỉ được là `percentage` hoặc `fixed`, và giá trị giảm phải không âm. Sử dụng giao dịch MongoDB để đảm bảo tính toàn vẹn dữ liệu. Yêu cầu quyền admin thông qua token JWT. Dữ liệu gửi qua `application/json`.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của admin được yêu cầu trong header, lấy từ endpoint `/api/users/login`.',
    },
    parameters: [
      { name: 'id', type: 'string', description: 'ObjectId của mã giảm giá', required: true, in: 'path' },
      { name: 'code', type: 'string', description: 'Mã giảm giá mới, độ dài từ 3 đến 20 ký tự, phải duy nhất', required: false, in: 'body' },
      { name: 'discountType', type: 'string', description: 'Loại giảm giá mới (`percentage` hoặc `fixed`)', required: false, in: 'body' },
      { name: 'discountValue', type: 'number', description: 'Giá trị giảm giá mới (phải không âm)', required: false, in: 'body' },
      { name: 'minOrderValue', type: 'number', description: 'Giá trị đơn hàng tối thiểu mới (mặc định: 0)', required: false, in: 'body' },
      { name: 'expiryDate', type: 'string', description: 'Ngày hết hạn mới (định dạng ISO, null nếu không có hạn)', required: false, in: 'body' },
      { name: 'usageLimit', type: 'number', description: 'Số lần sử dụng tối đa mới (null nếu không giới hạn, tối thiểu 1)', required: false, in: 'body' },
      { name: 'isActive', type: 'boolean', description: 'Trạng thái kích hoạt mới', required: false, in: 'body' },
      { name: 'description', type: 'string', description: 'Mô tả mã giảm giá mới (tối đa 200 ký tự, mặc định: rỗng)', required: false, in: 'body' },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer <token>', 'Content-Type': 'application/json' },
      params: { id: '60d5f8e9b1a2b4f8e8f9e2c5' },
      body: {
        code: 'DISCOUNT10',
        discountType: 'fixed',
        discountValue: 20000,
        minOrderValue: 150000,
        isActive: false,
        description: 'Giảm giá 20,000 VNĐ cho đơn hàng từ 150,000 VNĐ',
      },
    },
    response: {
      status: 200,
      description: 'Cập nhật mã giảm giá thành công',
      example: {
        message: 'Cập nhật mã giảm giá thành công',
        coupon: {
          _id: '60d5f8e9b1a2b4f8e8f9e2c5',
          code: 'DISCOUNT10',
          discountType: 'fixed',
          discountValue: 20000,
          minOrderValue: 150000,
          expiryDate: '2025-12-31T23:59:59Z',
          usageLimit: 100,
          usedCount: 0,
          isActive: false,
          description: 'Giảm giá 20,000 VNĐ cho đơn hàng từ 150,000 VNĐ',
          createdAt: '2025-08-28T05:41:00Z',
          updatedAt: '2025-08-28T06:00:00Z',
        },
      },
    },
    errorResponses: [
      { status: 400, description: 'ID mã giảm giá không hợp lệ', example: { error: 'ID mã giảm giá không hợp lệ' } },
      { status: 400, description: 'Mã giảm giá mới đã tồn tại', example: { error: 'Mã giảm giá đã tồn tại' } },
      { status: 400, description: 'Loại giảm giá không hợp lệ, chỉ được là `percentage` hoặc `fixed`', example: { error: '"discountType" must be one of [percentage, fixed]' } },
      { status: 400, description: 'Giá trị giảm giá phải không âm', example: { error: '"discountValue" must be greater than or equal to 0' } },
      { status: 400, description: 'Mã giảm giá phải từ 3 đến 20 ký tự', example: { error: '"code" length must be at least 3 characters long' } },
      { status: 401, description: 'Không có token hoặc token không hợp lệ', example: { error: 'Token không hợp lệ' } },
      { status: 403, description: 'Không có quyền admin', example: { error: 'Bạn không có quyền truy cập' } },
      { status: 404, description: 'Mã giảm giá không tồn tại', example: { error: 'Mã giảm giá không tồn tại' } },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database', example: { error: 'Lỗi server khi cập nhật mã giảm giá', details: 'Database connection failed' } },
    ],
  },
  {
    method: 'DELETE',
    path: '/api/coupons/:id',
    description: 'Xóa mã giảm giá',
    fullDescription:
      'Xóa một mã giảm giá dựa trên ID. Sử dụng giao dịch MongoDB để đảm bảo tính toàn vẹn dữ liệu. Yêu cầu quyền admin thông qua token JWT.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của admin được yêu cầu trong header, lấy từ endpoint `/api/users/login`.',
    },
    parameters: [
      { name: 'id', type: 'string', description: 'ObjectId của mã giảm giá', required: true, in: 'path' },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer <token>' },
      params: { id: '60d5f8e9b1a2b4f8e8f9e2c5' },
    },
    response: {
      status: 200,
      description: 'Xóa mã giảm giá thành công',
      example: {
        message: 'Xóa mã giảm giá thành công',
      },
    },
    errorResponses: [
      { status: 400, description: 'ID mã giảm giá không hợp lệ', example: { error: 'ID mã giảm giá không hợp lệ' } },
      { status: 401, description: 'Không có token hoặc token không hợp lệ', example: { error: 'Token không hợp lệ' } },
      { status: 403, description: 'Không có quyền admin', example: { error: 'Bạn không có quyền truy cập' } },
      { status: 404, description: 'Mã giảm giá không tồn tại', example: { error: 'Mã giảm giá không tồn tại' } },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database', example: { error: 'Lỗi server khi xóa mã giảm giá', details: 'Database connection failed' } },
    ],
  },
  {
    method: 'GET',
    path: '/api/coupons',
    description: 'Lấy danh sách mã giảm giá công khai',
    fullDescription:
      'Trả về danh sách mã giảm giá đang hoạt động (`isActive: true`) với phân trang. Hỗ trợ query `page`, `limit`, và `code` để lọc theo mã giảm giá (không phân biệt hoa thường). Không bao gồm trường `usedCount` trong phản hồi. Không yêu cầu xác thực, endpoint này công khai.',
    auth: {
      required: false,
      description: 'Không yêu cầu token. Endpoint này công khai.',
    },
    parameters: [
      { name: 'page', type: 'number', description: 'Số trang (mặc định: 1)', required: false, in: 'query' },
      { name: 'limit', type: 'number', description: 'Số lượng mã mỗi trang (mặc định: 9)', required: false, in: 'query' },
      { name: 'code', type: 'string', description: 'Lọc theo mã giảm giá (không phân biệt hoa thường)', required: false, in: 'query' },
    ],
    requestExample: {
      query: {
        page: 1,
        limit: 9,
        code: 'DISCOUNT',
      },
    },
    response: {
      status: 200,
      description: 'Lấy danh sách mã giảm giá thành công',
      example: {
        coupons: [
          {
            _id: '60d5f8e9b1a2b4f8e8f9e2c5',
            code: 'DISCOUNT10',
            discountType: 'percentage',
            discountValue: 10,
            minOrderValue: 100000,
            expiryDate: '2025-12-31T23:59:59Z',
            usageLimit: 100,
            isActive: true,
            description: 'Giảm giá 10% cho đơn hàng từ 100,000 VNĐ',
            createdAt: '2025-08-28T05:41:00Z',
            updatedAt: '2025-08-28T05:41:00Z',
          },
        ],
        pagination: {
          page: 1,
          limit: 9,
          total: 1,
          totalPages: 1,
        },
      },
    },
    errorResponses: [
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database', example: { error: 'Lỗi server khi lấy danh sách mã giảm giá', details: 'Database connection failed' } },
    ],
  },
  {
    method: 'GET',
    path: '/api/coupons/all',
    description: 'Lấy danh sách tất cả mã giảm giá (admin)',
    fullDescription:
      'Trả về danh sách tất cả mã giảm giá (bao gồm cả mã không hoạt động) với phân trang. Hỗ trợ query `page`, `limit`, `code`, và `isActive` để lọc theo trạng thái kích hoạt. Bao gồm trường `usedCount` trong phản hồi. Yêu cầu quyền admin thông qua token JWT.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của admin được yêu cầu trong header, lấy từ endpoint `/api/users/login`.',
    },
    parameters: [
      { name: 'page', type: 'number', description: 'Số trang (mặc định: 1)', required: false, in: 'query' },
      { name: 'limit', type: 'number', description: 'Số lượng mã mỗi trang (mặc định: 9)', required: false, in: 'query' },
      { name: 'code', type: 'string', description: 'Lọc theo mã giảm giá (không phân biệt hoa thường)', required: false, in: 'query' },
      { name: 'isActive', type: 'boolean', description: 'Lọc theo trạng thái kích hoạt (true hoặc false)', required: false, in: 'query' },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer <token>' },
      query: {
        page: 1,
        limit: 9,
        code: 'DISCOUNT',
        isActive: true,
      },
    },
    response: {
      status: 200,
      description: 'Lấy danh sách tất cả mã giảm giá thành công',
      example: {
        coupons: [
          {
            _id: '60d5f8e9b1a2b4f8e8f9e2c5',
            code: 'DISCOUNT10',
            discountType: 'percentage',
            discountValue: 10,
            minOrderValue: 100000,
            expiryDate: '2025-12-31T23:59:59Z',
            usageLimit: 100,
            usedCount: 0,
            isActive: true,
            description: 'Giảm giá 10% cho đơn hàng từ 100,000 VNĐ',
            createdAt: '2025-08-28T05:41:00Z',
            updatedAt: '2025-08-28T05:41:00Z',
          },
        ],
        pagination: {
          page: 1,
          limit: 9,
          total: 1,
          totalPages: 1,
        },
      },
    },
    errorResponses: [
      { status: 401, description: 'Không có token hoặc token không hợp lệ', example: { error: 'Token không hợp lệ' } },
      { status: 403, description: 'Không có quyền admin', example: { error: 'Bạn không có quyền truy cập' } },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database', example: { error: 'Lỗi server khi lấy danh sách mã giảm giá', details: 'Database connection failed' } },
    ],
  },
  {
    method: 'GET',
    path: '/api/coupons/:id',
    description: 'Lấy chi tiết mã giảm giá',
    fullDescription:
      'Trả về chi tiết một mã giảm giá dựa trên ID, bao gồm tất cả các trường trừ `usedCount`. Yêu cầu xác thực thông qua token JWT, có thể truy cập bởi bất kỳ người dùng đã đăng nhập, không yêu cầu quyền admin.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của người dùng được yêu cầu trong header, lấy từ endpoint `/api/users/login`.',
    },
    parameters: [
      { name: 'id', type: 'string', description: 'ObjectId của mã giảm giá', required: true, in: 'path' },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer <token>' },
      params: { id: '60d5f8e9b1a2b4f8e8f9e2c5' },
    },
    response: {
      status: 200,
      description: 'Lấy chi tiết mã giảm giá thành công',
      example: {
        coupon: {
          _id: '60d5f8e9b1a2b4f8e8f9e2c5',
          code: 'DISCOUNT10',
          discountType: 'percentage',
          discountValue: 10,
          minOrderValue: 100000,
          expiryDate: '2025-12-31T23:59:59Z',
          usageLimit: 100,
          isActive: true,
          description: 'Giảm giá 10% cho đơn hàng từ 100,000 VNĐ',
          createdAt: '2025-08-28T05:41:00Z',
          updatedAt: '2025-08-28T05:41:00Z',
        },
      },
    },
    errorResponses: [
      { status: 400, description: 'ID mã giảm giá không hợp lệ', example: { error: 'ID mã giảm giá không hợp lệ' } },
      { status: 401, description: 'Không có token hoặc token không hợp lệ', example: { error: 'Token không hợp lệ' } },
      { status: 404, description: 'Mã giảm giá không tồn tại', example: { error: 'Mã giảm giá không tồn tại' } },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database', example: { error: 'Lỗi server khi lấy chi tiết mã giảm giá', details: 'Database connection failed' } },
    ],
  },
  {
    method: 'POST',
    path: '/api/coupons/apply',
    description: 'Áp dụng mã giảm giá',
    fullDescription:
      'Kiểm tra và áp dụng mã giảm giá cho một đơn hàng. Mã phải đang hoạt động, chưa hết hạn, chưa vượt giới hạn sử dụng, và đáp ứng giá trị đơn hàng tối thiểu. Tăng `usedCount` và cập nhật trạng thái `isActive` nếu cần. Tính toán giá trị giảm giá dựa trên `discountType` và `orderValue`. Yêu cầu xác thực thông qua token JWT, có thể truy cập bởi bất kỳ người dùng đã đăng nhập.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của người dùng được yêu cầu trong header, lấy từ endpoint `/api/users/login`.',
    },
    parameters: [
      { name: 'code', type: 'string', description: 'Mã giảm giá cần áp dụng', required: true, in: 'body' },
      { name: 'orderValue', type: 'number', description: 'Giá trị đơn hàng để kiểm tra điều kiện minOrderValue và tính toán giảm giá', required: true, in: 'body' },
    ],
    requestExample: {
      headers: { Authorization: 'Bearer <token>', 'Content-Type': 'application/json' },
      body: {
        code: 'DISCOUNT10',
        orderValue: 150000,
      },
    },
    response: {
      status: 200,
      description: 'Áp dụng mã giảm giá thành công',
      example: {
        message: 'Áp dụng mã giảm giá thành công',
        coupon: {
          code: 'DISCOUNT10',
          discountType: 'percentage',
          discountValue: 10,
          discountAmount: 15000,
          isActive: true,
        },
      },
    },
    errorResponses: [
      { status: 400, description: 'Thiếu thông tin bắt buộc: code hoặc orderValue', example: { error: 'code is required, orderValue is required' } },
      { status: 400, description: 'Mã giảm giá không hoạt động', example: { error: 'Mã giảm giá không hoạt động' } },
      { status: 400, description: 'Mã giảm giá đã hết hạn', example: { error: 'Mã giảm giá đã hết hạn' } },
      { status: 400, description: 'Mã giảm giá đã đạt giới hạn sử dụng', example: { error: 'Mã giảm giá đã đạt giới hạn sử dụng' } },
      { status: 400, description: 'Đơn hàng không đạt giá trị tối thiểu', example: { error: 'Đơn hàng phải có giá trị tối thiểu 100000 để sử dụng mã này' } },
      { status: 401, description: 'Không có token hoặc token không hợp lệ', example: { error: 'Token không hợp lệ' } },
      { status: 404, description: 'Mã giảm giá không tồn tại', example: { error: 'Mã giảm giá không tồn tại' } },
      { status: 500, description: 'Lỗi máy chủ, có thể do kết nối database', example: { error: 'Lỗi server khi áp dụng mã giảm giá', details: 'Database connection failed' } },
    ],
  },
];

export default couponEndpoints;