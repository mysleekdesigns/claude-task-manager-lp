---
name: error-handling
description: Error handling patterns and best practices. Loaded for robust error management.
---

# Error Handling Skill

## Error Classes

```typescript
// Base application error
class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public isOperational: boolean = true
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Specific error types
class ValidationError extends AppError {
  constructor(message: string, public details?: any[]) {
    super(message, 'VALIDATION_ERROR', 422);
  }
}

class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 'NOT_FOUND', 404);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Authentication required') {
    super(message, 'UNAUTHORIZED', 401);
  }
}

class ForbiddenError extends AppError {
  constructor(message = 'Permission denied') {
    super(message, 'FORBIDDEN', 403);
  }
}
```

## Async Error Handling

```typescript
// Wrapper for async route handlers
const asyncHandler = (fn: Function) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Usage
app.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new NotFoundError('User');
  res.json({ data: user });
}));
```

## Global Error Handler

```typescript
app.use((err: Error, req, res, next) => {
  // Log error (but not sensitive data)
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    requestId: req.id
  });

  // Operational errors: send to client
  if (err instanceof AppError && err.isOperational) {
    return res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
        ...(err instanceof ValidationError && { details: err.details })
      }
    });
  }

  // Programming errors: generic message
  res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred'
    }
  });
});
```

## Error Recovery Patterns

### Retry with Backoff
```typescript
async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) throw error;
      const delay = baseDelay * Math.pow(2, attempt - 1);
      await new Promise(r => setTimeout(r, delay));
    }
  }
  throw new Error('Max retries exceeded');
}
```

### Circuit Breaker
```typescript
class CircuitBreaker {
  private failures = 0;
  private lastFailure: Date | null = null;
  private state: 'closed' | 'open' | 'half-open' = 'closed';

  constructor(
    private threshold = 5,
    private timeout = 60000
  ) {}

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      if (Date.now() - this.lastFailure!.getTime() > this.timeout) {
        this.state = 'half-open';
      } else {
        throw new Error('Circuit breaker is open');
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess() {
    this.failures = 0;
    this.state = 'closed';
  }

  private onFailure() {
    this.failures++;
    this.lastFailure = new Date();
    if (this.failures >= this.threshold) {
      this.state = 'open';
    }
  }
}
```

## Logging Best Practices

```typescript
// DO: Structured logging with context
logger.error({
  event: 'payment_failed',
  userId: user.id,
  amount: payment.amount,
  errorCode: error.code,
  requestId: req.id
});

// DON'T: Log sensitive data
logger.error(`Payment failed for card ${cardNumber}`); // NEVER
```
