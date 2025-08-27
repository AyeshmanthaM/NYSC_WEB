# Directors API Documentation

## Overview

The Directors API provides comprehensive access to NYSC leadership and organizational structure information. It includes both public endpoints for frontend consumption and administrative endpoints for managing director information.

## Base URLs
```
/api/public/directors    # Public read-only endpoints
/api/admin/directors     # Admin management endpoints (requires authentication)
```

## Response Format

All endpoints follow a consistent response format:

```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation successful"
}
```

Error responses:
```json
{
  "success": false,
  "error": "Error message",
  "message": "Operation failed"
}
```

# Public Endpoints (Read-Only)

## Endpoints

### 1. Get Chairman Information

**GET** `/api/public/directors/chairman`

Returns detailed information about the NYSC Chairman/Director General.

**Response:**
```json
{
  "success": true,
  "data": {
    "name": "Hon. Pavithra Wanniarachchi",
    "title": "Chairman / Director General",
    "description": "Visionary leader with over 25 years of experience in youth development and public administration. Former Cabinet Minister who has been instrumental in transforming youth services across Sri Lanka.",
    "image": "/images/board/chairman.jpg",
    "contact": {
      "email": "chairman@nysc.lk",
      "phone": "+94 11 234 5678",
      "linkedin": "#"
    },
    "tenure": "2021 - Present",
    "qualifications": [
      "Master of Public Administration - University of Colombo",
      "Bachelor of Arts - University of Peradeniya",
      "Diploma in Youth Development - International Youth Foundation"
    ],
    "achievements": [
      "Established 50+ new youth centers across Sri Lanka",
      "Launched National Youth Skills Development Program",
      "Secured international partnerships with 10+ countries",
      "Increased youth employment by 35% through vocational programs"
    ],
    "vision": "To create a vibrant ecosystem where every young person in Sri Lanka has access to opportunities for personal growth, skill development, and meaningful contribution to society.",
    "keyInitiatives": [
      {
        "title": "Digital Transformation",
        "description": "Modernizing NYSC services through digital platforms and online training programs"
      },
      {
        "title": "International Cooperation",
        "description": "Building partnerships with global youth organizations for knowledge exchange"
      },
      {
        "title": "Employment Generation",
        "description": "Creating pathways from training to employment through industry partnerships"
      },
      {
        "title": "Excellence Recognition",
        "description": "Establishing comprehensive youth award system to celebrate achievements"
      }
    ]
  }
}
```

### 2. Get Board of Members

**GET** `/api/public/directors/board-members`

Returns information about all board members.

**Response:**
```json
{
  "success": true,
  "data": {
    "boardMembers": [
      {
        "id": 1,
        "name": "Hon. Pavithra Wanniarachchi",
        "position": "Chairman",
        "description": "Former Cabinet Minister with extensive experience in youth development and public administration.",
        "image": "/images/board/chairman.jpg",
        "contact": {
          "email": "chairman@nysc.lk",
          "phone": "+94 11 234 5678",
          "linkedin": "#"
        },
        "badge": "Chairman"
      }
      // ... 7 more members
    ],
    "governance": {
      "monthlyMeetings": "Regular board meetings held on the first Tuesday of each month",
      "strategicPlanning": "Annual strategic review and five-year development planning",
      "publicEngagement": "Quarterly stakeholder meetings and community consultations"
    }
  }
}
```

### 3. Get Directors List

**GET** `/api/public/directors/directors`

Returns information about department directors.

**Response:**
```json
{
  "success": true,
  "data": {
    "directors": [
      {
        "id": 1,
        "name": "Dr. Manjula Perera",
        "position": "Director - Programs & Development",
        "department": "Programs & Development",
        "description": "Strategic leader overseeing all youth development programs, training initiatives, and capacity building projects across the nation.",
        "image": "/images/directors/director1.jpg",
        "contact": {
          "email": "manjula.p@nysc.lk",
          "phone": "+94 11 234 5690",
          "linkedin": "#"
        },
        "specialization": "Youth Development",
        "experience": "18 years",
        "achievements": [
          "Developed National Youth Skills Framework",
          "Launched 25+ vocational training programs",
          "Established international partnerships"
        ]
      }
      // ... 4 more directors
    ],
    "departmentStats": [
      {
        "department": "Programs & Development",
        "programs": 35,
        "beneficiaries": "50,000+"
      }
      // ... 4 more departments
    ],
    "leadership": {
      "philosophy": {
        "strategicVision": "Long-term planning with clear objectives and measurable outcomes for youth development",
        "excellenceCommitment": "Pursuing highest standards in all programs and services delivered to Sri Lankan youth",
        "nationalReach": "Ensuring equitable access to opportunities across all provinces and communities"
      }
    }
  }
}
```

### 4. Get Deputy Directors

**GET** `/api/public/directors/deputy-directors`

Returns information about deputy directors.

**Response:**
```json
{
  "success": true,
  "data": {
    "deputyDirectors": [
      {
        "id": 1,
        "name": "Mrs. Chamari Jayasekara",
        "position": "Deputy Director - Programs",
        "department": "Programs & Development",
        "description": "Program management specialist ensuring effective implementation of youth development initiatives across all provinces.",
        "contact": {
          "email": "chamari.j@nysc.lk",
          "phone": "+94 11 234 5700"
        },
        "specialization": "Program Management",
        "provinces": ["Western", "Central", "Southern"]
      }
      // ... 11 more deputy directors
    ],
    "departmentGroups": [
      {
        "title": "Program Delivery",
        "count": 4,
        "departments": ["Programs", "Sports", "Cultural", "Training"]
      },
      {
        "title": "Support Services", 
        "count": 4,
        "departments": ["Administration", "Finance", "IT", "Human Resources"]
      },
      {
        "title": "Strategic Functions",
        "count": 4,
        "departments": ["International", "Research", "Public Relations", "Quality"]
      }
    ],
    "organizationStats": {
      "totalDeputies": 12,
      "departments": 10,
      "provincesCovered": 9,
      "combinedExperience": "180+"
    }
  }
}
```

### 5. Get Assistant Directors

**GET** `/api/public/directors/assistant-directors`

Returns information about assistant directors.

**Response:**
```json
{
  "success": true,
  "data": {
    "assistantDirectors": [
      {
        "id": 1,
        "name": "Ms. Ruvini Jayasinghe",
        "position": "Assistant Director - Youth Programs",
        "department": "Programs & Development",
        "region": "Western Province",
        "specialization": "Program Coordination",
        "contact": {
          "email": "ruvini.j@nysc.lk",
          "phone": "+94 11 234 5720"
        }
      }
      // ... 24 more assistant directors
    ],
    "departmentGroups": {
      "Programs & Development": [
        // directors in this department
      ]
      // ... other departments
    },
    "operationalStats": {
      "totalAssistants": 25,
      "departments": 10,
      "regionalCoverage": 9,
      "dailyOperations": "100+"
    },
    "framework": {
      "dailyOperations": "Managing day-to-day activities and ensuring smooth program delivery",
      "qualityDelivery": "Ensuring high standards in all services provided to youth participants",
      "continuousImprovement": "Implementing feedback and innovation for enhanced program effectiveness",
      "teamCoordination": "Leading teams and coordinating with other departments for integrated service delivery"
    }
  }
}
```

### 6. Get Provincial Directors

**GET** `/api/public/directors/provincial-directors`

Returns information about provincial directors.

**Response:**
```json
{
  "success": true,
  "data": {
    "provincialDirectors": [
      {
        "id": 1,
        "name": "Mr. Ajith Ratnayake",
        "position": "Provincial Director - Western Province",
        "province": "Western Province",
        "headquarters": "Colombo",
        "districts": ["Colombo", "Gampaha", "Kalutara"],
        "population": "5.8M",
        "centers": 45,
        "description": "Leading youth development initiatives in the most populous province with focus on urban challenges and opportunities.",
        "contact": {
          "email": "ajith.r@nysc.lk",
          "phone": "+94 11 234 5750"
        },
        "achievements": [
          "Established 15 new youth centers",
          "90% employment rate for vocational graduates",
          "Launched digital skills programs"
        ]
      }
      // ... 8 more provincial directors
    ],
    "provinceStats": {
      "provincialDirectors": 9,
      "districtsCovered": 25,
      "youthCenters": "240+",
      "youthServed": "500K+"
    },
    "framework": {
      "regionalAdaptation": "Tailoring programs to meet specific regional needs and cultural contexts",
      "communityEngagement": "Building strong partnerships with local communities and stakeholders",
      "performanceExcellence": "Achieving consistent results through effective management and innovation",
      "impactMeasurement": "Monitoring and evaluating program effectiveness for continuous improvement"
    }
  }
}
```

### 7. Get Provincial Assistant Directors

**GET** `/api/public/directors/provincial-assistants`

Returns information about district-level assistant directors.

**Response:**
```json
{
  "success": true,
  "data": {
    "provincialAssistants": [
      {
        "id": 1,
        "name": "Ms. Rashika Perera",
        "position": "Provincial Assistant Director",
        "province": "Western",
        "district": "Colombo",
        "headquarters": "Colombo",
        "population": "2.3M",
        "centers": 18,
        "contact": {
          "email": "rashika.p@nysc.lk",
          "phone": "+94 11 234 5800"
        },
        "specialization": "Urban Programs"
      }
      // ... 24 more district assistants
    ],
    "provinceGroups": {
      "Western": [
        // assistants in Western Province
      ]
      // ... other provinces
    },
    "districtStats": {
      "districtDirectors": 25,
      "allDistricts": 25,
      "serviceCenters": "240+",
      "directBeneficiaries": "250K+"
    },
    "operationsFramework": {
      "localPresence": "Direct community engagement through district-level leadership and local partnerships",
      "responsiveService": "Quick response to local needs and immediate support for youth development initiatives",
      "targetedPrograms": "Specialized programs designed to meet specific district characteristics and opportunities",
      "impactMonitoring": "Real-time tracking of program effectiveness and continuous improvement at district level"
    }
  }
}
```

### 8. Get Directors Overview

**GET** `/api/public/directors/overview`

Returns organizational overview and statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "organizationStats": {
      "totalLeadership": 83,
      "provinces": 9,
      "districts": 25,
      "combinedExperience": "500+"
    },
    "hierarchy": {
      "boardMembers": 8,
      "chairman": 1,
      "directors": 5,
      "deputyDirectors": 12,
      "assistantDirectors": 25,
      "provincialDirectors": 9,
      "provincialAssistants": 25,
      "totalLevels": 6
    },
    "coverage": {
      "nationalReach": true,
      "provincialCoverage": "100%",
      "districtCoverage": "100%",
      "youthCenters": "240+",
      "annualBeneficiaries": "500K+"
    },
    "keyFunctions": [
      {
        "level": "Board of Members",
        "function": "Strategic Governance",
        "description": "Policy direction and organizational oversight"
      },
      {
        "level": "Chairman",
        "function": "Executive Leadership",
        "description": "Overall strategic direction and external relations"
      },
      {
        "level": "Directors",
        "function": "Departmental Leadership",
        "description": "Program development and implementation oversight"
      },
      {
        "level": "Deputy Directors",
        "function": "Operational Management",
        "description": "Day-to-day operations and program delivery"
      },
      {
        "level": "Assistant Directors",
        "function": "Program Coordination",
        "description": "Direct program management and staff supervision"
      },
      {
        "level": "Provincial Directors",
        "function": "Regional Leadership",
        "description": "Provincial program implementation and coordination"
      },
      {
        "level": "Provincial Assistants",
        "function": "District Operations",
        "description": "Local service delivery and community engagement"
      }
    ]
  }
}
```

## Query Parameters

Most endpoints support optional query parameters for filtering and customization:

- `lang` - Language preference (en, si, ta) - Default: en
- `include` - Additional data to include (contact, achievements, statistics)
- `format` - Response format (json) - Default: json

Example:
```
GET /api/public/directors/chairman?lang=si&include=contact,achievements
```

## Error Codes

- `200` - Success
- `400` - Bad Request (invalid parameters)
- `404` - Resource not found
- `500` - Internal server error

## Rate Limiting

- 100 requests per minute per IP address
- 1000 requests per hour per IP address

## Data Models

### Contact Information
```typescript
interface Contact {
  email: string;
  phone: string;
  linkedin?: string;
}
```

### Achievement
```typescript
interface Achievement {
  title: string;
  description?: string;
  year?: string;
}
```

### Director Base
```typescript
interface DirectorBase {
  id: number;
  name: string;
  position: string;
  description: string;
  image?: string;
  contact: Contact;
}
```

### Geographic Coverage
```typescript
interface GeographicCoverage {
  province?: string;
  district?: string;
  headquarters: string;
  population?: string;
  centers: number;
}
```

## Implementation Notes

1. All endpoints are cached for 15 minutes to improve performance
2. Images are served from the `/images/` static directory
3. Contact information includes placeholder data for development
4. LinkedIn profiles are placeholder links (#) pending real profile URLs
5. All numeric statistics are current as of the data snapshot
6. Multi-language support is prepared but currently serves English content
7. Email addresses follow the pattern: firstname.lastname@nysc.lk

# Admin Endpoints (Management APIs)

All admin endpoints require authentication and appropriate role-based permissions.

## Authentication

Admin endpoints require JWT authentication with one of the following roles:
- `ADMIN` - Full access to all operations
- `MODERATOR` - Read and update operations only
- `EDITOR` - Create and update operations only

**Headers Required:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

## Admin Endpoints

### 1. Chairman Management

#### Get Chairman (Admin View)
**GET** `/api/admin/directors/chairman`

Returns chairman information with additional administrative fields.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Hon. Pavithra Wanniarachchi",
    "title": "Chairman / Director General",
    "description": "Visionary leader with over 25 years...",
    "image": "/images/board/chairman.jpg",
    "contact": {
      "email": "chairman@nysc.lk",
      "phone": "+94 11 234 5678",
      "linkedin": "#"
    },
    "tenure": "2021 - Present",
    "qualifications": ["..."],
    "achievements": ["..."],
    "vision": "To create a vibrant ecosystem...",
    "keyInitiatives": [{"..."}],
    "isActive": true,
    "createdAt": "2021-01-15T08:00:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z",
    "updatedBy": "admin@nysc.lk"
  }
}
```

#### Update Chairman
**PUT** `/api/admin/directors/chairman`

Updates chairman information.

**Request Body:**
```json
{
  "name": "Hon. Pavithra Wanniarachchi",
  "title": "Chairman / Director General",
  "description": "Updated description...",
  "contact": {
    "email": "chairman@nysc.lk",
    "phone": "+94 11 234 5678",
    "linkedin": "https://linkedin.com/in/profile"
  },
  "tenure": "2021 - Present",
  "qualifications": [
    "Master of Public Administration - University of Colombo"
  ],
  "achievements": [
    "Established 50+ new youth centers across Sri Lanka"
  ],
  "vision": "Updated vision statement...",
  "keyInitiatives": [
    {
      "title": "Digital Transformation",
      "description": "Modernizing NYSC services..."
    }
  ]
}
```

### 2. Board Members Management

#### Get All Board Members (Admin View)
**GET** `/api/admin/directors/board-members`

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 50)
- `search` - Search by name or position
- `status` - Filter by active/inactive

#### Get Board Member by ID
**GET** `/api/admin/directors/board-members/:id`

#### Create Board Member
**POST** `/api/admin/directors/board-members`

**Request Body:**
```json
{
  "name": "Dr. New Board Member",
  "position": "Board Member",
  "description": "Expert in youth development...",
  "contact": {
    "email": "member@nysc.lk",
    "phone": "+94 11 234 5685",
    "linkedin": "https://linkedin.com/profile"
  },
  "badge": "Member",
  "order": 9
}
```

#### Update Board Member
**PUT** `/api/admin/directors/board-members/:id`

#### Delete Board Member
**DELETE** `/api/admin/directors/board-members/:id`

### 3. Directors Management

#### Get All Directors (Admin View)
**GET** `/api/admin/directors/directors`

#### Get Director by ID
**GET** `/api/admin/directors/directors/:id`

#### Create Director
**POST** `/api/admin/directors/directors`

**Request Body:**
```json
{
  "name": "Dr. New Director",
  "position": "Director - New Department",
  "department": "New Department",
  "description": "Strategic leader overseeing...",
  "contact": {
    "email": "director@nysc.lk",
    "phone": "+94 11 234 5695"
  },
  "specialization": "Department Specialization",
  "experience": "15 years",
  "achievements": [
    "Achievement 1",
    "Achievement 2"
  ]
}
```

#### Update Director
**PUT** `/api/admin/directors/directors/:id`

#### Delete Director
**DELETE** `/api/admin/directors/directors/:id`

### 4. Deputy Directors Management

#### Get All Deputy Directors (Admin View)
**GET** `/api/admin/directors/deputy-directors`

#### Get Deputy Director by ID
**GET** `/api/admin/directors/deputy-directors/:id`

#### Create Deputy Director
**POST** `/api/admin/directors/deputy-directors`

**Request Body:**
```json
{
  "name": "Mrs. New Deputy Director",
  "position": "Deputy Director - New Area",
  "department": "New Department",
  "description": "Program management specialist...",
  "contact": {
    "email": "deputy@nysc.lk",
    "phone": "+94 11 234 5712"
  },
  "specialization": "Management Specialization",
  "provinces": ["Western", "Central"]
}
```

#### Update Deputy Director
**PUT** `/api/admin/directors/deputy-directors/:id`

#### Delete Deputy Director
**DELETE** `/api/admin/directors/deputy-directors/:id`

### 5. Assistant Directors Management

#### Get All Assistant Directors (Admin View)
**GET** `/api/admin/directors/assistant-directors`

#### Get Assistant Director by ID
**GET** `/api/admin/directors/assistant-directors/:id`

#### Create Assistant Director
**POST** `/api/admin/directors/assistant-directors`

**Request Body:**
```json
{
  "name": "Ms. New Assistant Director",
  "position": "Assistant Director - New Program",
  "department": "Programs & Development",
  "region": "Western Province",
  "specialization": "Program Coordination",
  "contact": {
    "email": "assistant@nysc.lk",
    "phone": "+94 11 234 5745"
  }
}
```

#### Update Assistant Director
**PUT** `/api/admin/directors/assistant-directors/:id`

#### Delete Assistant Director
**DELETE** `/api/admin/directors/assistant-directors/:id`

### 6. Provincial Directors Management

#### Get All Provincial Directors (Admin View)
**GET** `/api/admin/directors/provincial-directors`

#### Get Provincial Director by ID
**GET** `/api/admin/directors/provincial-directors/:id`

#### Create Provincial Director
**POST** `/api/admin/directors/provincial-directors`

**Request Body:**
```json
{
  "name": "Mr. New Provincial Director",
  "position": "Provincial Director - New Province",
  "province": "New Province",
  "headquarters": "City Name",
  "districts": ["District1", "District2"],
  "population": "1.5M",
  "centers": 20,
  "description": "Leading youth development initiatives...",
  "contact": {
    "email": "provincial@nysc.lk",
    "phone": "+94 XX 234 5759"
  },
  "achievements": [
    "Achievement 1",
    "Achievement 2"
  ]
}
```

#### Update Provincial Director
**PUT** `/api/admin/directors/provincial-directors/:id`

#### Delete Provincial Director
**DELETE** `/api/admin/directors/provincial-directors/:id`

### 7. Provincial Assistant Directors Management

#### Get All Provincial Assistants (Admin View)
**GET** `/api/admin/directors/provincial-assistants`

#### Get Provincial Assistant by ID
**GET** `/api/admin/directors/provincial-assistants/:id`

#### Create Provincial Assistant
**POST** `/api/admin/directors/provincial-assistants`

**Request Body:**
```json
{
  "name": "Ms. New Provincial Assistant",
  "position": "Provincial Assistant Director",
  "province": "Western",
  "district": "New District",
  "headquarters": "District HQ",
  "population": "1.2M",
  "centers": 15,
  "contact": {
    "email": "assistant@nysc.lk",
    "phone": "+94 XX 234 5825"
  },
  "specialization": "District Programs"
}
```

#### Update Provincial Assistant
**PUT** `/api/admin/directors/provincial-assistants/:id`

#### Delete Provincial Assistant
**DELETE** `/api/admin/directors/provincial-assistants/:id`

### 8. Bulk Operations

#### Bulk Update Directors
**PUT** `/api/admin/directors/bulk-update`

**Request Body:**
```json
{
  "type": "directors", // directors, deputy-directors, etc.
  "updates": [
    {
      "id": 1,
      "data": { "name": "Updated Name" }
    },
    {
      "id": 2,
      "data": { "position": "Updated Position" }
    }
  ]
}
```

#### Bulk Delete Directors
**DELETE** `/api/admin/directors/bulk-delete`

**Request Body:**
```json
{
  "type": "directors",
  "ids": [1, 2, 3]
}
```

#### Import Directors from CSV
**POST** `/api/admin/directors/import`

**Content-Type:** `multipart/form-data`

**Form Data:**
- `file` - CSV file
- `type` - Director type (directors, deputy-directors, etc.)
- `overwrite` - Boolean to overwrite existing records

#### Export Directors to CSV
**GET** `/api/admin/directors/export?type=directors&format=csv`

### 9. Image Management

#### Upload Director Image
**POST** `/api/admin/directors/:type/:id/image`

**Content-Type:** `multipart/form-data`

**Form Data:**
- `image` - Image file (max 5MB, formats: jpg, jpeg, png, webp)

**Response:**
```json
{
  "success": true,
  "data": {
    "imageUrl": "/images/directors/director-123.jpg"
  }
}
```

#### Delete Director Image
**DELETE** `/api/admin/directors/:type/:id/image`

### 10. Activity Logs

#### Get Director Activity Logs
**GET** `/api/admin/directors/activity-logs`

**Query Parameters:**
- `type` - Director type filter
- `action` - Action filter (create, update, delete)
- `user` - User filter
- `from` - Date from (ISO format)
- `to` - Date to (ISO format)
- `page` - Page number
- `limit` - Items per page

**Response:**
```json
{
  "success": true,
  "data": {
    "logs": [
      {
        "id": 1,
        "type": "directors",
        "recordId": 5,
        "action": "update",
        "changes": {
          "name": {
            "old": "Old Name",
            "new": "New Name"
          }
        },
        "userId": "admin@nysc.lk",
        "timestamp": "2024-01-15T10:30:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 150,
      "pages": 15
    }
  }
}
```

## Admin Query Parameters

All admin list endpoints support:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 50)
- `search` - Search by name, position, or department
- `status` - Filter by active/inactive
- `sort` - Sort field (name, position, createdAt, updatedAt)
- `order` - Sort order (asc, desc)

## Admin Response Format

Admin endpoints return additional metadata:

```json
{
  "success": true,
  "data": {
    // ... data
    "meta": {
      "createdAt": "2024-01-15T08:00:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z",
      "updatedBy": "admin@nysc.lk",
      "isActive": true
    }
  },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

## Validation Rules

### Common Validation
- `name` - Required, 2-100 characters, letters and spaces only
- `position` - Required, 5-150 characters
- `description` - Optional, max 1000 characters
- `email` - Required, valid email format, must end with @nysc.lk
- `phone` - Required, Sri Lankan phone number format (+94 XX XXX XXXX)
- `linkedin` - Optional, valid URL

### Image Upload Validation
- Max file size: 5MB
- Allowed formats: JPEG, PNG, WebP
- Dimensions: Min 300x400px, Max 2000x2000px
- Aspect ratio: Recommended 3:4 (portrait)

## Error Responses

### Admin-specific Error Codes
- `401` - Authentication required
- `403` - Insufficient permissions
- `409` - Conflict (duplicate email, position conflicts)
- `413` - File too large
- `422` - Validation errors

### Validation Error Example
```json
{
  "success": false,
  "error": "Validation failed",
  "message": "Request validation failed",
  "details": {
    "email": ["Email must end with @nysc.lk"],
    "phone": ["Invalid Sri Lankan phone number format"],
    "name": ["Name must be between 2 and 100 characters"]
  }
}
```

## Rate Limiting

### Public Endpoints
- 100 requests per minute per IP address
- 1000 requests per hour per IP address

### Admin Endpoints
- 200 requests per minute per authenticated user
- 2000 requests per hour per authenticated user
- 10 file uploads per hour per user

## Security Considerations

### Public Endpoints
- All endpoints are publicly accessible (no authentication required)
- Contact information is publicly available as per organizational transparency
- No sensitive internal information is exposed
- Rate limiting prevents abuse
- Input validation on all query parameters
- CORS headers configured for frontend access

### Admin Endpoints
- JWT authentication required for all operations
- Role-based access control (RBAC) enforcement
- Activity logging for all changes
- Input sanitization and validation
- File upload security (virus scanning, type validation)
- IP whitelisting for admin access (configurable)
- Session management and timeout
- Password policy enforcement
- Two-factor authentication support (optional)
