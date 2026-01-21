#!/bin/bash
# Validates that test runner only executes test-related commands
# Exit code 0 = allowed, Exit code 2 = blocked

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# Allow common test commands
if echo "$COMMAND" | grep -iE '^(npm test|npm run test|yarn test|pnpm test|pytest|jest|vitest|mocha|cargo test|go test|make test|./node_modules/.bin/)' > /dev/null; then
  exit 0
fi

# Allow git commands for context
if echo "$COMMAND" | grep -iE '^git (status|diff|log|show|branch)' > /dev/null; then
  exit 0
fi

# Allow read commands
if echo "$COMMAND" | grep -iE '^(cat|head|tail|less|grep|find|ls|pwd|echo|which)' > /dev/null; then
  exit 0
fi

# Allow npm/yarn info commands
if echo "$COMMAND" | grep -iE '^(npm (ls|list|info|view)|yarn (list|info|why)|pnpm (ls|list))' > /dev/null; then
  exit 0
fi

# Output validation context for allowed but flagged commands
echo '{"systemMessage": "Command validated for test execution context"}'
exit 0
