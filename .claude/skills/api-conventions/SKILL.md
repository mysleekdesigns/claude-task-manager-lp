---
name: api-conventions
description: API design patterns and REST conventions. Loaded for API development and review.
---

# API Conventions Skill

## RESTful Design

### URL Structure
```
GET    /api/users          # List users
POST   /api/users          # Create user
GET    /api/users/:id      # Get user
PUT    /api/users/:id      # Update user (full)
PATCH  /api/users/:id      # Update user (partial)
DELETE /api/users/:id      # Delete user

# Nested resources
GET    /api/users/:id/posts
POST   /api/users/:id/posts
```

### HTTP Status Codes
```
200 OK              - Success (GET, PUT, PATCH)
201 Created         - Resource created (POST)
204 No Content      - Success with no body (DELETE)
400 Bad Request     - Invalid input
401 Unauthorized    - Authentication required
403 Forbidden       - Permission denied
404 Not Found       - Resource doesn't exist
409 Conflict        - Resource conflict
422 Unprocessable   - Validation error
429 Too Many Req    - Rate limited
500 Internal Error  - Server error
```

### Response Format
```json
// Success
{
  "data": { ... },
  "meta": {
    "page": 1,
    "total": 100
  }
}

// Error
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "details": [
      { "field": "email", "message": "Required" }
    ]
  }
}
```

### Pagination
```
GET /api/users?page=2&limit=20

Response:
{
  "data": [...],
  "meta": {
    "page": 2,
    "limit": 20,
    "total": 156,
    "totalPages": 8
  }
}
```

### Filtering & Sorting
```
GET /api/users?status=active&role=admin
GET /api/users?sort=-createdAt,name
GET /api/users?fields=id,name,email
```

## Request/Response Examples

### Create Resource
```http
POST /api/users
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe"
}

---
HTTP/1.1 201 Created
Location: /api/users/123

{
  "data": {
    "id": "123",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### Validation Error
```http
HTTP/1.1 422 Unprocessable Entity

{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      { "field": "email", "message": "Invalid email format" },
      { "field": "name", "message": "Must be at least 2 characters" }
    ]
  }
}
```

## Versioning

```
# URL versioning (recommended)
/api/v1/users
/api/v2/users

# Header versioning
Accept: application/vnd.api+json; version=1
```

## Rate Limiting Headers

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```
