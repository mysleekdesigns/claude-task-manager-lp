---
name: security
description: Security audit guidelines and vulnerability patterns. Loaded for security assessments.
---

# Security Skill

## OWASP Top 10 Checklist

### 1. Injection (SQL, NoSQL, OS, LDAP)
```typescript
// BAD: String concatenation
const query = `SELECT * FROM users WHERE id = ${userId}`;

// GOOD: Parameterized query
const query = 'SELECT * FROM users WHERE id = $1';
await db.query(query, [userId]);
```

### 2. Broken Authentication
- Use strong password hashing (bcrypt, argon2)
- Implement rate limiting on auth endpoints
- Use secure session management
- MFA for sensitive operations

### 3. Sensitive Data Exposure
- Encrypt data at rest (AES-256)
- Use HTTPS everywhere
- Never log sensitive data
- Minimize data collection

### 4. XML External Entities (XXE)
```typescript
// Disable external entities in XML parsers
const parser = new DOMParser();
parser.setFeature('http://apache.org/xml/features/disallow-doctype-decl', true);
```

### 5. Broken Access Control
- Verify authorization on every request
- Use deny-by-default
- Check object-level permissions (IDOR)
- Log access failures

### 6. Security Misconfiguration
- Remove default credentials
- Disable directory listing
- Keep dependencies updated
- Use security headers

### 7. Cross-Site Scripting (XSS)
```typescript
// BAD: Direct HTML insertion
element.innerHTML = userInput;

// GOOD: Text content or sanitization
element.textContent = userInput;
// Or use DOMPurify for HTML
element.innerHTML = DOMPurify.sanitize(userInput);
```

### 8. Insecure Deserialization
- Validate serialized data
- Use type checking
- Implement integrity checks

### 9. Using Components with Known Vulnerabilities
- Run `npm audit` / `pip-audit` regularly
- Keep dependencies updated
- Monitor security advisories

### 10. Insufficient Logging & Monitoring
- Log authentication events
- Log access control failures
- Don't log sensitive data
- Set up alerts for anomalies

## Security Headers

```
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

## Secret Detection Patterns

```regex
# API Keys
(api[_-]?key|apikey)["\s]*[:=]["\s]*["']?[a-zA-Z0-9]{16,}

# AWS
AKIA[0-9A-Z]{16}

# Generic secrets
(password|secret|token|credential)["\s]*[:=]["\s]*["']?[^\s"']+
```
