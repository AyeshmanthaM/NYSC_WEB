# NYSC Website API Documentation

## Overview

RESTful API documentation for the National Youth Services Council website backend services. This unified backend serves both the public API for the React frontend and the admin panel functionality.

## Base Information

- **API Version**: v1
- **Base URL**: `http://localhost:5000/api` (development) / `https://nysc.lk/api` (production)
- **Admin Base URL**: `http://localhost:5000/admin` (server-side rendered)
- **Content Type**: `application/json`
- **Authentication**: JWT (API) / Sessions (Admin)

## Authentication

### API Authentication (JWT)

The API uses JSON Web Tokens for authentication with access/refresh token pattern.

#### Token Format
- **Access Token**: Short-lived (15 minutes), stored in httpOnly cookie
- **Refresh Token**: Long-lived (7 days), stored in httpOnly cookie
- **Header Format**: `Authorization: Bearer <token>` (alternative to cookie)

#### Authentication Endpoints

##### Register User
```
POST /api/auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "clx123456789",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "USER",
      "isActive": true,
      "emailVerified": false,
      "createdAt": "2025-01-26T10:00:00.000Z"
    },
    "accessToken": "eyJ0eXAi...",
    "refreshToken": "eyJ0eXAi..."
  },
  "message": "User registered successfully"
}
```

##### Login User
```
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "clx123456789",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "USER",
      "lastLogin": "2025-01-26T10:00:00.000Z"
    },
    "accessToken": "eyJ0eXAi...",
    "refreshToken": "eyJ0eXAi..."
  },
  "message": "Login successful"
}
```

##### Refresh Token
```
POST /api/auth/refresh
```

**Request (Cookie or Header):**
- Cookie: `refreshToken=eyJ0eXAi...`
- Header: `Authorization: Bearer <refresh-token>`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJ0eXAi...",
    "refreshToken": "eyJ0eXAi..."
  }
}
```

##### Get Current User
```
GET /api/auth/me
```

**Headers:**
```
Authorization: Bearer <access-token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "clx123456789",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "USER",
      "profile": {
        "phone": "+94123456789",
        "city": "Colombo",
        "district": "Colombo"
      }
    }
  }
}
```

##### Logout
```
POST /api/auth/logout
```

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Admin Authentication (Sessions)

Admin panel uses traditional server-side sessions for enhanced security.

#### Admin Login
```
GET /admin/login
POST /admin/auth/login
```

**POST Request Body:**
```
email=admin@nysc.lk&password=AdminPass123!&_csrf=<csrf-token>
```

**Success Response:** Redirect to `/admin/dashboard`
**Error Response:** Render login page with error message

## API Endpoints

### Public Endpoints

These endpoints are accessible without authentication.

#### Get Public Content
```
GET /api/public/news
GET /api/public/events
GET /api/public/programs
```

**Response Format:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx123456789",
      "title": "NYSC Launches New Training Program",
      "excerpt": "A comprehensive training program for youth development...",
      "publishedAt": "2025-01-26T10:00:00.000Z",
      "category": "Training",
      "featured": true
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

#### Get Content by ID
```
GET /api/public/news/:id
GET /api/public/events/:id
GET /api/public/programs/:id
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "clx123456789",
    "title": "NYSC Launches New Training Program",
    "content": "Full content of the article...",
    "excerpt": "A comprehensive training program...",
    "publishedAt": "2025-01-26T10:00:00.000Z",
    "category": "Training",
    "tags": ["training", "youth", "development"],
    "author": {
      "name": "Admin User",
      "role": "Content Manager"
    },
    "featured": true,
    "views": 245
  }
}
```

### User Management (Protected)

#### Get Users
```
GET /api/users
```

**Required Role:** ADMIN, SUPER_ADMIN

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)
- `search` (string): Search term
- `role` (string): Filter by role
- `isActive` (boolean): Filter by active status

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx123456789",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "USER",
      "isActive": true,
      "lastLogin": "2025-01-26T10:00:00.000Z",
      "createdAt": "2025-01-20T08:00:00.000Z",
      "_count": {
        "activities": 15
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 85,
    "pages": 5
  }
}
```

#### Get User by ID
```
GET /api/users/:id
```

**Required Role:** ADMIN, SUPER_ADMIN

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "clx123456789",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "USER",
    "isActive": true,
    "emailVerified": true,
    "lastLogin": "2025-01-26T10:00:00.000Z",
    "createdAt": "2025-01-20T08:00:00.000Z",
    "profile": {
      "phone": "+94123456789",
      "address": "123 Main St",
      "city": "Colombo",
      "district": "Colombo"
    },
    "activities": [
      {
        "id": "clx987654321",
        "action": "LOGIN",
        "createdAt": "2025-01-26T10:00:00.000Z",
        "ipAddress": "192.168.1.1"
      }
    ]
  }
}
```

#### Create User
```
POST /api/users
```

**Required Role:** ADMIN, SUPER_ADMIN

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "password": "SecurePass123!",
  "firstName": "Jane",
  "lastName": "Smith",
  "role": "EDITOR"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "clx123456790",
      "email": "newuser@example.com",
      "firstName": "Jane",
      "lastName": "Smith",
      "role": "EDITOR",
      "isActive": true,
      "createdAt": "2025-01-26T11:00:00.000Z"
    }
  },
  "message": "User created successfully"
}
```

#### Update User
```
PUT /api/users/:id
```

**Required Role:** ADMIN, SUPER_ADMIN

**Request Body:**
```json
{
  "firstName": "John Updated",
  "lastName": "Doe Updated",
  "role": "MODERATOR",
  "isActive": false
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "clx123456789",
      "email": "user@example.com",
      "firstName": "John Updated",
      "lastName": "Doe Updated",
      "role": "MODERATOR",
      "isActive": false,
      "updatedAt": "2025-01-26T12:00:00.000Z"
    }
  },
  "message": "User updated successfully"
}
```

#### Delete User
```
DELETE /api/users/:id
```

**Required Role:** ADMIN, SUPER_ADMIN

**Response (200):**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

### Content Management

#### News Articles

##### Get News Articles
```
GET /api/news
```

**Required Role:** EDITOR, MODERATOR, ADMIN, SUPER_ADMIN

**Query Parameters:**
- `page` (number): Page number
- `limit` (number): Items per page
- `category` (string): Filter by category
- `status` (string): draft, published, archived
- `search` (string): Search in title/content

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx123456789",
      "title": "NYSC Training Program Launch",
      "excerpt": "New training program for youth...",
      "content": "Full article content...",
      "status": "published",
      "category": "Training",
      "tags": ["training", "youth"],
      "featured": true,
      "publishedAt": "2025-01-26T10:00:00.000Z",
      "author": {
        "id": "clx987654321",
        "name": "Admin User"
      },
      "createdAt": "2025-01-25T15:00:00.000Z",
      "updatedAt": "2025-01-26T09:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "pages": 3
  }
}
```

##### Create News Article
```
POST /api/news
```

**Required Role:** EDITOR, MODERATOR, ADMIN, SUPER_ADMIN

**Request Body:**
```json
{
  "title": "New NYSC Initiative",
  "content": "Full article content here...",
  "excerpt": "Brief description...",
  "category": "News",
  "tags": ["news", "initiative"],
  "status": "draft",
  "featured": false,
  "publishedAt": "2025-01-27T10:00:00.000Z"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "article": {
      "id": "clx123456790",
      "title": "New NYSC Initiative",
      "slug": "new-nysc-initiative",
      "content": "Full article content here...",
      "excerpt": "Brief description...",
      "status": "draft",
      "category": "News",
      "authorId": "clx987654321",
      "createdAt": "2025-01-26T12:00:00.000Z"
    }
  },
  "message": "Article created successfully"
}
```

##### Update News Article
```
PUT /api/news/:id
```

**Required Role:** Own content (EDITOR) or Any content (MODERATOR, ADMIN, SUPER_ADMIN)

**Request Body:**
```json
{
  "title": "Updated Article Title",
  "content": "Updated content...",
  "status": "published"
}
```

#### Events

Similar CRUD operations as News Articles with additional fields:

**Additional Event Fields:**
```json
{
  "eventDate": "2025-02-15T10:00:00.000Z",
  "endDate": "2025-02-15T16:00:00.000Z",
  "location": "NYSC Headquarters",
  "capacity": 100,
  "registrationRequired": true,
  "registrationDeadline": "2025-02-10T23:59:59.000Z"
}
```

#### Programs

Similar CRUD operations with program-specific fields:

**Additional Program Fields:**
```json
{
  "duration": "6 months",
  "eligibility": "Age 18-25",
  "applicationDeadline": "2025-03-01T23:59:59.000Z",
  "maxParticipants": 50,
  "currentParticipants": 25,
  "fee": 25000.00,
  "currency": "LKR"
}
```

### File Upload

#### Upload File
```
POST /api/upload
```

**Required Role:** EDITOR, MODERATOR, ADMIN, SUPER_ADMIN

**Request:** Multipart form data
- `file`: File to upload
- `type`: image, document, video
- `description`: Optional description

**Response (200):**
```json
{
  "success": true,
  "data": {
    "file": {
      "id": "clx123456789",
      "originalName": "document.pdf",
      "fileName": "1706260800000_document.pdf",
      "mimeType": "application/pdf",
      "size": 1024000,
      "url": "/uploads/documents/1706260800000_document.pdf",
      "type": "document",
      "uploadedBy": "clx987654321",
      "createdAt": "2025-01-26T12:00:00.000Z"
    }
  },
  "message": "File uploaded successfully"
}
```

### Reports & Analytics

#### Get Statistics
```
GET /api/reports/stats
```

**Required Role:** MODERATOR, ADMIN, SUPER_ADMIN

**Query Parameters:**
- `period` (string): day, week, month, year
- `startDate` (string): ISO date string
- `endDate` (string): ISO date string

**Response (200):**
```json
{
  "success": true,
  "data": {
    "users": {
      "total": 1250,
      "active": 980,
      "new": 45,
      "growth": 3.6
    },
    "content": {
      "articles": 156,
      "events": 23,
      "programs": 12
    },
    "engagement": {
      "pageViews": 15420,
      "sessions": 3240,
      "averageSessionDuration": 285
    },
    "topContent": [
      {
        "id": "clx123456789",
        "title": "Popular Article",
        "type": "news",
        "views": 1250
      }
    ]
  }
}
```

#### Export Data
```
GET /api/reports/export
```

**Required Role:** MODERATOR, ADMIN, SUPER_ADMIN

**Query Parameters:**
- `type` (string): users, content, activities
- `format` (string): csv, json, xlsx
- `startDate` (string): ISO date string
- `endDate` (string): ISO date string

**Response:** File download with appropriate Content-Type

## Admin Routes (Server-Side Rendered)

### Authentication

#### Admin Login Page
```
GET /admin/login
```

**Response:** HTML login form

#### Admin Login Process
```
POST /admin/auth/login
```

**Body:** Form data with CSRF token
**Success:** Redirect to `/admin/dashboard`
**Failure:** Render login with error

### Dashboard

#### Admin Dashboard
```
GET /admin/dashboard
```

**Required Role:** EDITOR, MODERATOR, ADMIN, SUPER_ADMIN

**Response:** HTML dashboard with statistics and quick actions

### User Management

#### User List
```
GET /admin/users
```

**Required Role:** ADMIN, SUPER_ADMIN

**Query Parameters:**
- `page` (number): Page number
- `search` (string): Search term
- `role` (string): Filter by role

**Response:** HTML user list with pagination

#### Create User Form
```
GET /admin/users/create
```

**Required Role:** ADMIN, SUPER_ADMIN

**Response:** HTML form for creating new user

#### Process User Creation
```
POST /admin/users
```

**Required Role:** ADMIN, SUPER_ADMIN

**Body:** Form data with CSRF token
**Success:** Redirect to `/admin/users`
**Failure:** Render form with validation errors

### Content Management

#### Content List
```
GET /admin/content/news
GET /admin/content/events
GET /admin/content/programs
```

**Required Role:** EDITOR, MODERATOR, ADMIN, SUPER_ADMIN

**Response:** HTML content list with management actions

### Settings

#### General Settings
```
GET /admin/settings/general
POST /admin/settings/general
```

**Required Role:** SUPER_ADMIN

**Response:** HTML settings form

## Error Responses

### Standard Error Format

All API endpoints return errors in this format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": ["Additional error details"]
  }
}
```

### Common HTTP Status Codes

- **200 OK**: Successful request
- **201 Created**: Resource created successfully
- **400 Bad Request**: Invalid request data
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **409 Conflict**: Resource already exists
- **422 Unprocessable Entity**: Validation errors
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Server error

### Error Codes

#### Authentication Errors
- `AUTH_REQUIRED`: Authentication required
- `AUTH_INVALID`: Invalid credentials
- `AUTH_EXPIRED`: Token expired
- `AUTH_FORBIDDEN`: Insufficient permissions

#### Validation Errors
- `VALIDATION_FAILED`: Request validation failed
- `EMAIL_INVALID`: Invalid email format
- `PASSWORD_WEAK`: Password doesn't meet requirements
- `EMAIL_EXISTS`: Email already registered

#### Resource Errors
- `USER_NOT_FOUND`: User not found
- `ARTICLE_NOT_FOUND`: Article not found
- `EVENT_NOT_FOUND`: Event not found

#### System Errors
- `INTERNAL_ERROR`: Internal server error
- `DATABASE_ERROR`: Database connection error
- `FILE_UPLOAD_ERROR`: File upload failed

## Rate Limiting

API endpoints are rate limited to prevent abuse:

### Rate Limits
- **Authentication endpoints**: 5 requests per 15 minutes per IP
- **General API**: 100 requests per hour per user
- **Admin panel**: 1000 requests per hour per session

### Rate Limit Headers

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1643184000
X-RateLimit-Window: 3600
```

## Pagination

List endpoints support pagination with these parameters:

### Query Parameters
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20, max: 100)

### Response Format
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## Search and Filtering

### Search Parameters
Most list endpoints support these search parameters:

- `search` (string): Full-text search
- `sort` (string): Sort field (e.g., 'createdAt', 'title')
- `order` (string): Sort direction ('asc', 'desc')
- `filter[field]` (string): Filter by specific field

### Example
```
GET /api/news?search=training&sort=publishedAt&order=desc&filter[category]=Training&page=1&limit=10
```

## Webhooks

### Webhook Events

The system can send webhook notifications for various events:

- `user.created`: New user registration
- `user.updated`: User profile updated
- `content.published`: Content published
- `content.updated`: Content updated

### Webhook Payload

```json
{
  "event": "user.created",
  "timestamp": "2025-01-26T12:00:00.000Z",
  "data": {
    "id": "clx123456789",
    "email": "user@example.com",
    "createdAt": "2025-01-26T12:00:00.000Z"
  }
}
```

## SDK and Libraries

### JavaScript SDK

```javascript
import { NYSCApi } from '@nysc/api-client';

const api = new NYSCApi({
  baseUrl: 'https://api.nysc.lk',
  apiKey: 'your-api-key'
});

// Get news articles
const news = await api.news.list({ page: 1, limit: 10 });

// Create user
const user = await api.users.create({
  email: 'user@example.com',
  password: 'SecurePass123!'
});
```

### curl Examples

#### Login
```bash
curl -X POST https://api.nysc.lk/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!"
  }'
```

#### Get Protected Resource
```bash
curl -X GET https://api.nysc.lk/api/users \
  -H "Authorization: Bearer your-access-token"
```

#### Upload File
```bash
curl -X POST https://api.nysc.lk/api/upload \
  -H "Authorization: Bearer your-access-token" \
  -F "file=@document.pdf" \
  -F "type=document"
```

## Testing

### Test Environment
- **Base URL**: `https://test-api.nysc.lk`
- **Admin URL**: `https://test-api.nysc.lk/admin`

### Test Accounts
```json
{
  "superAdmin": {
    "email": "superadmin@test.nysc.lk",
    "password": "TestPass123!"
  },
  "admin": {
    "email": "admin@test.nysc.lk", 
    "password": "TestPass123!"
  },
  "editor": {
    "email": "editor@test.nysc.lk",
    "password": "TestPass123!"
  },
  "user": {
    "email": "user@test.nysc.lk",
    "password": "TestPass123!"
  }
}
```

### Postman Collection

Download the Postman collection: `/docs/api/NYSC-API.postman_collection.json`

## Changelog

### Version 1.0.0 (2025-01-26)
- Initial API release
- User authentication and management
- Content management (news, events, programs)
- Admin panel integration
- File upload functionality
- Role-based access control

### Planned Features (v1.1.0)
- Real-time notifications
- Advanced search capabilities  
- Webhook support
- API versioning
- GraphQL endpoint
- Two-factor authentication

## Support

For API support and questions:

- **Documentation**: [https://docs.nysc.lk/api](https://docs.nysc.lk/api)
- **Status Page**: [https://status.nysc.lk](https://status.nysc.lk)
- **Email**: api-support@nysc.lk
- **Issue Tracker**: [https://github.com/nysc/website/issues](https://github.com/nysc/website/issues)

## License

This API is proprietary to the National Youth Services Council of Sri Lanka. Unauthorized access or distribution is prohibited.