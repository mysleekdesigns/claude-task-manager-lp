#!/bin/bash
# Post-tool validation for code review agent
# Ensures review completeness and quality

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')

# After reading files, remind about review checklist
if [ "$TOOL_NAME" = "Read" ]; then
  echo '{"hookSpecificOutput": {"hookEventName": "PostToolUse", "additionalContext": "Remember to check: security vulnerabilities, error handling, code clarity, naming conventions, and test coverage"}}'
fi

exit 0
