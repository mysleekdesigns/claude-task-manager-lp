#!/bin/bash
# Validates documentation output - ensures docs go to correct locations
# Exit code 0 = allowed, Exit code 2 = blocked

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Only validate write operations
if [ "$TOOL_NAME" != "Write" ] && [ "$TOOL_NAME" != "Edit" ]; then
  exit 0
fi

# Allow markdown files
if echo "$FILE_PATH" | grep -iE '\.(md|mdx|rst|txt)$' > /dev/null; then
  exit 0
fi

# Allow docs directories
if echo "$FILE_PATH" | grep -iE '(docs?/|documentation/|wiki/|readme)' > /dev/null; then
  exit 0
fi

# Allow JSDoc/TSDoc comments in source files
if echo "$FILE_PATH" | grep -iE '\.(js|ts|jsx|tsx|py|rb|go|rs|java)$' > /dev/null; then
  exit 0
fi

# Block other file types
echo '{"continue": false, "reason": "Documentation agent can only write to markdown, docs directories, or add inline comments to source files"}' >&2
exit 2
