#!/usr/bin/env bash
set -euo pipefail

files=$(git ls-files)

if [ -z "$files" ]; then
  exit 0
fi

output_file=/tmp/repo_conflict_markers.txt
: > "$output_file"

if command -v rg >/dev/null 2>&1; then
  if printf '%s\n' "$files" | xargs -r rg -n --color never -e '^<<<<<<< ' -e '^=======$' -e '^>>>>>>> ' >"$output_file"; then
    echo "✖ Build blocked: unresolved Git conflict markers found:"
    cat "$output_file"
    echo ""
    echo "Resolve conflict markers before building/deploying."
    exit 1
  fi
else
  while IFS= read -r file; do
    if grep -nE '^(<<<<<<< |=======|>>>>>>> )' "$file" >>"$output_file"; then
      :
    fi
  done <<< "$files"

  if [ -s "$output_file" ]; then
    echo "✖ Build blocked: unresolved Git conflict markers found:"
    cat "$output_file"
    echo ""
    echo "Resolve conflict markers before building/deploying."
    exit 1
  fi
fi

exit 0
