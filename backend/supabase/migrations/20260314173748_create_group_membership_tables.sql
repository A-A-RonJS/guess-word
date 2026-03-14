CREATE TABLE IF NOT EXISTS users (
  user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL,
  last_login TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS game_groups (
  group_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS user_group (
  user_id UUID REFERENCES users(user_id),
  group_id UUID REFERENCES game_groups(group_id),
  joined_at TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (user_id, group_id)
);