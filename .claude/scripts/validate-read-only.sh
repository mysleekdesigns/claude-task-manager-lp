#!/bin/bash
# Validates that commands are read-only (no write operations)
# Exit code 0 = allowed, Exit code 2 = blocked

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# Block dangerous write operations
if echo "$COMMAND" | grep -iE '\b(rm|mv|cp|chmod|chown|dd|mkfs|fdisk|format)\b' > /dev/null; then
  echo '{"continue": false, "reason": "Blocked: Destructive file operations not allowed in read-only mode"}' >&2
  exit 2
fi

# Block file redirections that write
if echo "$COMMAND" | grep -E '>[^>]|>>|tee\s' > /dev/null; then
  echo '{"continue": false, "reason": "Blocked: File write redirections not allowed in read-only mode"}' >&2
  exit 2
fi

exit 0
