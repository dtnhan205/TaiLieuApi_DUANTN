import React from 'react';
import EndpointItem from './EndpointItem';

const User = ({ openEndpoint, setOpenEndpoint }) => {
  const endpoints = [
    {
      method: 'POST',
      path: '/api/users/register',
      description: 'Register a new user',
      fullDescription: 'Creates a new user account with required fields: username, phone, email, and password. Sends a welcome email with a 10% coupon code. Password is hashed before storage. No authentication required.',
      auth: {
        required: false,
        description: 'No token required. This endpoint is publicly accessible.'
      },
      parameters: [
        { name: 'username', type: 'string', description: 'Username of the user', required: true },
        { name: 'phone', type: 'string', description: 'Phone number (format: 0xxxxxxxxx)', required: true },
        { name: 'email', type: 'string', description: 'Email address (must be unique)', required: true },
        { name: 'password', type: 'string', description: 'Password (minimum 8 characters)', required: true },
        { name: 'address', type: 'string', description: 'User address', required: false },
        { name: 'birthday', type: 'string', description: 'Birthday (ISO date format)', required: false },
        { name: 'listOrder', type: 'array', description: 'Array of Order ObjectIds', required: false }
      ],
      requestExample: {
        body: {
          username: 'john_doe',
          phone: '0987654321',
          email: 'john.doe@example.com',
          password: 'securepassword123',
          address: '123 Main St, Hanoi',
          birthday: '1990-01-01',
          listOrder: []
        }
      },
      response: {
        status: 201,
        description: 'User registered successfully',
        example: {
          message: 'Đăng ký thành công! Bạn có thể đăng nhập.',
          user: {
            _id: '60d5f8e9b1a2b4f8e8f9e2b0',
            username: 'john_doe',
            phone: '0987654321',
            email: 'john.doe@example.com',
            address: '123 Main St, Hanoi',
            birthday: '1990-01-01T00:00:00Z',
            listOrder: [],
            status: 'active',
            role: 'user',
            createdAt: '2025-07-09T10:18:00Z'
          }
        }
      },
      errorResponses: [
        { status: 400, description: 'Missing required fields or invalid phone/email/password format' },
        { status: 409, description: 'Email already exists' },
        { status: 500, description: 'Server error' }
      ]
    },
    {
      method: 'POST',
      path: '/api/users/login',
      description: 'Log in a user',
      fullDescription: 'Authenticates a user with email and password, returning a JWT token valid for 1 hour. Checks if the account is active. No authentication required.',
      auth: {
        required: false,
        description: 'No token required. This endpoint is publicly accessible.'
      },
      parameters: [
        { name: 'email', type: 'string', description: 'User email', required: true },
        { name: 'password', type: 'string', description: 'User password', required: true }
      ],
      requestExample: {
        body: {
          email: 'john.doe@example.com',
          password: 'securepassword123'
        }
      },
      response: {
        status: 200,
        description: 'Login successful',
        example: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          message: 'Đăng nhập thành công',
          user: {
            id: '60d5f8e9b1a2b4f8e8f9e2b0',
            email: 'john.doe@example.com',
            username: 'john_doe',
            role: 'user'
          }
        }
      },
      errorResponses: [
        { status: 400, description: 'Missing email or password' },
        { status: 401, description: 'Email does not exist or password incorrect' },
        { status: 403, description: 'Account is inactive or banned' },
        { status: 500, description: 'Server error' }
      ]
    },
    {
      method: 'POST',
      path: '/api/users/forgot-password',
      description: 'Request password reset',
      fullDescription: 'Sends a password reset email with a JWT token (valid for 1 hour) to the provided email. No authentication required.',
      auth: {
        required: false,
        description: 'No token required. This endpoint is publicly accessible.'
      },
      parameters: [
        { name: 'email', type: 'string', description: 'User email', required: true }
      ],
      requestExample: {
        body: {
          email: 'john.doe@example.com'
        }
      },
      response: {
        status: 200,
        description: 'Password reset email sent',
        example: {
          message: 'Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư của bạn.'
        }
      },
      errorResponses: [
        { status: 400, description: 'Missing or invalid email' },
        { status: 404, description: 'Email does not exist' },
        { status: 500, description: 'Error sending email or server error' }
      ]
    },
    {
      method: 'POST',
      path: '/api/users/reset-password/:token',
      description: 'Reset password',
      fullDescription: 'Resets the user password using a JWT token from the password reset email. Sends a confirmation email. No authentication required.',
      auth: {
        required: false,
        description: 'No token required. This endpoint is publicly accessible.'
      },
      parameters: [
        { name: 'token', type: 'string', description: 'JWT reset token', required: true },
        { name: 'newPassword', type: 'string', description: 'New password (minimum 8 characters)', required: true }
      ],
      requestExample: {
        body: {
          newPassword: 'newpassword123'
        }
      },
      response: {
        status: 200,
        description: 'Password reset successful',
        example: {
          message: 'Đặt lại mật khẩu thành công!'
        }
      },
      errorResponses: [
        { status: 400, description: 'Missing or invalid newPassword, or token invalid/expired' },
        { status: 404, description: 'Token does not match or user not found' },
        { status: 500, description: 'Server error' }
      ]
    },
    {
      method: 'GET',
      path: '/api/users/userinfo',
      description: 'Get authenticated user info',
      fullDescription: 'Returns information of the authenticated user, excluding sensitive fields like password. Requires a valid JWT token.',
      auth: {
        required: true,
        header: 'Authorization: Bearer <token>',
        description: 'JWT token of the user required in the header.'
      },
      parameters: [],
      response: {
        status: 200,
        description: 'User information',
        example: {
          _id: '60d5f8e9b1a2b4f8e8f9e2b0',
          username: 'john_doe',
          phone: '0987654321',
          email: 'john.doe@example.com',
          address: '123 Main St, Hanoi',
          birthday: '1990-01-01T00:00:00Z',
          listOrder: [],
          status: 'active',
          role: 'user',
          createdAt: '2025-07-09T10:18:00Z'
        }
      },
      errorResponses: [
        { status: 401, description: 'No token or invalid/expired token' },
        { status: 404, description: 'User not found' },
        { status: 500, description: 'Server error' }
      ]
    },
    {
      method: 'GET',
      path: '/api/users',
      description: 'Get all users',
      fullDescription: 'Returns a list of all users, excluding sensitive fields like password. Requires admin privileges and a valid JWT token.',
      auth: {
        required: true,
        header: 'Authorization: Bearer <token>',
        description: 'JWT token of an admin required in the header.'
      },
      parameters: [],
      response: {
        status: 200,
        description: 'List of all users',
        example: [
          {
            _id: '60d5f8e9b1a2b4f8e8f9e2b0',
            username: 'john_doe',
            phone: '0987654321',
            email: 'john.doe@example.com',
            address: '123 Main St, Hanoi',
            birthday: '1990-01-01T00:00:00Z',
            listOrder: [],
            status: 'active',
            role: 'user',
            createdAt: '2025-07-09T10:18:00Z'
          }
        ]
      },
      errorResponses: [
        { status: 401, description: 'No token or invalid/expired token' },
        { status: 403, description: 'Not an admin' },
        { status: 404, description: 'No users found' },
        { status: 500, description: 'Server error' }
      ]
    },
    {
      method: 'GET',
      path: '/api/users/:id',
      description: 'Get user by ID',
      fullDescription: 'Returns details of a user by ID, excluding sensitive fields like password. Requires admin privileges and a valid JWT token.',
      auth: {
        required: true,
        header: 'Authorization: Bearer <token>',
        description: 'JWT token of an admin required in the header.'
      },
      parameters: [
        { name: 'id', type: 'string', description: 'ObjectId of the user', required: true }
      ],
      response: {
        status: 200,
        description: 'User details',
        example: {
          _id: '60d5f8e9b1a2b4f8e8f9e2b0',
          username: 'john_doe',
          phone: '0987654321',
          email: 'john.doe@example.com',
          address: '123 Main St, Hanoi',
          birthday: '1990-01-01T00:00:00Z',
          listOrder: [],
          status: 'active',
          role: 'user',
          createdAt: '2025-07-09T10:18:00Z'
        }
      },
      errorResponses: [
        { status: 401, description: 'No token or invalid/expired token' },
        { status: 403, description: 'Not an admin' },
        { status: 404, description: 'User not found' },
        { status: 500, description: 'Server error' }
      ]
    },
    {
      method: 'PUT',
      path: '/api/users/update/:id',
      description: 'Update user information',
      fullDescription: 'Updates user information such as username, phone, email, address, birthday, status, or role. Users can update their own data, or admins can update any user. Requires a valid JWT token.',
      auth: {
        required: true,
        header: 'Authorization: Bearer <token>',
        description: 'JWT token of the user or admin required in the header.'
      },
      parameters: [
        { name: 'id', type: 'string', description: 'ObjectId of the user', required: true },
        { name: 'username', type: 'string', description: 'New username', required: false },
        { name: 'phone', type: 'string', description: 'New phone number (format: 0xxxxxxxxx)', required: false },
        { name: 'email', type: 'string', description: 'New email address', required: false },
        { name: 'address', type: 'string', description: 'New address', required: false },
        { name: 'birthday', type: 'string', description: 'New birthday (ISO date format)', required: false },
        { name: 'status', type: 'string', description: 'New status (active, inactive, banned)', required: false },
        { name: 'role', type: 'string', description: 'New role (user, admin)', required: false }
      ],
      requestExample: {
        headers: { 'Authorization': 'Bearer <token>' },
        body: {
          username: 'john_doe_updated',
          phone: '0912345678',
          email: 'john.doe.new@example.com',
          address: '456 New St, Hanoi',
          birthday: '1990-01-02',
          status: 'active',
          role: 'user'
        }
      },
      response: {
        status: 200,
        description: 'User updated successfully',
        example: {
          message: 'Cập nhật thành công',
          user: {
            _id: '60d5f8e9b1a2b4f8e8f9e2b0',
            username: 'john_doe_updated',
            phone: '0912345678',
            email: 'john.doe.new@example.com',
            address: '456 New St, Hanoi',
            birthday: '1990-01-02T00:00:00Z',
            listOrder: [],
            status: 'active',
            role: 'user',
            createdAt: '2025-07-09T10:18:00Z'
          }
        }
      },
      errorResponses: [
        { status: 401, description: 'No token or invalid/expired token' },
        { status: 403, description: 'User does not have permission to update this user' },
        { status: 404, description: 'User not found' },
        { status: 500, description: 'Server error' }
      ]
    },
    {
      method: 'DELETE',
      path: '/api/users/:id',
      description: 'Delete a user',
      fullDescription: 'Deletes a user by ID. Only admins can delete users. Requires a valid JWT token.',
      auth: {
        required: true,
        header: 'Authorization: Bearer <token>',
        description: 'JWT token of an admin required in the header.'
      },
      parameters: [
        { name: 'id', type: 'string', description: 'ObjectId of the user', required: true }
      ],
      response: {
        status: 200,
        description: 'User deleted successfully',
        example: {
          message: 'Xóa người dùng thành công'
        }
      },
      errorResponses: [
        { status: 401, description: 'No token or invalid/expired token' },
        { status: 403, description: 'Not an admin or no permission' },
        { status: 404, description: 'User not found' },
        { status: 500, description: 'Server error' }
      ]
    },
    {
      method: 'PUT',
      path: '/api/users/change-password/:id',
      description: 'Change user password',
      fullDescription: 'Changes the user password after verifying the old password. Sends a confirmation email. Users can change their own password, or admins can change any user’s password. Requires a valid JWT token.',
      auth: {
        required: true,
        header: 'Authorization: Bearer <token>',
        description: 'JWT token of the user or admin required in the header.'
      },
      parameters: [
        { name: 'id', type: 'string', description: 'ObjectId of the user', required: true },
        { name: 'oldPassword', type: 'string', description: 'Current password', required: true },
        { name: 'newPassword', type: 'string', description: 'New password (minimum 8 characters)', required: true }
      ],
      requestExample: {
        headers: { 'Authorization': 'Bearer <token>' },
        body: {
          oldPassword: 'securepassword123',
          newPassword: 'newpassword123'
        }
      },
      response: {
        status: 200,
        description: 'Password changed successfully',
        example: {
          message: 'Đổi mật khẩu thành công'
        }
      },
      errorResponses: [
        { status: 400, description: 'Missing oldPassword/newPassword or newPassword too short' },
        { status: 401, description: 'Old password incorrect' },
        { status: 403, description: 'User does not have permission to change this password' },
        { status: 404, description: 'User not found' },
        { status: 500, description: 'Server error' }
      ]
    },
    {
      method: 'GET',
      path: '/api/users/google',
      description: 'Initiate Google OAuth login',
      fullDescription: 'Redirects to Google’s OAuth 2.0 authorization page to authenticate the user. No authentication required.',
      auth: {
        required: false,
        description: 'No token required. This endpoint is publicly accessible.'
      },
      parameters: [],
      response: {
        status: 302,
        description: 'Redirect to Google OAuth page',
        example: {
          redirect: 'https://accounts.google.com/o/oauth2/auth?client_id=...&redirect_uri=...&scope=...&response_type=code'
        }
      },
      errorResponses: [
        { status: 500, description: 'Server error' }
      ]
    },
    {
      method: 'GET',
      path: '/api/users/google/callback',
      description: 'Handle Google OAuth callback',
      fullDescription: 'Handles the callback from Google OAuth, authenticates the user, and typically redirects with a JWT token or to a frontend page. No authentication required.',
      auth: {
        required: false,
        description: 'No token required. This endpoint is publicly accessible.'
      },
      parameters: [
        { name: 'code', type: 'string', description: 'Authorization code from Google', required: true, in: 'query' }
      ],
      response: {
        status: 302,
        description: 'Redirect to frontend with token or success page',
        example: {
          redirect: 'https://purebotanica.com/auth/success?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
        }
      },
      errorResponses: [
        { status: 400, description: 'Invalid or missing authorization code' },
        { status: 500, description: 'Server error' }
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

export default User;