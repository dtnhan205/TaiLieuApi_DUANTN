import React from 'react';
import EndpointItem from './EndpointItem';

const Order = ({ openEndpoint, setOpenEndpoint }) => {
  const endpoints = [
    {
      method: 'GET',
      path: '/api/orders/admin/all',
      description: 'Lấy tất cả đơn hàng (admin)',
      fullDescription: 'Trả về danh sách tất cả đơn hàng trong hệ thống, sắp xếp theo ID giảm dần. Bao gồm thông tin sản phẩm và người dùng được populate. Yêu cầu quyền admin thông qua token JWT.',
      auth: {
        required: true,
        header: 'Authorization: Bearer <token>',
        description: 'Token JWT của admin được yêu cầu trong header.'
      },
      parameters: [],
      response: {
        status: 200,
        description: 'Danh sách tất cả đơn hàng',
        example: [
          {
            _id: '60d5f8e9b1a2b4f8e8f9e2c7',
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
                  price: 100000,
                  image: 'image1.jpg'
                },
                quantity: 2
              }
            ],
            total: 200000,
            paymentMethod: 'cash',
            paymentStatus: 'pending',
            shippingStatus: 'pending',
            address: 'Phường 1, Quận 1, TP.HCM',
            note: 'Giao hàng nhanh',
            createdAt: '2025-07-09T10:18:00Z',
            updatedAt: '2025-07-09T10:18:00Z'
          }
        ]
      },
      errorResponses: [
        { status: 401, description: 'Không có token hoặc token không hợp lệ' },
        { status: 403, description: 'Không có quyền admin' },
        { status: 500, description: 'Lỗi máy chủ' }
      ]
    },
    {
      method: 'GET',
      path: '/api/orders/admin/user/:userId',
      description: 'Lấy đơn hàng theo người dùng (admin)',
      fullDescription: 'Trả về danh sách đơn hàng của một người dùng cụ thể dựa trên userId, sắp xếp theo ID giảm dần. Bao gồm thông tin sản phẩm và người dùng được populate. Yêu cầu quyền admin thông qua token JWT.',
      auth: {
        required: true,
        header: 'Authorization: Bearer <token>',
        description: 'Token JWT của admin được yêu cầu trong header.'
      },
      parameters: [
        { name: 'userId', type: 'string', description: 'ObjectId của người dùng', required: true }
      ],
      response: {
        status: 200,
        description: 'Danh sách đơn hàng của người dùng',
        example: [
          {
            _id: '60d5f8e9b1a2b4f8e8f9e2c7',
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
                  price: 100000,
                  image: 'image1.jpg'
                },
                quantity: 2
              }
            ],
            total: 200000,
            paymentMethod: 'cash',
            paymentStatus: 'pending',
            shippingStatus: 'pending',
            address: 'Phường 1, Quận 1, TP.HCM',
            note: 'Giao hàng nhanh',
            createdAt: '2025-07-09T10:18:00Z',
            updatedAt: '2025-07-09T10:18:00Z'
          }
        ]
      },
      errorResponses: [
        { status: 400, description: 'Thiếu userId hoặc userId không hợp lệ' },
        { status: 401, description: 'Không có token hoặc token không hợp lệ' },
        { status: 403, description: 'Không có quyền admin' },
        { status: 404, description: 'Người dùng không tồn tại' },
        { status: 500, description: 'Lỗi máy chủ' }
      ]
    },
    {
      method: 'GET',
      path: '/api/orders/admin/order/:orderId',
      description: 'Lấy chi tiết đơn hàng (admin)',
      fullDescription: 'Trả về chi tiết một đơn hàng dựa trên orderId, bao gồm thông tin sản phẩm và người dùng được populate. Yêu cầu quyền admin thông qua token JWT.',
      auth: {
        required: true,
        header: 'Authorization: Bearer <token>',
        description: 'Token JWT của admin được yêu cầu trong header.'
      },
      parameters: [
        { name: 'orderId', type: 'string', description: 'ObjectId của đơn hàng', required: true }
      ],
      response: {
        status: 200,
        description: 'Chi tiết đơn hàng',
        example: {
          _id: '60d5f8e9b1a2b4f8e8f9e2c7',
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
                price: 100000,
                image: 'image1.jpg'
              },
              quantity: 2
            }
          ],
          total: 200000,
          paymentMethod: 'cash',
          paymentStatus: 'pending',
          shippingStatus: 'pending',
          address: 'Phường 1, Quận 1, TP.HCM',
          note: 'Giao hàng nhanh',
          createdAt: '2025-07-09T10:18:00Z',
          updatedAt: '2025-07-09T10:18:00Z'
        }
      },
      errorResponses: [
        { status: 400, description: 'Thiếu orderId hoặc orderId không hợp lệ' },
        { status: 401, description: 'Không có token hoặc token không hợp lệ' },
        { status: 403, description: 'Không có quyền admin' },
        { status: 404, description: 'Không tìm thấy đơn hàng' },
        { status: 500, description: 'Lỗi máy chủ' }
      ]
    },
    {
      method: 'GET',
      path: '/api/orders/user/:userId',
      description: 'Lấy danh sách đơn hàng của người dùng',
      fullDescription: 'Trả về danh sách đơn hàng của một người dùng dựa trên userId, sắp xếp theo ID giảm dần. Bao gồm thông tin sản phẩm được populate. Yêu cầu xác thực thông qua token JWT.',
      auth: {
        required: true,
        header: 'Authorization: Bearer <token>',
        description: 'Token JWT của người dùng được yêu cầu trong header.'
      },
      parameters: [
        { name: 'userId', type: 'string', description: 'ObjectId của người dùng', required: true }
      ],
      response: {
        status: 200,
        description: 'Danh sách đơn hàng của người dùng',
        example: [
          {
            _id: '60d5f8e9b1a2b4f8e8f9e2c7',
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
                  price: 100000,
                  image: 'image1.jpg'
                },
                quantity: 2
              }
            ],
            total: 200000,
            paymentMethod: 'cash',
            paymentStatus: 'pending',
            shippingStatus: 'pending',
            address: 'Phường 1, Quận 1, TP.HCM',
            note: 'Giao hàng nhanh',
            createdAt: '2025-07-09T10:18:00Z',
            updatedAt: '2025-07-09T10:18:00Z'
          }
        ]
      },
      errorResponses: [
        { status: 400, description: 'Thiếu userId hoặc userId không hợp lệ' },
        { status: 401, description: 'Không có token hoặc token không hợp lệ' },
        { status: 404, description: 'Người dùng không tồn tại' },
        { status: 500, description: 'Lỗi máy chủ' }
      ]
    },
    {
      method: 'GET',
      path: '/api/orders/order/:orderId',
      description: 'Lấy chi tiết đơn hàng',
      fullDescription: 'Trả về chi tiết một đơn hàng dựa trên orderId, bao gồm thông tin sản phẩm và người dùng được populate. Yêu cầu xác thực thông qua token JWT.',
      auth: {
        required: true,
        header: 'Authorization: Bearer <token>',
        description: 'Token JWT của người dùng được yêu cầu trong header.'
      },
      parameters: [
        { name: 'orderId', type: 'string', description: 'ObjectId của đơn hàng', required: true }
      ],
      response: {
        status: 200,
        description: 'Chi tiết đơn hàng',
        example: {
          _id: '60d5f8e9b1a2b4f8e8f9e2c7',
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
                price: 100000,
                image: 'image1.jpg'
              },
              quantity: 2
            }
          ],
          total: 200000,
          paymentMethod: 'cash',
          paymentStatus: 'pending',
          shippingStatus: 'pending',
          address: 'Phường 1, Quận 1, TP.HCM',
          note: 'Giao hàng nhanh',
          createdAt: '2025-07-09T10:18:00Z',
          updatedAt: '2025-07-09T10:18:00Z'
        }
      },
      errorResponses: [
        { status: 400, description: 'Thiếu orderId hoặc orderId không hợp lệ' },
        { status: 401, description: 'Không có token hoặc token không hợp lệ' },
        { status: 404, description: 'Không tìm thấy đơn hàng' },
        { status: 500, description: 'Lỗi máy chủ' }
      ]
    },
    {
      method: 'PUT',
      path: '/api/orders/status/:orderId',
      description: 'Cập nhật trạng thái thanh toán đơn hàng',
      fullDescription: 'Cập nhật trạng thái thanh toán (`paymentStatus`) của một đơn hàng dựa trên orderId. Trạng thái hợp lệ: `pending`, `completed`, `failed`, `cancelled`. Yêu cầu quyền admin thông qua token JWT.',
      auth: {
        required: true,
        header: 'Authorization: Bearer <token>',
        description: 'Token JWT của admin được yêu cầu trong header.'
      },
      parameters: [
        { name: 'orderId', type: 'string', description: 'ObjectId của đơn hàng', required: true },
        { name: 'userId', type: 'string', description: 'ObjectId của người dùng (gửi qua query hoặc body)', required: true },
        { name: 'paymentStatus', type: 'string', description: 'Trạng thái thanh toán mới (`pending`, `completed`, `failed`, `cancelled`)', required: true }
      ],
      requestExample: {
        headers: { 'Authorization': 'Bearer <token>' },
        body: {
          userId: '60d5f8e9b1a2b4f8e8f9e2b0',
          paymentStatus: 'completed'
        }
      },
      response: {
        status: 200,
        description: 'Cập nhật trạng thái thanh toán thành công',
        example: {
          message: 'Cập nhật trạng thái thanh toán thành công',
          order: {
            _id: '60d5f8e9b1a2b4f8e8f9e2c7',
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
                  price: 100000,
                  image: 'image1.jpg'
                },
                quantity: 2
              }
            ],
            total: 200000,
            paymentMethod: 'cash',
            paymentStatus: 'completed',
            shippingStatus: 'pending',
            address: 'Phường 1, Quận 1, TP.HCM',
            note: 'Giao hàng nhanh',
            createdAt: '2025-07-09T10:18:00Z',
            updatedAt: '2025-07-09T10:20:00Z'
          }
        }
      },
      errorResponses: [
        { status: 400, description: 'Thiếu userId, orderId không hợp lệ, hoặc trạng thái thanh toán không hợp lệ' },
        { status: 401, description: 'Không có token hoặc token không hợp lệ' },
        { status: 403, description: 'Không có quyền admin' },
        { status: 404, description: 'Người dùng hoặc đơn hàng không tồn tại' },
        { status: 500, description: 'Lỗi máy chủ' }
      ]
    },
    {
      method: 'PUT',
      path: '/api/orders/update/:orderId',
      description: 'Cập nhật thông tin đơn hàng',
      fullDescription: 'Cập nhật các thông tin của một đơn hàng dựa trên orderId, bao gồm phương thức thanh toán, ghi chú, sản phẩm, trạng thái thanh toán, trạng thái vận chuyển, tổng tiền, và địa chỉ. Yêu cầu quyền admin thông qua token JWT.',
      auth: {
        required: true,
        header: 'Authorization: Bearer <token>',
        description: 'Token JWT của admin được yêu cầu trong header.'
      },
      parameters: [
        { name: 'orderId', type: 'string', description: 'ObjectId của đơn hàng', required: true },
        { name: 'paymentMethod', type: 'string', description: 'Phương thức thanh toán mới', required: false },
        { name: 'note', type: 'string', description: 'Ghi chú mới', required: false },
        { name: 'productDetails', type: 'array', description: 'Danh sách sản phẩm mới', required: false },
        { name: 'paymentStatus', type: 'string', description: 'Trạng thái thanh toán mới (`pending`, `completed`, `failed`, `cancelled`)', required: false },
        { name: 'shippingStatus', type: 'string', description: 'Trạng thái vận chuyển mới (`pending`, `in_transit`, `delivered`, `returned`)', required: false },
        { name: 'total', type: 'number', description: 'Tổng tiền mới', required: false },
        { name: 'address', type: 'string | object', description: 'Địa chỉ mới (chuỗi hoặc object {ward, district, cityOrProvince})', required: false }
      ],
      requestExample: {
        headers: { 'Authorization': 'Bearer <token>' },
        body: {
          paymentMethod: 'credit_card',
          note: 'Giao hàng cẩn thận',
          paymentStatus: 'completed',
          shippingStatus: 'in_transit',
          total: 250000,
          address: {
            ward: 'Phường 2',
            district: 'Quận 1',
            cityOrProvince: 'TP.HCM'
          }
        }
      },
      response: {
        status: 200,
        description: 'Cập nhật đơn hàng thành công',
        example: {
          message: 'Cập nhật đơn hàng thành công',
          order: {
            _id: '60d5f8e9b1a2b4f8e8f9e2c7',
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
                  price: 100000,
                  image: 'image1.jpg'
                },
                quantity: 2
              }
            ],
            total: 250000,
            paymentMethod: 'credit_card',
            paymentStatus: 'completed',
            shippingStatus: 'in_transit',
            address: 'Phường 2, Quận 1, TP.HCM',
            note: 'Giao hàng cẩn thận',
            createdAt: '2025-07-09T10:18:00Z',
            updatedAt: '2025-07-09T10:20:00Z'
          }
        }
      },
      errorResponses: [
        { status: 400, description: 'Thiếu orderId, orderId không hợp lệ, trạng thái thanh toán/vận chuyển không hợp lệ, hoặc định dạng địa chỉ không hợp lệ' },
        { status: 401, description: 'Không có token hoặc token không hợp lệ' },
        { status: 403, description: 'Không có quyền admin' },
        { status: 404, description: 'Không tìm thấy đơn hàng' },
        { status: 500, description: 'Lỗi máy chủ' }
      ]
    },
    {
      method: 'DELETE',
      path: '/api/orders/cancel/:orderId',
      description: 'Hủy đơn hàng',
      fullDescription: 'Hủy một đơn hàng dựa trên orderId, chỉ cho phép hủy khi trạng thái thanh toán là `pending`. Yêu cầu quyền admin thông qua token JWT và userId qua query hoặc body.',
      auth: {
        required: true,
        header: 'Authorization: Bearer <token>',
        description: 'Token JWT của admin được yêu cầu trong header.'
      },
      parameters: [
        { name: 'orderId', type: 'string', description: 'ObjectId của đơn hàng', required: true },
        { name: 'userId', type: 'string', description: 'ObjectId của người dùng (gửi qua query hoặc body)', required: true }
      ],
      requestExample: {
        headers: { 'Authorization': 'Bearer <token>' },
        body: {
          userId: '60d5f8e9b1a2b4f8e8f9e2b0'
        }
      },
      response: {
        status: 200,
        description: 'Hủy đơn hàng thành công',
        example: {
          message: 'Đã hủy đơn hàng thành công',
          order: {
            _id: '60d5f8e9b1a2b4f8e8f9e2c7',
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
                  price: 100000,
                  image: 'image1.jpg'
                },
                quantity: 2
              }
            ],
            total: 200000,
            paymentMethod: 'cash',
            paymentStatus: 'cancelled',
            shippingStatus: 'pending',
            address: 'Phường 1, Quận 1, TP.HCM',
            note: 'Giao hàng nhanh',
            createdAt: '2025-07-09T10:18:00Z',
            updatedAt: '2025-07-09T10:20:00Z'
          }
        }
      },
      errorResponses: [
        { status: 400, description: 'Thiếu userId, userId/orderId không hợp lệ, hoặc không thể hủy do trạng thái thanh toán không phải `pending`' },
        { status: 401, description: 'Không có token hoặc token không hợp lệ' },
        { status: 403, description: 'Không có quyền admin' },
        { status: 404, description: 'Người dùng hoặc đơn hàng không tồn tại' },
        { status: 500, description: 'Lỗi máy chủ' }
      ]
    }
  ];

  return (
    <>
      {endpoints.map((endpoint, index) => (
        <EndpointItem
          key={`${endpoint.path}-${index}`}
          endpoint={endpoint}
          index={index}
          openEndpoint={openEndpoint}
          setOpenEndpoint={setOpenEndpoint}
        />
      ))}
    </>
  );
};

export default Order;