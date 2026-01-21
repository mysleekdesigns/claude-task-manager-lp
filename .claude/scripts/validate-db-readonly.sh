#!/bin/bash
# Validates that database commands are read-only (SELECT only)
# Exit code 0 = allowed, Exit code 2 = blocked

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# Block write operations in SQL
if echo "$COMMAND" | grep -iE '\b(INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|TRUNCATE|REPLACE|MERGE|UPSERT|GRANT|REVOKE)\b' > /dev/null; then
  echo '{"continue": false, "reason": "Blocked: Database write operations not allowed. Only SELECT queries permitted."}' >&2
  exit 2
fi

exit 0
