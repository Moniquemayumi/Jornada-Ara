CREATE TABLE IF NOT EXISTS ranking_entries (
  id TEXT PRIMARY KEY NOT NULL,
  mode TEXT NOT NULL CHECK(mode IN ('solo','duo','team')),
  label TEXT NOT NULL,
  players TEXT NOT NULL DEFAULT '[]',
  points INTEGER NOT NULL CHECK(points BETWEEN 1 AND 5000000),
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_ranking_score ON ranking_entries(points DESC, created_at ASC);
