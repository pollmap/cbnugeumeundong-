#!/usr/bin/env bash
set -euo pipefail

files=$(git ls-files)

if [ -z "$files" ]; then
  exit 0
fi

if ! printf '%s\n' "$files" | xargs -r rg -n --color never -e '^<<<<<<< ' -e '^=======$' -e '^>>>>>>> ' >/tmp/repo_conflict_markers.txt; then
  exit 0
fi

echo "✖ Build blocked: unresolved Git conflict markers found:"
cat /tmp/repo_conflict_markers.txt
echo ""
echo "Resolve conflict markers before building/deploying."
exit 1
