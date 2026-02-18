#!/bin/bash
# Sync blog posts from Obsidian vault to repo
# Run before committing new posts

OBSIDIAN_BLOG="$HOME/brain/projects/duane.co.za/blog"
REPO_BLOG="$(dirname "$0")/../content/blog"

if [ ! -d "$OBSIDIAN_BLOG" ]; then
  echo "Obsidian blog folder not found: $OBSIDIAN_BLOG"
  exit 1
fi

echo "Syncing blog posts..."
rsync -av --delete "$OBSIDIAN_BLOG/" "$REPO_BLOG/"
echo "Done. $(ls -1 "$REPO_BLOG"/*.md 2>/dev/null | wc -l | tr -d ' ') posts synced."
