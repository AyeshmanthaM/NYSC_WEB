# Swagger UI API Testing Guide

## Accessing Swagger UI

Once the backend server is running, you can access the Swagger UI documentation at:

**URL:** http://localhost:5000/api-docs

## Features Available

1. **Interactive API Documentation**: Browse all available endpoints organized by categories
2. **Try It Out**: Test endpoints directly from the browser
3. **Request/Response Examples**: See example payloads and responses
4. **Authentication Support**: Test both public and protected endpoints
5. **Schema Definitions**: View data models and response formats

## API Categories

### 1. Public API
- `GET /api` - API information

### 2. Health
- `GET /health` - System health check

### 3. Authentication
- `POST /admin/api/auth/login` - Admin login
- `POST /admin/api/auth/logout` - Admin logout  
- `POST /admin/api/auth/forgot-password` - Password reset
- `GET /admin/api/auth/status` - Session status
- `POST /admin/api/auth/extend-session` - Extend session
- `GET /admin/api/check-auth` - Check authentication

### 4. Dashboard
- `GET /admin/api/stats` - Dashboard statistics (requires authentication)

### 5. Users (Admin Only)
- `GET /admin/api/users` - List users with pagination
- `POST /admin/api/users` - Create new user
- `GET /admin/api/users/{id}` - Get user details
- `POST /admin/api/users/{id}` - Update user
- `POST /admin/api/users/{id}/delete` - Delete user
- `POST /admin/api/users/{id}/password` - Change password
- `POST /admin/api/users/bulk` - Bulk operations
- `GET /admin/api/users/api/search` - Search users
- `GET /admin/api/users/export` - Export to CSV

### 6. Public Directors
- `GET /api/public/directors/chairman` - Get Chairman information
- `GET /api/public/directors/board-members` - Get Board Members information
- `GET /api/public/directors/directors` - Get Directors information
- `GET /api/public/directors/deputy-directors` - Get Deputy Directors information
- `GET /api/public/directors/assistant-directors` - Get Assistant Directors information
- `GET /api/public/directors/provincial-directors` - Get Provincial Directors information
- `GET /api/public/directors/provincial-assistants` - Get Provincial Assistant Directors information
- `GET /api/public/directors/overview` - Get Directors overview with statistics

### 7. Directors Management (Admin Only)
- `GET /admin/directors/chairman` - Get Chairman (admin view)
- `PUT /admin/directors/chairman` - Update Chairman information
- `GET /admin/directors/board-members` - List Board Members with pagination
- `GET /admin/directors/board-members/{id}` - Get specific Board Member
- `POST /admin/directors/board-members` - Create new Board Member
- `PUT /admin/directors/board-members/{id}` - Update Board Member
- `DELETE /admin/directors/board-members/{id}` - Delete Board Member
- `GET /admin/directors/directors` - List Directors with pagination
- `GET /admin/directors/directors/{id}` - Get specific Director
- `POST /admin/directors/directors` - Create new Director
- `PUT /admin/directors/directors/{id}` - Update Director
- `DELETE /admin/directors/directors/{id}` - Delete Director
- `GET /admin/directors/deputy-directors` - List Deputy Directors with pagination
- `GET /admin/directors/deputy-directors/{id}` - Get specific Deputy Director
- `POST /admin/directors/deputy-directors` - Create new Deputy Director
- `PUT /admin/directors/deputy-directors/{id}` - Update Deputy Director
- `DELETE /admin/directors/deputy-directors/{id}` - Delete Deputy Director
- `GET /admin/directors/assistant-directors` - List Assistant Directors with pagination
- `GET /admin/directors/assistant-directors/{id}` - Get specific Assistant Director
- `POST /admin/directors/assistant-directors` - Create new Assistant Director
- `PUT /admin/directors/assistant-directors/{id}` - Update Assistant Director
- `DELETE /admin/directors/assistant-directors/{id}` - Delete Assistant Director
- `GET /admin/directors/provincial-directors` - List Provincial Directors with pagination
- `GET /admin/directors/provincial-directors/{id}` - Get specific Provincial Director
- `POST /admin/directors/provincial-directors` - Create new Provincial Director
- `PUT /admin/directors/provincial-directors/{id}` - Update Provincial Director
- `DELETE /admin/directors/provincial-directors/{id}` - Delete Provincial Director
- `GET /admin/directors/provincial-assistants` - List Provincial Assistants with pagination
- `GET /admin/directors/provincial-assistants/{id}` - Get specific Provincial Assistant
- `POST /admin/directors/provincial-assistants` - Create new Provincial Assistant
- `PUT /admin/directors/provincial-assistants/{id}` - Update Provincial Assistant
- `DELETE /admin/directors/provincial-assistants/{id}` - Delete Provincial Assistant
- `POST /admin/directors/{type}/{id}/image` - Upload director image
- `DELETE /admin/directors/{type}/{id}/image` - Delete director image

## Testing Protected Endpoints

For endpoints that require authentication:

1. **Login First**: Use the `/admin/api/auth/login` endpoint with valid credentials
2. **Session Cookie**: The session cookie will be automatically stored
3. **Test Protected Endpoints**: You can now test authenticated endpoints

### Test Credentials (Development Only)
```json
{
  "email": "admin@nysc.lk",
  "password": "Admin@123"
}
```

## Request Examples

### Login Request
```json
{
  "email": "admin@nysc.lk",
  "password": "Admin@123"
}
```

### Create User Request
```json
{
  "email": "newuser@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "role": "USER"
}
```

### Bulk Action Request
```json
{
  "action": "activate",
  "userIds": [1, 2, 3]
}
```

### Create Board Member Request
```json
{
  "name": "Dr. Jane Smith",
  "position": "Board Member - Finance Specialist",
  "description": "Experienced financial advisor with 20+ years in corporate finance and strategic planning.",
  "email": "jane.smith@nysc.lk",
  "phone": "+94112345679",
  "linkedin": "https://linkedin.com/in/janesmith",
  "badge": "Member"
}
```

### Update Chairman Request
```json
{
  "name": "Dr. Mahinda Rajapaksa",
  "title": "Chairman / Director General",
  "description": "Visionary leader with extensive experience in youth development and national service programs.",
  "email": "chairman@nysc.lk",
  "phone": "+94112345678",
  "linkedin": "https://linkedin.com/in/chairman",
  "tenure": "2020 - Present",
  "qualifications": [
    "PhD in Public Administration",
    "MBA in Strategic Management",
    "Certificate in Youth Development"
  ],
  "achievements": [
    "Established 50+ youth centers nationwide",
    "Launched digital transformation initiatives",
    "Increased youth participation by 300%"
  ],
  "vision": "To create a vibrant ecosystem where every young person in Sri Lanka has access to opportunities for growth, skill development, and meaningful contribution to national development.",
  "keyInitiatives": [
    "National Youth Skills Development Program",
    "Digital Innovation Hubs in Rural Areas",
    "International Youth Exchange Programs"
  ]
}
```

### Create Provincial Director Request
```json
{
  "name": "Mr. Sunil Fernando",
  "position": "Provincial Director - Western Province",
  "province": "Western",
  "headquarters": "Colombo",
  "districts": ["Colombo", "Gampaha", "Kalutara"],
  "population": "5.8M",
  "centers": 45,
  "description": "Dedicated provincial leader with expertise in program management and community engagement.",
  "email": "sunil.fernando@nysc.lk",
  "phone": "+94112234567",
  "achievements": [
    "Established 15 new youth centers",
    "Launched province-wide skills training program",
    "Achieved 95% program completion rate"
  ]
}
```

## Response Format

All API responses follow this format:

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful",
  "pagination": { ... }  // if applicable
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description",
    "details": [ ... ]  // if validation errors
  }
}
```

## Tips for Testing

1. **Use "Try it out"**: Click this button on any endpoint to enable testing
2. **Check Examples**: Review the example values provided for each field
3. **Monitor Network**: Open browser DevTools to see actual requests/responses
4. **Session Persistence**: The `persistAuthorization` option keeps your session active
5. **Filter Endpoints**: Use the filter box to quickly find specific endpoints

## Troubleshooting

### Cannot Access Swagger UI
- Ensure the backend server is running: `npm run dev`
- Check the port: Default is 5000
- Clear browser cache if styles don't load properly

### Authentication Issues
- Session expires after 24 hours
- Use `/admin/api/auth/extend-session` to extend
- Check `/admin/api/auth/status` to verify session

### CORS Errors
- Swagger UI runs on the same origin, so CORS shouldn't be an issue
- If testing from external tools, ensure proper headers are set

## Development vs Production

- **Development**: Full Swagger UI available with all testing features
- **Production**: Consider disabling or restricting access to `/api-docs`

## Additional Tools

For more advanced API testing, consider using:
- **Postman**: Import the OpenAPI spec from Swagger
- **cURL**: Command-line testing
- **Thunder Client**: VS Code extension
- **Insomnia**: REST client application