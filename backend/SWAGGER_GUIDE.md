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