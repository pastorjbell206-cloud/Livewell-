#!/usr/bin/env bash
# Commit and push docs/work/ every few minutes so a container reset cannot
# lose work in progress. Only docs/work is ever staged.
cd /home/user/Livewell- || exit 1
while true; do
  sleep 300
  if [ -n "$(git status --porcelain -- docs/work)" ]; then
    for i in 1 2 3; do
      git add -A -- docs/work 2>/dev/null && \
      git commit -q -m "Work in progress: autosave docs/work" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" -m "Claude-Session: https://claude.ai/code/session_01JuCQ8kZ25i9zRwNgk6bh4e" -- docs/work 2>/dev/null && break
      sleep 5
    done
    git push -q origin claude/todo-implementation-hhp4bm 2>/dev/null || true
  fi
done
