---
name: testing
description: Testing best practices and patterns. Loaded when writing or running tests.
---

# Testing Skill

## Test Structure (AAA Pattern)

```typescript
describe('ComponentName', () => {
  describe('methodName', () => {
    it('should [expected behavior] when [condition]', () => {
      // Arrange - Set up test data and conditions
      const input = createTestData();

      // Act - Execute the code under test
      const result = component.methodName(input);

      // Assert - Verify the outcome
      expect(result).toBe(expectedValue);
    });
  });
});
```

## Test Types

### Unit Tests
- Test individual functions/methods
- Mock external dependencies
- Fast execution (<100ms per test)
- High coverage target (>80%)

### Integration Tests
- Test component interactions
- Use real dependencies where practical
- Test API endpoints end-to-end
- Database transactions rolled back

### E2E Tests
- Test complete user flows
- Run against staging environment
- Cover critical paths only
- Slower but comprehensive

## Mocking Guidelines

```typescript
// Mock external services
jest.mock('./emailService', () => ({
  sendEmail: jest.fn().mockResolvedValue({ sent: true })
}));

// Mock only what's necessary
const mockUser = { id: 1, name: 'Test' }; // Not the full User object
```

## Edge Cases to Test

- Empty inputs
- Null/undefined values
- Boundary conditions
- Error conditions
- Concurrent operations
- Large datasets
- Invalid input formats

## Test Naming

```
should [expected behavior] when [condition]
```

Examples:
- `should return empty array when no users exist`
- `should throw ValidationError when email is invalid`
- `should retry 3 times when API returns 503`
