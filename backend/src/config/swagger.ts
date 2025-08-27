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
        },
        // Directors schemas
        ContactInfo: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email',
              pattern: '^[a-zA-Z0-9._%+-]+@nysc\\.lk$',
              example: 'director@nysc.lk'
            },
            phone: {
              type: 'string',
              pattern: '^\\+94 \\d{2} \\d{3} \\d{4}$',
              example: '+94 11 234 5678'
            },
            linkedin: {
              type: 'string',
              format: 'uri',
              example: 'https://linkedin.com/in/profile'
            }
          }
        },
        Chairman: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Hon. Pavithra Wanniarachchi'
            },
            title: {
              type: 'string',
              example: 'Chairman / Director General'
            },
            description: {
              type: 'string',
              example: 'Visionary leader with over 25 years of experience in youth development.'
            },
            image: {
              type: 'string',
              example: '/images/board/chairman.jpg'
            },
            contact: {
              $ref: '#/components/schemas/ContactInfo'
            },
            tenure: {
              type: 'string',
              example: '2021 - Present'
            },
            qualifications: {
              type: 'array',
              items: {
                type: 'string'
              },
              example: [
                'Master of Public Administration - University of Colombo',
                'Bachelor of Arts - University of Peradeniya'
              ]
            },
            achievements: {
              type: 'array',
              items: {
                type: 'string'
              },
              example: [
                'Established 50+ new youth centers across Sri Lanka',
                'Launched National Youth Skills Development Program'
              ]
            },
            vision: {
              type: 'string',
              example: 'To create a vibrant ecosystem where every young person in Sri Lanka has access to opportunities.'
            },
            keyInitiatives: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  description: { type: 'string' }
                }
              }
            }
          }
        },
        BoardMember: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            name: {
              type: 'string',
              example: 'Dr. John Doe'
            },
            position: {
              type: 'string',
              example: 'Board Member - Education Specialist'
            },
            description: {
              type: 'string',
              example: 'Distinguished educator with 30 years of experience.'
            },
            image: {
              type: 'string',
              example: '/images/board/member1.jpg'
            },
            contact: {
              $ref: '#/components/schemas/ContactInfo'
            },
            badge: {
              type: 'string',
              enum: ['Chairman', 'Member', 'Secretary', 'Treasurer', 'Vice Chairman'],
              example: 'Member'
            }
          }
        },
        Director: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            name: {
              type: 'string',
              example: 'Dr. Manjula Perera'
            },
            position: {
              type: 'string',
              example: 'Director - Programs & Development'
            },
            department: {
              type: 'string',
              example: 'Programs & Development'
            },
            description: {
              type: 'string',
              example: 'Strategic leader overseeing all youth development programs.'
            },
            image: {
              type: 'string',
              example: '/images/directors/director1.jpg'
            },
            contact: {
              $ref: '#/components/schemas/ContactInfo'
            },
            specialization: {
              type: 'string',
              example: 'Youth Development'
            },
            experience: {
              type: 'string',
              example: '18 years'
            },
            achievements: {
              type: 'array',
              items: {
                type: 'string'
              }
            }
          }
        },
        DeputyDirector: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            name: {
              type: 'string',
              example: 'Mrs. Chamari Jayasekara'
            },
            position: {
              type: 'string',
              example: 'Deputy Director - Programs'
            },
            department: {
              type: 'string',
              example: 'Programs & Development'
            },
            description: {
              type: 'string',
              example: 'Program management specialist ensuring effective implementation.'
            },
            contact: {
              type: 'object',
              properties: {
                email: { type: 'string', format: 'email' },
                phone: { type: 'string' }
              }
            },
            specialization: {
              type: 'string',
              example: 'Program Management'
            },
            provinces: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['Western', 'Central', 'Southern', 'Northern', 'Eastern', 'North Western', 'North Central', 'Uva', 'Sabaragamuwa']
              }
            }
          }
        },
        AssistantDirector: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            name: {
              type: 'string',
              example: 'Ms. Ruvini Jayasinghe'
            },
            position: {
              type: 'string',
              example: 'Assistant Director - Youth Programs'
            },
            department: {
              type: 'string',
              example: 'Programs & Development'
            },
            region: {
              type: 'string',
              example: 'Western Province'
            },
            specialization: {
              type: 'string',
              example: 'Program Coordination'
            },
            contact: {
              type: 'object',
              properties: {
                email: { type: 'string', format: 'email' },
                phone: { type: 'string' }
              }
            }
          }
        },
        ProvincialDirector: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            name: {
              type: 'string',
              example: 'Mr. Ajith Ratnayake'
            },
            position: {
              type: 'string',
              example: 'Provincial Director - Western Province'
            },
            province: {
              type: 'string',
              example: 'Western'
            },
            headquarters: {
              type: 'string',
              example: 'Colombo'
            },
            districts: {
              type: 'array',
              items: {
                type: 'string'
              },
              example: ['Colombo', 'Gampaha', 'Kalutara']
            },
            population: {
              type: 'string',
              example: '5.8M'
            },
            centers: {
              type: 'integer',
              example: 45
            },
            description: {
              type: 'string',
              example: 'Leading youth development initiatives in the most populous province.'
            },
            contact: {
              type: 'object',
              properties: {
                email: { type: 'string', format: 'email' },
                phone: { type: 'string' }
              }
            },
            achievements: {
              type: 'array',
              items: {
                type: 'string'
              }
            }
          }
        },
        ProvincialAssistant: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            name: {
              type: 'string',
              example: 'Ms. Rashika Perera'
            },
            position: {
              type: 'string',
              example: 'Provincial Assistant Director'
            },
            province: {
              type: 'string',
              example: 'Western'
            },
            district: {
              type: 'string',
              example: 'Colombo'
            },
            headquarters: {
              type: 'string',
              example: 'Colombo'
            },
            population: {
              type: 'string',
              example: '2.3M'
            },
            centers: {
              type: 'integer',
              example: 18
            },
            contact: {
              type: 'object',
              properties: {
                email: { type: 'string', format: 'email' },
                phone: { type: 'string' }
              }
            },
            specialization: {
              type: 'string',
              example: 'Urban Programs'
            }
          }
        },
        DirectorsOverview: {
          type: 'object',
          properties: {
            organizationStats: {
              type: 'object',
              properties: {
                totalLeadership: { type: 'integer', example: 83 },
                provinces: { type: 'integer', example: 9 },
                districts: { type: 'integer', example: 25 },
                combinedExperience: { type: 'string', example: '500+' }
              }
            },
            hierarchy: {
              type: 'object',
              properties: {
                boardMembers: { type: 'integer' },
                chairman: { type: 'integer' },
                directors: { type: 'integer' },
                deputyDirectors: { type: 'integer' },
                assistantDirectors: { type: 'integer' },
                provincialDirectors: { type: 'integer' },
                provincialAssistants: { type: 'integer' },
                totalLevels: { type: 'integer', example: 6 }
              }
            },
            coverage: {
              type: 'object',
              properties: {
                nationalReach: { type: 'boolean', example: true },
                provincialCoverage: { type: 'string', example: '100%' },
                districtCoverage: { type: 'string', example: '100%' },
                youthCenters: { type: 'string', example: '240+' },
                annualBeneficiaries: { type: 'string', example: '500K+' }
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
        },

        // Error Response Schemas
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            error: {
              type: 'string',
              example: 'Resource not found'
            },
            message: {
              type: 'string',
              example: 'The requested resource could not be found'
            }
          }
        },

        ValidationErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            error: {
              type: 'string',
              example: 'Validation failed'
            },
            message: {
              type: 'string',
              example: 'Input validation failed'
            },
            details: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: {
                    type: 'string',
                    example: 'email'
                  },
                  message: {
                    type: 'string',
                    example: 'Invalid email format'
                  }
                }
              }
            }
          }
        },

        PaginationResponse: {
          type: 'object',
          properties: {
            page: {
              type: 'number',
              example: 1
            },
            limit: {
              type: 'number',
              example: 10
            },
            total: {
              type: 'number',
              example: 100
            },
            pages: {
              type: 'number',
              example: 10
            }
          }
        }
      }
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
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
        name: 'Directors',
        description: 'Directors and leadership management'
      },
      {
        name: 'Public Directors',
        description: 'Public access to directors information'
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