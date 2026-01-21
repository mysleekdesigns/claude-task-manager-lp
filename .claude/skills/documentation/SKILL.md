---
name: documentation
description: Documentation standards and templates. Loaded when writing documentation.
---

# Documentation Skill

## Documentation Types

### README Structure
```markdown
# Project Name

Brief description (1-2 sentences).

## Features

- Feature 1
- Feature 2

## Installation

\`\`\`bash
npm install package-name
\`\`\`

## Quick Start

\`\`\`javascript
const pkg = require('package-name');
pkg.init();
\`\`\`

## API Reference

### `functionName(param)`

Description.

**Parameters:**
- `param` (type): Description

**Returns:** type - Description

## Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| debug | boolean | false | Enable debug mode |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

MIT
```

### JSDoc/TSDoc
```typescript
/**
 * Brief description of the function.
 *
 * @param paramName - Description of parameter
 * @returns Description of return value
 * @throws {ErrorType} When error condition occurs
 *
 * @example
 * ```ts
 * const result = functionName('input');
 * ```
 */
```

### Python Docstrings (Google Style)
```python
def function_name(param: str) -> int:
    """Brief description.

    Longer description if needed.

    Args:
        param: Description of parameter.

    Returns:
        Description of return value.

    Raises:
        ValueError: When param is invalid.

    Example:
        >>> function_name('input')
        42
    """
```

## Writing Guidelines

1. **Be Concise**: Say more with fewer words
2. **Use Examples**: Show, don't just tell
3. **Stay Current**: Update docs with code changes
4. **Be Accurate**: Verify against actual behavior
5. **Think Audience**: Write for the reader's level

## Code Comments

```typescript
// GOOD: Explains WHY
// Using binary search because the list is always sorted
// and we need O(log n) performance for real-time updates

// BAD: Explains WHAT (code already shows this)
// Loop through the array
for (const item of array) { }
```
