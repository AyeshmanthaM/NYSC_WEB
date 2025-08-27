import swaggerJsdoc from 'swagger-jsdoc';
import { version } from '../../package.json';

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NYSC Sri Lanka API Documentation',
      version,
      description: `
        Complete API documentation for the National Youth Services Council (NYSC) of Sri Lanka backend system.
        
        This API provides endpoints for:
        - Public content access (news, events, programs)
        - User authentication and management
        - Admin panel functionality
        - Content management system
        
        ## Authentication
        
        The API uses two authentication methods:
        
        1. **Session-based** (for Admin Panel): Uses HTTP-only cookies with express-session
        2. **JWT** (for Public API - future implementation): Bearer token in Authorization header
        
        ## Rate Limiting
        
        All API endpoints are rate-limited to prevent abuse:
        - General API: 100 requests per 15 minutes
        - Authentication endpoints: 5 attempts per 15 minutes
        
        ## Response Format
        
        All responses follow a consistent format:
        \`\`\`json
        {
          "success": true,
          "data": { ... },
          "message": "Operation successful",
          "pagination": { ... } // if applicable
        }
        \`\`\`
      `,
      contact: {
        name: 'NYSC Sri Lanka Development Team',
        email: 'dev@nysc.lk',
        url: 'https://www.nysc.lk'
      },
      license: {
        name: 'Proprietary',
        url: '#'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server'
      },
      {
        url: 'https://staging-api.nysc.lk',
        description: 'Staging server'
      },
      {
        url: 'https://api.nysc.lk',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        sessionAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'connect.sid',
          description: 'Session-based authentication using HTTP-only cookies'
        },
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT authentication (future implementation)'
        }
      },
      schemas: {
        // Standard response wrapper
        SuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            data: {
              type: 'object',
              description: 'Response data'
            },
            message: {
              type: 'string',
              example: 'Operation successful'
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            error: {
              type: 'object',
              properties: {
                code: {
                  type: 'string',
                  example: 'VALIDATION_ERROR'
                },
                message: {
                  type: 'string',
                  example: 'Validation failed'
                },
                details: {
                  type: 'array',
                  items: {
                    type: 'object'
                  }
                }
              }
            }
          }
        },
        PaginationMeta: {
          type: 'object',
          properties: {
            page: {
              type: 'integer',
              example: 1
            },
            limit: {
              type: 'integer',
              example: 20
            },
            total: {
              type: 'integer',
              example: 100
            },
            totalPages: {
              type: 'integer',
              example: 5
            },
            hasNext: {
              type: 'boolean',
              example: true
            },
            hasPrev: {
              type: 'boolean',
              example: false
            }
          }
        },
        // User schemas
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'user@example.com'
            },
            firstName: {
              type: 'string',
              example: 'John'
            },
            lastName: {
              type: 'string',
              example: 'Doe'
            },
            role: {
              type: 'string',
              enum: ['USER', 'EDITOR', 'MODERATOR', 'ADMIN', 'SUPER_ADMIN'],
              example: 'USER'
            },
            isActive: {
              type: 'boolean',
              example: true
            },
            emailVerified: {
              type: 'boolean',
              example: false
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        UserInput: {
          type: 'object',
          required: ['email', 'password', 'firstName', 'lastName'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'newuser@example.com'
            },
            password: {
              type: 'string',
              format: 'password',
              minLength: 8,
              example: 'SecurePassword123!'
            },
            firstName: {
              type: 'string',
              example: 'Jane'
            },
            lastName: {
              type: 'string',
              example: 'Smith'
            },
            role: {
              type: 'string',
              enum: ['USER', 'EDITOR', 'MODERATOR', 'ADMIN', 'SUPER_ADMIN'],
              example: 'USER'
            }
          }
        },
        LoginInput: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'admin@nysc.lk'
            },
            password: {
              type: 'string',
              format: 'password',
              example: 'password123'
            }
          }
        },
        // Statistics schema
        DashboardStats: {
          type: 'object',
          properties: {
            totalUsers: {
              type: 'integer',
              example: 150
            },
            totalNews: {
              type: 'integer',
              example: 45
            },
            totalEvents: {
              type: 'integer',
              example: 23
            },
            totalPrograms: {
              type: 'integer',
              example: 12
            },
            recentActivity: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  action: { type: 'string' },
                  resource: { type: 'string' },
                  userId: { type: 'integer' },
                  timestamp: { type: 'string', format: 'date-time' }
                }
              }
            }
          }
        }
      },
      parameters: {
        pageParam: {
          name: 'page',
          in: 'query',
          description: 'Page number for pagination',
          schema: {
            type: 'integer',
            minimum: 1,
            default: 1
          }
        },
        limitParam: {
          name: 'limit',
          in: 'query',
          description: 'Number of items per page',
          schema: {
            type: 'integer',
            minimum: 1,
            maximum: 100,
            default: 20
          }
        },
        searchParam: {
          name: 'search',
          in: 'query',
          description: 'Search query string',
          schema: {
            type: 'string'
          }
        },
        sortParam: {
          name: 'sort',
          in: 'query',
          description: 'Sort field and direction (e.g., "createdAt:desc")',
          schema: {
            type: 'string',
            example: 'createdAt:desc'
          }
        },
        userIdParam: {
          name: 'id',
          in: 'path',
          required: true,
          description: 'User ID',
          schema: {
            type: 'integer',
            minimum: 1
          }
        }
      },
      responses: {
        UnauthorizedError: {
          description: 'Authentication required',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              },
              example: {
                success: false,
                error: {
                  code: 'UNAUTHORIZED',
                  message: 'Authentication required'
                }
              }
            }
          }
        },
        ForbiddenError: {
          description: 'Insufficient permissions',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              },
              example: {
                success: false,
                error: {
                  code: 'FORBIDDEN',
                  message: 'Insufficient permissions'
                }
              }
            }
          }
        },
        NotFoundError: {
          description: 'Resource not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              },
              example: {
                success: false,
                error: {
                  code: 'NOT_FOUND',
                  message: 'Resource not found'
                }
              }
            }
          }
        },
        ValidationError: {
          description: 'Validation failed',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              },
              example: {
                success: false,
                error: {
                  code: 'VALIDATION_ERROR',
                  message: 'Validation failed',
                  details: [
                    {
                      field: 'email',
                      message: 'Invalid email format'
                    }
                  ]
                }
              }
            }
          }
        },
        ServerError: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              },
              example: {
                success: false,
                error: {
                  code: 'INTERNAL_ERROR',
                  message: 'An unexpected error occurred'
                }
              }
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Public API',
        description: 'Public API endpoints'
      },
      {
        name: 'Authentication',
        description: 'Authentication and session management'
      },
      {
        name: 'Users',
        description: 'User management (Admin only)'
      },
      {
        name: 'Dashboard',
        description: 'Dashboard and statistics'
      },
      {
        name: 'Health',
        description: 'System health and status'
      }
    ]
  },
  apis: [
    './src/routes/**/*.ts',
    './src/controllers/**/*.ts',
    './src/app.ts'
  ]
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;