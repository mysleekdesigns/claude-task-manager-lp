#!/bin/bash
# Validates security audit commands and prevents dangerous operations
# Exit code 0 = allowed, Exit code 2 = blocked

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')

# Block network exfiltration attempts
if echo "$COMMAND" | grep -iE 'curl.*-d|wget.*--post|nc\s|netcat|ncat|/dev/tcp' > /dev/null; then
  echo '{"continue": false, "reason": "Blocked: Network data transmission not allowed in security audit mode"}' >&2
  exit 2
fi

# Block credential file access for write
if echo "$COMMAND" | grep -iE '(\.env|credentials|secrets|\.pem|\.key|id_rsa).*>' > /dev/null; then
  echo '{"continue": false, "reason": "Blocked: Cannot write to credential files"}' >&2
  exit 2
fi

# For file writes, ensure not writing to sensitive locations
if [ "$TOOL_NAME" = "Write" ] || [ "$TOOL_NAME" = "Edit" ]; then
  FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
  if echo "$FILE_PATH" | grep -iE '(\.env|credentials|secrets|\.pem|\.key|id_rsa|\.ssh/)' > /dev/null; then
    echo '{"continue": false, "reason": "Blocked: Cannot modify credential or key files"}' >&2
    exit 2
  fi
fi

# Add security context for audit trail
echo '{"systemMessage": "Security audit command validated", "hookSpecificOutput": {"hookEventName": "PreToolUse", "additionalContext": "Security scan in progress - monitoring for sensitive data exposure"}}'
exit 0
