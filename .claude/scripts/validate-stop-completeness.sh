#!/bin/bash
# Stop hook validation - ensures agent completed its task properly
# Used with prompt-type hooks for LLM evaluation

# This script is called at Stop/SubagentStop events
# It outputs context about what should be validated

INPUT=$(cat)
AGENT_TYPE=$(echo "$INPUT" | jq -r '.hook_event_name // empty')

# For SubagentStop, we want to ensure completeness
if [ "$AGENT_TYPE" = "SubagentStop" ]; then
  echo '{"hookSpecificOutput": {"hookEventName": "SubagentStop", "additionalContext": "Verify: Did the agent complete all requested tasks? Are there any unfinished items? Was the output comprehensive?"}}'
fi

exit 0
