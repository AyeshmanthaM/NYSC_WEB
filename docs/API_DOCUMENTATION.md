# NYSC Website API Documentation

## Overview
RESTful API documentation for the National Youth Services Council website backend services.

## Base Configuration
- **Base URL**: `http://localhost:3001/api/v1` (development)
- **Production URL**: `https://api.nysc.lk/v1`
- **Authentication**: JWT Bearer tokens
- **Content-Type**: `application/json`
- **Rate Limiting**: 100 requests per minute per IP

## Authentication

### Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "string",
      "email": "string",
      "role": "string",
      "profile": {}
    },
    "token": "string",
    "refreshToken": "string"
  }
}
```

### Refresh Token
```http
POST /auth/refresh
```

**Headers:**
```
Authorization: Bearer <refresh_token>
```

## News Management

### Get All News
```http
GET /news
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10, max: 100)
- `category` (string): Filter by category
- `language` (string): Language code (si, ta, en)
- `status` (string): published, draft, archived
- `search` (string): Search in title and content

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "string",
        "title": {
          "si": "string",
          "ta": "string", 
          "en": "string"
        },
        "slug": "string",
        "excerpt": {
          "si": "string",
          "ta": "string",
          "en": "string"
        },
        "content": {
          "si": "string",
          "ta": "string",
          "en": "string"
        },
        "category": "string",
        "featuredImage": "string",
        "status": "string",
        "publishedAt": "ISO8601",
        "createdAt": "ISO8601",
        "updatedAt": "ISO8601",
        "author": {
          "id": "string",
          "name": "string"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "pages": 10
    }
  }
}
```

### Get Single News Article
```http
GET /news/:id
```

**Response:** Same as single news item above

### Create News Article
```http
POST /news
```

**Authentication Required**
**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "title": {
    "si": "string",
    "ta": "string",
    "en": "string"
  },
  "excerpt": {
    "si": "string", 
    "ta": "string",
    "en": "string"
  },
  "content": {
    "si": "string",
    "ta": "string", 
    "en": "string"
  },
  "category": "string",
  "featuredImage": "string",
  "status": "draft|published",
  "publishedAt": "ISO8601"
}
```

### Update News Article
```http
PUT /news/:id
```

**Authentication Required**
Same request body as create.

### Delete News Article
```http
DELETE /news/:id
```

**Authentication Required**

## Programs Management

### Get All Programs
```http
GET /programs
```

**Query Parameters:**
- `page` (number): Page number
- `limit` (number): Items per page
- `type` (string): sports, cultural, vocational, international
- `status` (string): active, inactive, upcoming
- `language` (string): Language code

### Get Single Program
```http
GET /programs/:id
```

### Create Program
```http
POST /programs
```

**Authentication Required**

### Update Program
```http
PUT /programs/:id
```

**Authentication Required**

### Delete Program
```http
DELETE /programs/:id
```

**Authentication Required**

## User Management

### Get User Profile
```http
GET /users/profile
```

**Authentication Required**

### Update User Profile
```http
PUT /users/profile
```

**Authentication Required**

### Youth Registration
```http
POST /users/register/youth
```

**Request Body:**
```json
{
  "personalInfo": {
    "fullName": {
      "si": "string",
      "ta": "string", 
      "en": "string"
    },
    "nic": "string",
    "dateOfBirth": "YYYY-MM-DD",
    "gender": "male|female|other",
    "email": "string",
    "phone": "string"
  },
  "address": {
    "street": "string",
    "city": "string",
    "district": "string",
    "province": "string",
    "postalCode": "string"
  },
  "preferences": {
    "language": "si|ta|en",
    "interests": ["string"],
    "programs": ["string"]
  }
}
```

## Club Management

### Register Youth Club
```http
POST /clubs/register
```

**Request Body:**
```json
{
  "clubInfo": {
    "name": {
      "si": "string",
      "ta": "string",
      "en": "string" 
    },
    "type": "sports|cultural|mixed",
    "category": "string",
    "description": {
      "si": "string",
      "ta": "string",
      "en": "string"
    }
  },
  "location": {
    "address": "string",
    "district": "string",
    "province": "string",
    "coordinates": {
      "lat": "number",
      "lng": "number"
    }
  },
  "contact": {
    "email": "string",
    "phone": "string",
    "website": "string"
  },
  "representative": {
    "name": "string",
    "position": "string",
    "email": "string",
    "phone": "string"
  }
}
```

### Get Clubs Directory
```http
GET /clubs
```

**Query Parameters:**
- `district` (string): Filter by district
- `type` (string): sports, cultural, mixed
- `category` (string): Specific sport/activity category
- `status` (string): active, pending, suspended

## Events Management

### Get Events
```http
GET /events
```

**Query Parameters:**
- `type` (string): sports, cultural, training, awards
- `startDate` (string): ISO8601 date
- `endDate` (string): ISO8601 date
- `district` (string): Filter by district
- `status` (string): upcoming, ongoing, completed, cancelled

### Create Event
```http
POST /events
```

**Authentication Required**

### Register for Event
```http
POST /events/:id/register
```

**Authentication Required**

## File Upload

### Upload File
```http
POST /upload
```

**Content-Type:** `multipart/form-data`
**Authentication Required**

**Form Data:**
- `file`: File to upload
- `type`: image|document|video
- `category`: news|program|profile|general

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "string",
    "filename": "string",
    "size": "number",
    "mimeType": "string"
  }
}
```

## Search

### Global Search
```http
GET /search
```

**Query Parameters:**
- `q` (string): Search query
- `type` (string): news|programs|clubs|events
- `language` (string): si|ta|en
- `limit` (number): Results limit

## Statistics

### Public Statistics
```http
GET /stats/public
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalYouthMembers": "number",
    "totalClubs": "number", 
    "totalPrograms": "number",
    "totalEvents": "number",
    "districtBreakdown": {
      "colombo": "number",
      "gampaha": "number"
    }
  }
}
```

## Error Responses

All API endpoints return consistent error responses:

```json
{
  "success": false,
  "error": {
    "code": "string",
    "message": "string",
    "details": "object"
  }
}
```

**Common Error Codes:**
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `429` - Rate Limit Exceeded
- `500` - Internal Server Error

## Rate Limiting

Rate limits are applied per IP address:
- **Public endpoints**: 100 requests per minute
- **Authenticated endpoints**: 1000 requests per minute
- **File upload**: 10 requests per minute

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## Webhooks

### Event Types
- `user.registered`
- `club.registered`
- `news.published`
- `event.created`

### Webhook Format
```json
{
  "id": "string",
  "type": "string",
  "timestamp": "ISO8601",
  "data": {}
}
```

## Development Notes

### Testing
- Use Postman collection: `/tests/api/NYSC-API.postman_collection.json`
- Automated tests: `pnpm --filter backend test:api`

### Database Migrations
- Run migrations: `pnpm --filter backend db:migrate`
- Reset database: `pnpm --filter backend db:reset`

### Logging
- All API requests are logged with request ID
- Error tracking via Sentry integration
- Performance monitoring enabled

### Security Features
- CORS enabled for specified domains
- Request sanitization and validation
- SQL injection protection via Prisma ORM
- XSS protection headers
- CSRF protection for state-changing operations

This API documentation is automatically generated and should be kept in sync with the actual API implementation.