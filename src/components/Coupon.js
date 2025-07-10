import React from 'react';
import EndpointItem from './EndpointItem';

const Coupon = ({ openEndpoint, setOpenEndpoint }) => {
  const endpoints = [
    {
      method: 'POST',
      path: '/api/coupons',
      description: 'Tạo mã giảm giá mới',
      fullDescription: 'Tạo một mã giảm giá mới với các thông tin như mã, loại giảm giá, giá trị giảm, và các tùy chọn khác. Mã phải duy nhất. Yêu cầu quyền admin thông qua token JWT.',
      auth: {
        required: true,
        header: 'Authorization: Bearer <token>',
        description: 'Token JWT của admin được yêu cầu trong header, lấy từ endpoint `/api/auth/login`.'
      },
      parameters: [
        { name: 'code', type: 'string', description: 'Mã giảm giá, phải duy nhất', required: true },
        { name: 'discountType', type: 'string', description: 'Loại giảm giá (`percentage` hoặc `fixed`)', required: true },
        { name: 'discountValue', type: 'number', description: 'Giá trị giảm giá (phần trăm hoặc số tiền cố định)', required: true },
        { name: 'minOrderValue', type: 'number', description: 'Giá trị đơn hàng tối thiểu để áp dụng mã (mặc định: 0)', required: false },
        { name: 'expiryDate', type: 'string', description: 'Ngày hết hạn của mã (định dạng ISO, ví dụ: `2025-12-31T23:59:59Z`)', required: false },
        { name: 'usageLimit', type: 'number', description: 'Số lần sử dụng tối đa của mã (null nếu không giới hạn)', required: false },
        { name: 'isActive', type: 'boolean', description: 'Trạng thái kích hoạt của mã (mặc định: true)', required: false }
      ],
      requestExample: {
        headers: { 'Authorization': 'Bearer <token>' },
        body: {
          code: 'DISCOUNT10',
          discountType: 'percentage',
          discountValue: 10,
          minOrderValue: 100000,
          expiryDate: '2025-12-31T23:59:59Z',
          usageLimit: 100,
          isActive: true
        }
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
            isActive: true,
            createdAt: '2025-07-09T00:00:00Z',
            updatedAt: '2025-07-09T00:00:00Z'
          }
        }
      },
      errorResponses: [
        { status: 400, description: 'Thiếu thông tin bắt buộc: code, discountType, hoặc discountValue' },
        { status: 400, description: 'Mã giảm giá đã tồn tại' },
        { status: 401, description: 'Không có token hoặc token không hợp lệ' },
        { status: 403, description: 'Không có quyền admin' },
        { status: 500, description: 'Lỗi máy chủ' }
      ]
    },
    {
      method: 'PUT',
      path: '/api/coupons/:id',
      description: 'Cập nhật mã giảm giá',
      fullDescription: 'Cập nhật thông tin mã giảm giá dựa trên ID. Có thể cập nhật bất kỳ trường nào. Yêu cầu quyền admin thông qua token JWT.',
      auth: {
        required: true,
        header: 'Authorization: Bearer <token>',
        description: 'Token JWT của admin được yêu cầu trong header.'
      },
      parameters: [
        { name: 'id', type: 'string', description: 'ObjectId của mã giảm giá', required: true },
        { name: 'code', type: 'string', description: 'Mã giảm giá mới', required: false },
        { name: 'discountType', type: 'string', description: 'Loại giảm giá mới (`percentage` hoặc `fixed`)', required: false },
        { name: 'discountValue', type: 'number', description: 'Giá trị giảm giá mới', required: false },
        { name: 'minOrderValue', type: 'number', description: 'Giá trị đơn hàng tối thiểu mới', required: false },
        { name: 'expiryDate', type: 'string', description: 'Ngày hết hạn mới (định dạng ISO)', required: false },
        { name: 'usageLimit', type: 'number', description: 'Số lần sử dụng tối đa mới', required: false },
        { name: 'isActive', type: 'boolean', description: 'Trạng thái kích hoạt mới', required: false }
      ],
      requestExample: {
        headers: { 'Authorization': 'Bearer <token>' },
        body: {
          code: 'DISCOUNT10',
          discountType: 'fixed',
          discountValue: 20000,
          isActive: false
        }
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
            minOrderValue: 100000,
            expiryDate: '2025-12-31T23:59:59Z',
            usageLimit: 100,
            isActive: false,
            createdAt: '2025-07-09T00:00:00Z',
            updatedAt: '2025-07-09T01:00:00Z'
          }
        }
      },
      errorResponses: [
        { status: 400, description: 'ID mã giảm giá không hợp lệ' },
        { status: 401, description: 'Không có token hoặc token không hợp lệ' },
        { status: 403, description: 'Không có quyền admin' },
        { status: 404, description: 'Mã giảm giá không tồn tại' },
        { status: 500, description: 'Lỗi máy chủ' }
      ]
    },
    {
      method: 'DELETE',
      path: '/api/coupons/:id',
      description: 'Xóa mã giảm giá',
      fullDescription: 'Xóa một mã giảm giá dựa trên ID. Yêu cầu quyền admin thông qua token JWT.',
      auth: {
        required: true,
        header: 'Authorization: Bearer <token>',
        description: 'Token JWT của admin được yêu cầu trong header.'
      },
      parameters: [
        { name: 'id', type: 'string', description: 'ObjectId của mã giảm giá', required: true }
      ],
      response: {
        status: 200,
        description: 'Xóa mã giảm giá thành công',
        example: {
          message: 'Xóa mã giảm giá thành công',
          coupon: {
            _id: '60d5f8e9b1a2b4f8e8f9e2c5',
            code: 'DISCOUNT10',
            discountType: 'percentage',
            discountValue: 10,
            minOrderValue: 100000,
            expiryDate: '2025-12-31T23:59:59Z',
            usageLimit: 100,
            isActive: true,
            createdAt: '2025-07-09T00:00:00Z',
            updatedAt: '2025-07-09T00:00:00Z'
          }
        }
      },
      errorResponses: [
        { status: 400, description: 'ID mã giảm giá không hợp lệ' },
        { status: 401, description: 'Không có token hoặc token không hợp lệ' },
        { status: 403, description: 'Không có quyền admin' },
        { status: 404, description: 'Mã giảm giá không tồn tại' },
        { status: 500, description: 'Lỗi máy chủ' }
      ]
    },
    {
      method: 'GET',
      path: '/api/coupons',
      description: 'Lấy danh sách mã giảm giá',
      fullDescription: 'Trả về danh sách mã giảm giá với phân trang, không bao gồm trường `usedCount`. Hỗ trợ query `page` và `limit`. Yêu cầu xác thực thông qua token JWT.',
      auth: {
        required: true,
        header: 'Authorization: Bearer <token>',
        description: 'Token JWT của người dùng được yêu cầu trong header.'
      },
      parameters: [
        { name: 'page', type: 'number', description: 'Số trang (mặc định: 1)', required: false },
        { name: 'limit', type: 'number', description: 'Số lượng mã mỗi trang (mặc định: 10)', required: false }
      ],
      response: {
        status: 200,
        description: 'Lấy danh sách mã giảm giá thành công',
        example: {
          message: 'Lấy danh sách mã giảm giá thành công',
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
              createdAt: '2025-07-09T00:00:00Z',
              updatedAt: '2025-07-09T00:00:00Z'
            }
          ],
          pagination: {
            page: 1,
            limit: 10,
            total: 1,
            totalPages: 1
          }
        }
      },
      errorResponses: [
        { status: 401, description: 'Không có token hoặc token không hợp lệ' },
        { status: 500, description: 'Lỗi máy chủ' }
      ]
    },
    {
      method: 'GET',
      path: '/api/coupons/:id',
      description: 'Lấy chi tiết mã giảm giá',
      fullDescription: 'Trả về chi tiết một mã giảm giá dựa trên ID, không bao gồm trường `usedCount`. Yêu cầu xác thực thông qua token JWT.',
      auth: {
        required: true,
        header: 'Authorization: Bearer <token>',
        description: 'Token JWT của người dùng được yêu cầu trong header.'
      },
      parameters: [
        { name: 'id', type: 'string', description: 'ObjectId của mã giảm giá', required: true }
      ],
      response: {
        status: 200,
        description: 'Lấy chi tiết mã giảm giá thành công',
        example: {
          message: 'Lấy chi tiết mã giảm giá thành công',
          coupon: {
            _id: '60d5f8e9b1a2b4f8e8f9e2c5',
            code: 'DISCOUNT10',
            discountType: 'percentage',
            discountValue: 10,
            minOrderValue: 100000,
            expiryDate: '2025-12-31T23:59:59Z',
            usageLimit: 100,
            isActive: true,
            createdAt: '2025-07-09T00:00:00Z',
            updatedAt: '2025-07-09T00:00:00Z'
          }
        }
      },
      errorResponses: [
        { status: 400, description: 'ID mã giảm giá không hợp lệ' },
        { status: 401, description: 'Không có token hoặc token không hợp lệ' },
        { status: 404, description: 'Mã giảm giá không tồn tại' },
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

export default Coupon;