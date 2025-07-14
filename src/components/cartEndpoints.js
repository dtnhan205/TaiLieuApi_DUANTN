const cartEndpoints = [
  {
    method: 'GET',
    path: '/api/cart/getall',
    description: 'Lấy danh sách tất cả giỏ hàng',
    fullDescription: 'Trả về danh sách tất cả giỏ hàng trong hệ thống, bao gồm thông tin người dùng và sản phẩm. Yêu cầu quyền admin thông qua token JWT.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của admin được yêu cầu trong header, lấy từ endpoint `/api/auth/login`.'
    },
    parameters: [],
    response: {
      status: 200,
      description: 'Danh sách tất cả giỏ hàng',
      example: [
        {
          _id: '60d5f8e9b1a2b4f8e8f9e2c1',
          user: {
            _id: '60d5f8e9b1a2b4f8e8f9e2b0',
            username: 'user1',
            email: 'user1@example.com'
          },
          items: [
            {
              product: {
                _id: '60d5f8e9b1a2b4f8e8f9e2b1',
                name: 'Sản phẩm A',
                images: ['image1.jpg']
              },
              option: {
                _id: '60d5f8e9b1a2b4f8e8f9e2b2',
                value: 'Màu đỏ',
                price: 100000,
                discount_price: 80000,
                stock: 50
              },
              quantity: 2
            }
          ],
          createdAt: '2025-07-09T00:00:00Z',
          updatedAt: '2025-07-09T00:00:00Z'
        }
      ]
    },
    errorResponses: [
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 403, description: 'Không có quyền admin' },
      { status: 404, description: 'Không tìm thấy giỏ hàng nào' },
      { status: 500, description: 'Lỗi máy chủ' }
    ]
  },
  {
    method: 'GET',
    path: '/api/cart',
    description: 'Lấy giỏ hàng của người dùng',
    fullDescription: 'Trả về giỏ hàng của một người dùng cụ thể dựa trên `userId`. Yêu cầu xác thực thông qua token JWT.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của người dùng được yêu cầu trong header.'
    },
    parameters: [
      { name: 'userId', type: 'string', description: 'ObjectId của người dùng, gửi qua query hoặc body', required: true }
    ],
    response: {
      status: 200,
      description: 'Giỏ hàng của người dùng',
      example: {
        _id: '60d5f8e9b1a2b4f8e8f9e2c1',
        user: '60d5f8e9b1a2b4f8e8f9e2b0',
        items: [
          {
            product: {
              _id: '60d5f8e9b1a2b4f8e8f9e2b1',
              name: 'Sản phẩm A',
              images: ['image1.jpg']
            },
            option: {
              _id: '60d5f8e9b1a2b4f8e8f9e2b2',
              value: 'Màu đỏ',
              price: 100000,
              discount_price: 80000,
              stock: 50
            },
            quantity: 2
          }
        ]
      }
    },
    errorResponses: [
      { status: 400, description: 'Thiếu hoặc userId không hợp lệ' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 404, description: 'Người dùng hoặc giỏ hàng không tồn tại' },
      { status: 500, description: 'Lỗi máy chủ' }
    ]
  },
  {
    method: 'POST',
    path: '/api/cart/add',
    description: 'Thêm sản phẩm vào giỏ hàng',
    fullDescription: 'Thêm sản phẩm vào giỏ hàng của người dùng với `productId`, `optionIds`, và `quantity`. Kiểm tra tồn kho và tính hợp lệ của sản phẩm/biến thể. Yêu cầu xác thực thông qua token JWT.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của người dùng được yêu cầu trong header.'
    },
    parameters: [
      { name: 'userId', type: 'string', description: 'ObjectId của người dùng, gửi qua query hoặc body', required: true },
      { name: 'productId', type: 'string', description: 'ObjectId của sản phẩm', required: true },
      { name: 'optionIds', type: 'array', description: 'Danh sách ObjectId của các biến thể sản phẩm', required: true },
      { name: 'quantity', type: 'number', description: 'Số lượng sản phẩm (mặc định 1, phải là số nguyên > 0)', required: false }
    ],
    requestExample: {
      headers: { 'Authorization': 'Bearer <token>' },
      body: {
        userId: '60d5f8e9b1a2b4f8e8f9e2b0',
        productId: '60d5f8e9b1a2b4f8e8f9e2b1',
        optionIds: ['60d5f8e9b1a2b4f8e8f9e2b2'],
        quantity: 2
      }
    },
    response: {
      status: 200,
      description: 'Thêm sản phẩm vào giỏ hàng thành công',
      example: {
        _id: '60d5f8e9b1a2b4f8e8f9e2c1',
        user: '60d5f8e9b1a2b4f8e8f9e2b0',
        items: [
          {
            product: {
              _id: '60d5f8e9b1a2b4f8e8f9e2b1',
              name: 'Sản phẩm A',
              images: ['image1.jpg']
            },
            optionId: '60d5f8e9b1a2b4f8e8f9e2b2',
            quantity: 2
          }
        ]
      }
    },
    errorResponses: [
      { status: 400, description: 'Thiếu hoặc dữ liệu không hợp lệ (userId, productId, optionIds, quantity)' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 404, description: 'Người dùng, sản phẩm, hoặc biến thể không tồn tại' },
      { status: 400, description: 'Không đủ số lượng tồn kho' },
      { status: 500, description: 'Lỗi máy chủ' }
    ]
  },
  {
    method: 'PUT',
    path: '/api/cart/update',
    description: 'Cập nhật số lượng sản phẩm trong giỏ hàng',
    fullDescription: 'Cập nhật số lượng của một sản phẩm trong giỏ hàng dựa trên `productId` và `optionId`. Kiểm tra tồn kho và tính hợp lệ. Yêu cầu xác thực thông qua token JWT.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của người dùng được yêu cầu trong header.'
    },
    parameters: [
      { name: 'userId', type: 'string', description: 'ObjectId của người dùng, gửi qua query hoặc body', required: true },
      { name: 'productId', type: 'string', description: 'ObjectId của sản phẩm', required: true },
      { name: 'optionId', type: 'string', description: 'ObjectId của biến thể sản phẩm', required: true },
      { name: 'quantity', type: 'number', description: 'Số lượng mới (phải là số nguyên > 0)', required: true }
    ],
    requestExample: {
      headers: { 'Authorization': 'Bearer <token>' },
      body: {
        userId: '60d5f8e9b1a2b4f8e8f9e2b0',
        productId: '60d5f8e9b1a2b4f8e8f9e2b1',
        optionId: '60d5f8e9b1a2b4f8e8f9e2b2',
        quantity: 3
      }
    },
    response: {
      status: 200,
      description: 'Cập nhật số lượng thành công',
      example: {
        _id: '60d5f8e9b1a2b4f8e8f9e2c1',
        user: '60d5f8e9b1a2b4f8e8f9e2b0',
        items: [
          {
            product: {
              _id: '60d5f8e9b1a2b4f8e8f9e2b1',
              name: 'Sản phẩm A',
              images: ['image1.jpg']
            },
            optionId: '60d5f8e9b1a2b4f8e8f9e2b2',
            quantity: 3
          }
        ]
      }
    },
    errorResponses: [
      { status: 400, description: 'Thiếu hoặc dữ liệu không hợp lệ (userId, productId, optionId, quantity)' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 404, description: 'Người dùng, sản phẩm, biến thể, hoặc mục trong giỏ không tồn tại' },
      { status: 400, description: 'Không đủ số lượng tồn kho' },
      { status: 500, description: 'Lỗi máy chủ' }
    ]
  },
  {
    method: 'DELETE',
    path: '/api/cart/remove/:cartId/:productId/:optionId',
    description: 'Xóa sản phẩm khỏi giỏ hàng',
    fullDescription: 'Xóa một mục khỏi giỏ hàng dựa trên `cartId`, `productId`, và `optionId`. Yêu cầu xác thực thông qua token JWT và kiểm tra quyền sở hữu giỏ hàng.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của người dùng được yêu cầu trong header.'
    },
    parameters: [
      { name: 'cartId', type: 'string', description: 'ObjectId của giỏ hàng', required: true },
      { name: 'productId', type: 'string', description: 'ObjectId của sản phẩm', required: true },
      { name: 'optionId', type: 'string', description: 'ObjectId của biến thể sản phẩm', required: true },
      { name: 'userId', type: 'string', description: 'ObjectId của người dùng, gửi qua query hoặc body', required: true }
    ],
    response: {
      status: 200,
      description: 'Xóa sản phẩm khỏi giỏ hàng thành công',
      example: {
        _id: '60d5f8e9b1a2b4f8e8f9e2c1',
        user: '60d5f8e9b1a2b4f8e8f9e2b0',
        items: []
      }
    },
    errorResponses: [
      { status: 400, description: 'Thiếu hoặc dữ liệu không hợp lệ (cartId, productId, optionId, userId)' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 404, description: 'Giỏ hàng, sản phẩm, hoặc mục trong giỏ không tồn tại' },
      { status: 500, description: 'Lỗi máy chủ' }
    ]
  },
  {
    method: 'DELETE',
    path: '/api/cart/clear',
    description: 'Xóa toàn bộ giỏ hàng',
    fullDescription: 'Xóa tất cả các mục trong giỏ hàng của người dùng dựa trên `userId`. Yêu cầu xác thực thông qua token JWT.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của người dùng được yêu cầu trong header.'
    },
    parameters: [
      { name: 'userId', type: 'string', description: 'ObjectId của người dùng, gửi qua query hoặc body', required: true }
    ],
    response: {
      status: 200,
      description: 'Xóa toàn bộ giỏ hàng thành công',
      example: {
        message: 'Đã xóa toàn bộ giỏ hàng'
      }
    },
    errorResponses: [
      { status: 400, description: 'Thiếu hoặc userId không hợp lệ' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 404, description: 'Người dùng hoặc giỏ hàng không tồn tại' },
      { status: 500, description: 'Lỗi máy chủ' }
    ]
  },
  {
    method: 'POST',
    path: '/api/cart/checkout',
    description: 'Thanh toán giỏ hàng',
    fullDescription: 'Tạo đơn hàng từ giỏ hàng của người dùng, kiểm tra tính hợp lệ của địa chỉ, số điện thoại, phương thức thanh toán, và mã giảm giá (nếu có). Cập nhật tồn kho, lưu địa chỉ tạm thời, xóa giỏ hàng sau khi thành công, và tạo mã thanh toán duy nhất (`paymentCode`). Yêu cầu xác thực thông qua token JWT.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của người dùng được yêu cầu trong header.'
    },
    parameters: [
      { name: 'userId', type: 'string', description: 'ObjectId của người dùng', required: true },
      { name: 'addressLine', type: 'string', description: 'Số nhà và tên đường', required: true },
      { name: 'ward', type: 'string', description: 'Phường/xã', required: true },
      { name: 'district', type: 'string', description: 'Quận/huyện', required: true },
      { name: 'cityOrProvince', type: 'string', description: 'Tỉnh/thành phố', required: true },
      { name: 'sdt', type: 'string', description: 'Số điện thoại (10 chữ số)', required: true },
      { name: 'paymentMethod', type: 'string', description: 'Phương thức thanh toán (ví dụ: COD, Visa)', required: true },
      { name: 'note', type: 'string', description: 'Ghi chú đơn hàng (tuỳ chọn)', required: false },
      { name: 'couponCode', type: 'string', description: 'Mã giảm giá (nếu có)', required: false }
    ],
    requestExample: {
      headers: { 'Authorization': 'Bearer <token>' },
      body: {
        userId: '60d5f8e9b1a2b4f8e8f9e2b0',
        addressLine: '123 Đường Láng',
        ward: 'Láng Thượng',
        district: 'Đống Đa',
        cityOrProvince: 'Hà Nội',
        sdt: '0123456789',
        paymentMethod: 'COD',
        note: 'Giao hàng trong giờ hành chính',
        couponCode: 'DISCOUNT10'
      }
    },
    response: {
      status: 200,
      description: 'Thanh toán thành công',
      example: {
        message: 'Thanh toán thành công',
        order: {
          _id: '60d5f8e9b1a2b4f8e8f9e2c2',
          user: {
            _id: '60d5f8e9b1a2b4f8e8f9e2b0',
            username: 'user1',
            email: 'user1@example.com'
          },
          items: [
            {
              product: {
                _id: '60d5f8e9b1a2b4f8e8f9e2b1',
                name: 'Sản phẩm A',
                images: ['image1.jpg']
              },
              optionId: '60d5f8e9b1a2b4f8e8f9e2b2',
              quantity: 2,
              images: ['image1.jpg']
            }
          ],
          subtotal: 160000,
          discount: 16000,
          total: 144000,
          address: {
            addressLine: '123 Đường Láng',
            ward: 'Láng Thượng',
            district: 'Đống Đa',
            cityOrProvince: 'Hà Nội'
          },
          sdt: '0123456789',
          paymentMethod: 'COD',
          note: 'Giao hàng trong giờ hành chính',
          coupon: {
            _id: '60d5f8e9b1a2b4f8e8f9e2c3',
            code: 'DISCOUNT10'
          },
          paymentStatus: 'pending',
          shippingStatus: 'pending'
        },
        paymentCode: 'thanhtoan28369',
        warning: 'Đã loại bỏ 1 sản phẩm không hợp lệ khỏi giỏ hàng' // Cảnh báo nếu có
      }
    },
    errorResponses: [
      { status: 400, description: 'Thiếu hoặc dữ liệu không hợp lệ (userId, địa chỉ, số điện thoại, phương thức thanh toán, mã giảm giá)' },
      { status: 400, description: 'Giỏ hàng trống hoặc không chứa sản phẩm hợp lệ' },
      { status: 400, description: 'Số điện thoại không đúng định dạng (phải là 10 chữ số)' },
      { status: 400, description: 'Không đủ số lượng tồn kho cho một hoặc nhiều sản phẩm' },
      { status: 400, description: 'Mã giảm giá không hợp lệ, hết hạn, hoặc không đáp ứng điều kiện' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 404, description: 'Người dùng hoặc giỏ hàng không tồn tại' },
      { status: 500, description: 'Lỗi máy chủ' }
    ]
  },
  {
    method: 'POST',
    path: '/api/cart/update-price',
    description: 'Cập nhật giá giỏ hàng',
    fullDescription: 'Tính toán giá giỏ hàng của người dùng, bao gồm tổng phụ (subtotal), giảm giá (nếu áp dụng mã giảm giá), và tổng cộng. Yêu cầu xác thực thông qua token JWT.',
    auth: {
      required: true,
      header: 'Authorization: Bearer <token>',
      description: 'Token JWT của người dùng được yêu cầu trong header.'
    },
    parameters: [
      { name: 'userId', type: 'string', description: 'ObjectId của người dùng, gửi qua query hoặc body', required: true },
      { name: 'couponCode', type: 'string', description: 'Mã giảm giá (nếu có)', required: false }
    ],
    requestExample: {
      headers: { 'Authorization': 'Bearer <token>' },
      body: {
        userId: '60d5f8e9b1a2b4f8e8f9e2b0',
        couponCode: 'DISCOUNT10'
      }
    },
    response: {
      status: 200,
      description: 'Cập nhật giá thành công',
      example: {
        subtotal: 160000,
        discount: 16000,
        total: 144000
      }
    },
    errorResponses: [
      { status: 400, description: 'Thiếu hoặc userId không hợp lệ' },
      { status: 400, description: 'Giỏ hàng trống hoặc không chứa sản phẩm hợp lệ' },
      { status: 400, description: 'Mã giảm giá không hợp lệ, không hoạt động, hết hạn, hoặc không đáp ứng điều kiện' },
      { status: 401, description: 'Không có token hoặc token không hợp lệ' },
      { status: 404, description: 'Người dùng hoặc giỏ hàng không tồn tại' },
      { status: 500, description: 'Lỗi máy chủ' }
    ]
  }
];

export default cartEndpoints;