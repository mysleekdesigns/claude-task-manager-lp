---
name: code-review
description: Code review guidelines and checklist. Automatically loaded when reviewing code changes.
---

# Code Review Skill

## Review Checklist

### Security
- [ ] No hardcoded secrets or API keys
- [ ] Input validation on user data
- [ ] SQL queries use parameterization
- [ ] Authentication/authorization checked
- [ ] Sensitive data not logged
- [ ] HTTPS for external calls

### Error Handling
- [ ] Try/catch for async operations
- [ ] Meaningful error messages
- [ ] Errors don't expose internals
- [ ] Graceful degradation
- [ ] Proper error propagation

### Code Quality
- [ ] Functions are small (<20 lines)
- [ ] Single responsibility principle
- [ ] No code duplication
- [ ] Clear variable/function names
- [ ] Comments explain "why" not "what"

### Performance
- [ ] No N+1 queries
- [ ] Appropriate data structures
- [ ] No memory leaks
- [ ] Pagination for large datasets
- [ ] Caching where appropriate

### Testing
- [ ] Unit tests for new functions
- [ ] Edge cases covered
- [ ] Mocks used appropriately
- [ ] Integration tests for APIs

## Severity Levels

**Critical**: Security vulnerabilities, data loss risk, breaking changes
**Warning**: Performance issues, missing error handling, poor patterns
**Suggestion**: Style improvements, minor optimizations, documentation
